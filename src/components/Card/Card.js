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
    const storageKey = type === "movie" ? "favoriteMovies" : "favoriteSeries"; // FavoritesMovies y Series son las claves del local, por eso pone eso
    const currentId = data.id; // Solo el ID

    let recuperoFav = localStorage.getItem(storageKey); // Recuperamos la info que existe en Local en un string dependiendo si es el type es movie o series

    // Que pasa cuando el Local Storage esta vacio
    if (recuperoFav == null) {
      let fav = [currentId]; //ID de la card que se toca 
      localStorage.setItem(storageKey, JSON.stringify(fav)); //Meto solo el ID de la carta que toque agregar a Fav. Guardo mi primer favorito
    }

    // Que pasa cuando el local storage ya tiene algo
    else {
      let favParceado = JSON.parse(recuperoFav); //lo que existe en el localStorage, que era un string, lo paso a un array para poder usarlo en JS

      if (!favParceado.includes(currentId)) // Si el Fav Parceado no incluye al ID de la card que se toca...
        {
        favParceado.push(currentId); //Vamos a pushear este nuevo ID a nuestro array que ya existe en local
        localStorage.setItem(storageKey, JSON.stringify(favParceado)); // Metemos este nuevo Array con el nuevo ID en el local 
      }
    }
    this.setState({ esFav: true }); //Cambia el estado de esFav
  }

  sacaFav() {
    const { data, type } = this.props;
    const storageKey = type === "movie" ? "favoriteMovies" : "favoriteSeries";
    const currentId = data.id;

    let recuperoFav = localStorage.getItem(storageKey); //Recupero la info del storage

    if (recuperoFav) // Si existe la info (true)
      {
      let favParceado = JSON.parse(recuperoFav); //Parceo lo recuperado a un array
      let filter = favParceado.filter((elm) => elm !== currentId); //Hago un filter y creo un nuevo array donde sea todo igual salvo que no contenga el ID de la card que toque
      localStorage.setItem(storageKey, JSON.stringify(filter)); // Guardo en el local el nuevo array sin el ID de la carta que toque
    }

    this.setState({ esFav: false }); //Cambia el estado 
    if (this.props.onClick) this.props.onClick(); //esto es para refrescar en favoritos. 
    // Basicamente si saco un favorito aca, actualiza automaticamente el estado favoriteMovies o favoriteSeries en la screen de favorites para que tambien se elimine de ahi
    // Es para cuando eliminas una pelicula directamente de la screen de favorites, no tengas que refrescar la pagina para que se elimine, sino que se elimina al toque.
    // Le avisa al componente padre que refresque la lista
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
    // Por cada carta que hay en la screen, se pregunta "El ID de esta carta esta en el Local?"
    // Si esta en el local pone esFav como True y muestra el boton "Eliminar Fav"
    // Si no esta en el local deja el valor predeterminado de esFav que seria true y muestra el boton "Agregar Fav"
    // Sirve para que el boton de favoritos muestre el estado real de la card 
  }

  render() {

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
          <button className="more" onClick={() => this.mostrarOcultar() }>   {/* Metodo MostrarOcultar() */}
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

        {
          // esFav es falso o verdaedero dependeindo la carta
        this.state.esFav ? (
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
