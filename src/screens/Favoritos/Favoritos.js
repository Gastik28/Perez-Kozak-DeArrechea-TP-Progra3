import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
const apikey = "66374e925f9ce0061d8e10191732f374";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      favoriteSeries: [],
    };
  }

  componentDidMount() {
    let recuperoFavMovies = localStorage.getItem("favoriteMovies"); //recuperamos lo que existe en el local storage movies
    let recuperoFavSeries = localStorage.getItem("favoriteSeries"); //recuperamos lo que existe en el local storage series
    let MoviesParce = [];
    let SeriesParce = [];
    let FavMovies = [];
    let FavSeries = [];
    // Si el local de movies no esta vacio
    if (recuperoFavMovies !== null) {
      MoviesParce = JSON.parse(recuperoFavMovies); //Pasamos lo que recuperamos a un nuevo array
    }
    // Si el local de series no esta vacio
    if (recuperoFavSeries !== null) {
      SeriesParce = JSON.parse(recuperoFavSeries);
    }

    // Movies
    if (MoviesParce) {
      MoviesParce.map((elm) =>
        fetch(`https://api.themoviedb.org/3/movie/${elm}?api_key=${apikey}`)
          .then((resp) => resp.json())
          .then((data) => {
            FavMovies.push(data);
            this.setState(
              {
                movies: FavMovies, // a movies le metemos todas las movies favoritas
              },
             
            );
          })
      );
    }
  }

 

  render() {
    console.log('Favortias movies',this.state.movies)
    return (
      <main>
        <div className="favorites-container">
          <h1 className="page-title">Mis Favoritos</h1>

          <h2 className="section-title">Películas favoritas</h2>
          <section className="movies-grid">

          {
            this.state.favoriteMovies.length > 0 ? this.state.favoriteMovies.map((elm) => 
                (
                <Card data={elm} css={"card-article-popular-movies"} type={"movie"}/>
                )
              ) : <p className="favorites-empty">No hay películas favoritas.</p>

          }

            
          </section>

          <h2 className="section-title">Series favoritas</h2>
          <section className="movies-grid">
            {this.state.favoriteSeries.length === 0 ? (
              <p className="favorites-empty">No hay series favoritas.</p>
            ) : (
              this.state.favoriteSeries.map((item) =>
                this.renderItem(item, "tv")
              )
            )}
          </section>

          <div
            className="detail-buttons"
            style={{ marginTop: "2rem", justifyContent: "center" }}
          >
           
          </div>
        </div>
      </main>
    );
  }
}

export default Favoritos;
