import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HeaderItems from '../HeaderItems/HeaderItems';
import FormularioBusqueda from '../SearchForm/SearchForm';
import "./styles.css";


function Header() {
  const navItems = [
    {name: 'Home', link: '/'},
    {name: 'Peliculas', link: '/movies'},
    {name: 'Series', link: '/series'},
    {name: 'Favoritas', link: '/favorites'}
  ]

  return (
  <React.Fragment>
      {/* Titulo */}
      <h1 className='header-title'><Link to={'/'}>Far far Away Movies</Link></h1>
    <nav>
  {/* Nav Items */}
        <ul> 
          {navItems.map((elm,idx) => (
            <HeaderItems key={idx} name={elm.name} link={elm.link} />
          ))}
        </ul>
    {/* Form de busqueda */}
        <FormularioBusqueda />
    </nav>  
    
  </React.Fragment>

  )
}



export default Header