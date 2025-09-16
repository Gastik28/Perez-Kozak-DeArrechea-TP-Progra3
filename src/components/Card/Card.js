import React, { Component } from "react";
import './styles.css'

class Card extends Component {
  render() {
    return (
      <article className="card-article">
        <img src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`} alt="" />
        <h2>
          {
          this.props.data.original_title ? this.props.data.original_title : this.props.data.original_name
          } 
        </h2>
        <p> </p>
        <p>{} </p>
      </article>
    );
  }
}

export default Card;
