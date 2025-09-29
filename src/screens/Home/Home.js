import React, { Component } from "react";
import { Link } from "react-router-dom";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import TopRatedMovies from "../../components/TopRatedMovies/TopRatedMovies";
import SeriesAire from "../../components/SeriesAire/SeriesAire";
import TopRatedSeries from "../../components/TopRatedSeries/TopRatedSeries";
import FilterForm from "../../components/FilterForm/FilterForm";
import "./styles.css";
import "../../components/Loading/styles.css"

const apikey = "66374e925f9ce0061d8e10191732f374";
const urlPopMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`;
const urlSeriesAire = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apikey}`;
const urlTopRatedSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}`;



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MoviesPopular: [],
      MoviesTopRated: [],
      SeriesAire: [],
      SeriesTopRated: [],
      Categories: ['popular-movie', 'top-rated-movie', 'live-series', 'top-rated-series'],
      pedidoInicialCompleto: false,
      // Datos originales para el filtrado
      originalMoviesPopular: [],
      originalMoviesTopRated: [],
      originalSeriesAire: [],
      originalSeriesTopRated: []
    };
  }

  // Traigo la data de la api
  componentDidMount() {
    
    // Popular Movies
    fetch(urlPopMovies)
      .then((resp) => resp.json()) //Formato Json
      .then((data) => {
        
        this.setState({
          MoviesPopular: data.results,
          originalMoviesPopular: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
      
      // Top Rated Movies
    fetch(urlTopRatedMovies)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          MoviesTopRated: data.results,
          originalMoviesTopRated: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
      
      // Series Al Aire
      fetch(urlSeriesAire)
      .then((resp) => resp.json())
      .then((data) => {        
        
        this.setState({
          SeriesAire: data.results,
          originalSeriesAire: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));

      // Top Rated Series
       fetch(urlTopRatedSeries)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          SeriesTopRated: data.results,
          originalSeriesTopRated: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
      
      
      // Marcar como completo cuando terminen todos los fetch. La funcion se va a ejecutar luego de 1 segundo
      //Luego de que se complete la llamada a la API el estado del componente se actualiza 
   setTimeout(() => {
    this.setState({ pedidoInicialCompleto: true });
  }, 1000);
  
  }
  
  filtrarContenido(textoAFiltrar) {
    console.log('textoAFiltrar', textoAFiltrar)
    
    if (textoAFiltrar.trim() === '') // Si el texto que el usuario busco esta vacio .trim() elimina espacios en blanco
      {
      this.setState({
        // Me restaura todos los datos originales, y me los reemplaza por el estado el cual tiene toda la data de la API 
        // Como los datos de "Original" en este caso son iguales a los otros, no me hace nada.
        MoviesPopular: this.state.originalMoviesPopular,
        MoviesTopRated: this.state.originalMoviesTopRated,
        SeriesAire: this.state.originalSeriesAire,
        SeriesTopRated: this.state.originalSeriesTopRated
      });
      return; // Evita que se siga ejecutando el filtrado
    }

    // Si el texto del usuario ya no esta mas vacio 

    // Creamos una nueva variable la cual va a filtrar las listras de las peliculas y series originales segun lo que busco el usuario 
    // Hace un filter y pasa los elementos a lowe case y crea un nuevo array que incluya solamente a las peliculas o series que cuyo titulo o nombre incluye el texto buscado 
    const peliculasPopularesFiltradas = this.state.originalMoviesPopular.filter(
      (elm) => elm.title.toLowerCase().includes(textoAFiltrar.toLowerCase())
    );
    
    const peliculasTopRatedFiltradas = this.state.originalMoviesTopRated.filter(
      (elm) => elm.title.toLowerCase().includes(textoAFiltrar.toLowerCase())
    );
    
    const seriesAireFiltradas = this.state.originalSeriesAire.filter(
      (elm) => elm.name.toLowerCase().includes(textoAFiltrar.toLowerCase())
    );
    
    const seriesTopRatedFiltradas = this.state.originalSeriesTopRated.filter(
      (elm) => elm.name.toLowerCase().includes(textoAFiltrar.toLowerCase())
    );
    
    console.log('hola',peliculasPopularesFiltradas.length)

    this.setState({
      // Actualizamos el estado de la data de las APIs con estas peliculas o series filtradas a partir de que el titulo este incluido en lo que busca el usuario
      // Si aca por ejemplo hay solo 2 pelicuals que coinciden con la busqueda, automaticamente se va a mostrar en la screen porque importamos los componentes de cada uno
      MoviesPopular: peliculasPopularesFiltradas,
      MoviesTopRated: peliculasTopRatedFiltradas,
      SeriesAire: seriesAireFiltradas,
      SeriesTopRated: seriesTopRatedFiltradas
    });
  }

  render() {    
    
    return (
      <main>
        <div className="home-container">

          {this.state.pedidoInicialCompleto ? (
            <div>
          {/* Le enviamos el metodo filtrarConenido con un parametro a FilterForm */}
          <FilterForm filtrar={(textoAFiltrar) => this.filtrarContenido(textoAFiltrar)} /> 
          
          <div className="content-section">
            <h1 className="section-title">Peliculas Populares</h1>
            <PopularMovies movies={this.state.MoviesPopular} />
            <Link to={`/movies/${this.state.Categories[0]}`} className="section-link"> Ver todas </Link>
          </div>

          <div className="content-section">
            <h1 className="section-title">Peliculas Con Mayor Rating</h1>
            <TopRatedMovies movies={this.state.MoviesTopRated} />
            <Link to={`/movies/${this.state.Categories[1]}`} className="section-link"> Ver todas </Link>
          </div>

          <div className="content-section">
            <h1 className="section-title">Series Al Aire</h1>
            <SeriesAire series={this.state.SeriesAire} />
            <Link to={`/series/${this.state.Categories[2]}`} className="section-link"> Ver todas </Link>
          </div>

          <div className="content-section">
            <h1 className="section-title">Series Con Mayor Rating</h1>
            <TopRatedSeries series={this.state.SeriesTopRated} />
            <Link to={`/series/${this.state.Categories[3]}`} className="section-link"> Ver todas </Link>
          </div>

          </div>
          ) : (
            <div className="loading-container">
            <img src="/GIF/loading.gif" alt="Cargando..." className="loading-gif" />                      <h2 className="loading">Cargando...</h2>
          </div>
          )}

        </div>
      </main>
    );
  }
}

export default Home;
