import React, { Component } from 'react'
import HeaderItems from '../HeaderItems/HeaderItems';
import FormularioBusqueda from "../../components/SearchForm/SearchForm";
import "./styles.css";


function Header() {
  const navItems = [
    {name: 'Home', link: '/'},
    {name: 'Peliculas', link: '/movies'},
    {name: 'Series', link: '/series'},
    {name: 'favoritas', link: '/favorites'}
  ]

  return (
<nav>
  {/* Titulo */}
        <li> Far far Away Movies </li>
  {/* Nav Items */}
        <ul> 
          {navItems.map((elm,idx) => (
            <HeaderItems key={idx} name={elm.name} link={elm.link} />
          ))}
        </ul>
    {/* Form de busqueda */}
        <li> <FormularioBusqueda /> </li>
    </nav>  
  )
}



export default Header