import React, { Component } from "react";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import TopRatedMovies from "../../components/TopRatedMovies/TopRatedMovies";
import SeriesAire from "../../components/SeriesAire/SeriesAire";
import TopRatedSeries from "../../components/TopRatedSeries/TopRatedSeries";
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
      SeriesTopRated: []
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
        this.setState({
          MoviesTopRated: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
      
      // Series Al Aire
      fetch(urlSeriesAire)
      .then((resp) => resp.json())
      .then((data) => {        
            console.log("SeriesAire API data:", data.results);

        this.setState({
          SeriesAire: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));

      // Top Rated Series
       fetch(urlTopRatedSeries)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("API TOP data.results:", data.results);
        this.setState({
          SeriesTopRated: data.results,
        });
      })
      .catch((error) => console.log("Error Fetch", error));
  }

  render() {    
    return (
      <div>
        <h1>Peliculas Populares</h1>
        <PopularMovies movies={this.state.MoviesPopular} />

        <h1>Peliculas Con Mayor Rating</h1>
        <TopRatedMovies movies={this.state.MoviesTopRated} />
        
        <h1>Series Al Aire</h1>
        <SeriesAire series={this.state.SeriesAire} />
        
        <h1>Series Con Mayor Rating</h1>
        <TopRatedSeries series={this.state.SeriesTopRated} />



      </div>
    );
  }
}

export default Home;
