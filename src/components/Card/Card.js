import React, { Component } from "react";
import './styles.css'
import { Link } from "react-router-dom";


class Card extends Component {
  constructor(props){
    super(props);
    this.state={
      verMas: false,
      esFav: false, ////////
    }

  }
  

  mostrarOcultar(){
    this.setState({
      verMas: !this.state.verMas,
    })
  }
////////////
  agregarFav(){
    const { data, type } = this.props
    const storageKey = type === 'movie' ? 'favoriteMovies' : 'favoriteSeries'
    const currentId = data.id; // Solo el ID

    let recuperoFav = localStorage.getItem(storageKey)
    
    if(recuperoFav == null){
      let fav = [currentId]
      localStorage.setItem(storageKey, JSON.stringify(fav))
    } else {
      let favParceado = JSON.parse(recuperoFav)
     
      if (!favParceado.includes(currentId)) {
        favParceado.push(currentId);
        localStorage.setItem(storageKey, JSON.stringify(favParceado));
      }
    }
    this.setState({ esFav: true })
  }

  sacaFav(){
    const { data, type } = this.props;
    const storageKey = type === 'movie' ? 'favoriteMovies' : 'favoriteSeries'
    const currentId = data.id;

    let recuperoFav = localStorage.getItem(storageKey)
    
    if(recuperoFav) {
       let favParceado = JSON.parse(recuperoFav)
       let filter = favParceado.filter((elm) => elm !== currentId); 
       localStorage.setItem(storageKey, JSON.stringify(filter));
  }
    
    this.setState({ esFav: false })
  }

  componentDidMount(){
    const { data, type } = this.props
    const storageKey = type === 'movie' ? 'favoriteMovies' : 'favoriteSeries'
    const currentId = data.id; 

    let recuperoFav = localStorage.getItem(storageKey)
    
    if(recuperoFav){
      let favParceado = JSON.parse(recuperoFav)
      if (favParceado.includes(currentId)) {
        this.setState({ esFav: true });
      }
    }
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
        <p> </p>
        <p>{} </p>
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
            <Link to={`/detalle/${this.props.type}/${this.props.data.id}`}>
             <p>Ir a detalle</p> </Link>



        </div>
        
          {/* Agregar a Favoritos - Sacar de Favoritos */}
         
        {this.state.esFav ? (
            <button className="more" onClick={() => this.sacaFav()}>
              Eliminar de Favoritos
            </button>
          ) : (
            <button className="more" onClick={() => this.agregarFav()}>
              Favoritos
            </button>
          )}


      </article>
    );
  }
}

export default Card;
