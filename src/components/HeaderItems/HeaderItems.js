import React from 'react'
import { Link } from 'react-router-dom'

function HeaderItems(props) {


  return (
    <Link to={props.link}> {props.name} </Link>
    )
}

export default HeaderItems
