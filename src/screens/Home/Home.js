import React, { Component } from "react";
import { Link } from "react-router-dom";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import TopRatedMovies from "../../components/TopRatedMovies/TopRatedMovies";
import SeriesAire from "../../components/SeriesAire/SeriesAire";
import TopRatedSeries from "../../components/TopRatedSeries/TopRatedSeries";
import "./styles.css";

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
      pedidoInicialCompleto: false
    };
  }

  // Traigo la data de la api
  componentDidMount() {
    
    // Popular Movies
    fetch(urlPopMovies)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          MoviesPopular: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
      
      // Top Rated Movies
    fetch(urlTopRatedMovies)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Data",data);
        this.setState({
          MoviesTopRated: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
      
      // Series Al Aire
      fetch(urlSeriesAire)
      .then((resp) => resp.json())
      .then((data) => {        
        console.log("Data",data);
        
        this.setState({
          SeriesAire: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));

      // Top Rated Series
       fetch(urlTopRatedSeries)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          SeriesTopRated: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
      
      
      // Marcar como completo cuando terminen todos los fetch
   setTimeout(() => {
    this.setState({ pedidoInicialCompleto: true });
  }, 1000);
  
  }


  render() {    
    console.log("seriesAire", this.state.SeriesAire);
    
    return (
      <main>
        <div className="home-container">
          {this.state.pedidoInicialCompleto ? (
            <div>
          
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
