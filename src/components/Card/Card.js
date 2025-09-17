import React, { Component } from "react";
import './styles.css'
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props){
    super(props);
    this.state={
      verMas: false,
    }

  }
  

  mostrarOcultar(){
    this.setState({
      verMas: !this.state.verMas,
    })
  }
  render() {    
    return (
      <article className={this.props.css ? this.props.css : "card-article"}>
        {/* Imagen */}
        <img  src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`} alt="" />
        {/* Titulo */}
        <h2>
          {
          this.props.data.original_title ? this.props.data.original_title : this.props.data.original_name
          } 
        </h2>
        {/* Descripcion */}
        <div>
          {
            this.state.verMas ? (
              <p> {this.props.data.overview} </p>  
            ) : ('')
          }
          {/* Ver Mas - Ver Menos */}
           <button className="more" onClick={() => this.mostrarOcultar()}>
              {this.state.verMas ? "Ver Menos" : "Ver Mas"}
          </button>
          {/* Detalle */}
            <Link to={`detalle/${this.props.type}/${this.props.data.id}`}> <p>Ir a detalle</p> </Link>



        </div>
      </article>
    );
  }
}

export default Card;
