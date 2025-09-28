import React, { Component } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      esFav: false,
    };
  }

  mostrarOcultar() {
    // Alternamos el estado de vermas a lo contrario que haya en el estado.
    // Si esta true pasa a false y viceversa
    // "!" significa opuesto para un booleano --> boolean toggle
    this.setState({
      verMas: !this.state.verMas,
    });
  }
  agregarFav() {
    const { data, type } = this.props;
    const storageKey = type === "movie" ? "favoriteMovies" : "favoriteSeries";
    const currentId = data.id; // Solo el ID

    let recuperoFav = localStorage.getItem(storageKey);

    // Que pasa cuando el Local Storage esta vacio
    if (recuperoFav == null) {
      let fav = [currentId];
      localStorage.setItem(storageKey, JSON.stringify(fav));
    }

    // Que pasa cuando el local storage ya tiene algo
    else {
      let favParceado = JSON.parse(recuperoFav); //lo que existe en el localStorage lo paso a un array

      if (!favParceado.includes(currentId)) {
        favParceado.push(currentId);
        localStorage.setItem(storageKey, JSON.stringify(favParceado));
      }
    }
    this.setState({ esFav: true });
  }

  sacaFav() {
    const { data, type } = this.props;
    const storageKey = type === "movie" ? "favoriteMovies" : "favoriteSeries";
    const currentId = data.id;

    let recuperoFav = localStorage.getItem(storageKey);

    if (recuperoFav) {
      let favParceado = JSON.parse(recuperoFav);
      let filter = favParceado.filter((elm) => elm !== currentId);
      localStorage.setItem(storageKey, JSON.stringify(filter));
    }

    this.setState({ esFav: false });
    if (this.props.onClick) this.props.onClick(); //esto es para refrescar en /favoritos
  }

  componentDidMount() {
    const { data, type } = this.props;
    const storageKey = type === "movie" ? "favoriteMovies" : "favoriteSeries";
    const currentId = data.id;

    let recuperoFav = localStorage.getItem(storageKey);

    if (recuperoFav) {
      let favParceado = JSON.parse(recuperoFav);
      if (favParceado.includes(currentId)) {
        this.setState({ esFav: true });
      }
    }
  }

  render() {
    console.log("cardprops", this.props);

    return (
      <article className={this.props.css ? this.props.css : "card-article"}>
        {/* Imagen */}
        <img
          src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`}
          alt=""
        />
        {/* Titulo */}
        <h2>
          {this.props.data.original_title
            ? this.props.data.original_title
            : this.props.data.original_name}
        </h2>
        {/* Descripcion */}
        <p> </p>
        <p>{} </p>
        <div>
          {
            // verMas: False aca
            this.state.verMas ? (
              // Que pasa si verMas True
              <p> {this.props.data.overview} </p>
            ) : (
              // Que pasa si verMas False
              ""
            )
          }
          {/* Ver Mas - Ver Menos */}
          <button className="more" onClick={() => this.mostrarOcultar()}>
            {
              // verMas: Verdadero aca --> Cambio por mostrarOcultar
              this.state.verMas ? "Ver Menos" : "Ver Mas"
            }
          </button>
          {/* Detalle */}
          <Link to={`/detalle/${this.props.type}/${this.props.data.id}`}>
            <p>Ir a detalle</p>{" "}
          </Link>
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
