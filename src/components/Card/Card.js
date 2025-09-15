import React, { Component } from "react";

class Card extends Component {
  render() {
    console.log('Card props:', this.props);
    return (
      <article>
        <img src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`} alt="" />
        <h2>{this.props.data.original_title} </h2>
        <p> </p>
        <p>{} </p>
      </article>
    );
  }
}

export default Card;
