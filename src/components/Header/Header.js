import React, { Component } from 'react'
import HeaderItems from '../HeaderItems/HeaderItems';
<<<<<<< HEAD
import FormularioBusqueda from '../SearchForm/SearchForm';
=======
import FormularioBusqueda from "../../components/SearchForm/SearchForm";
>>>>>>> a8bafa956b351b6de31b2c4d1293bf1f874f8ef5
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
<<<<<<< HEAD
        <FormularioBusqueda />
=======
        <li> <FormularioBusqueda /> </li>
>>>>>>> a8bafa956b351b6de31b2c4d1293bf1f874f8ef5
    </nav>  
  )
}



export default Header