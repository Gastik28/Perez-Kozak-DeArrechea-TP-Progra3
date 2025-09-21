import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from '../../components/Card/Card'

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
    this.refrescar();
  }

  refrescar() {
    // Películas
    let recuperoFavMovies = localStorage.getItem("favoriteMovies");
    let favParceadoMovies = JSON.parse(recuperoFavMovies);
    let favMovies = [];

    if (favParceadoMovies) {
      favParceadoMovies.map((elm) =>
        fetch(`https://api.themoviedb.org/3/movie/${elm}?api_key=${apikey}`)
          .then((resp) => resp.json())
          .then((data) => {
            favMovies.push(data);
            this.setState({
              favoriteMovies: favMovies,
            });
          })
      );
    }

    // Series
    let recuperoFavSeries = localStorage.getItem("favoriteSeries");
    let favParceadoSeries = JSON.parse(recuperoFavSeries);
    let favSeries = [];

    if (favParceadoSeries) {
      favParceadoSeries.map((elm) =>
        fetch(`https://api.themoviedb.org/3/tv/${elm}?api_key=${apikey}`)
          .then((resp) => resp.json())
          .then((data) => {
            favSeries.push(data);
            this.setState({
              favoriteSeries: favSeries,
            });
          })
      );
    }
  }


  borrarTodos() {
    localStorage.setItem("favoriteMovies", JSON.stringify([]));
    localStorage.setItem("favoriteSeries", JSON.stringify([]));
    this.setState({ favoriteMovies: [], favoriteSeries: [] });
  }


  render() {
    return (
      <main>
        <div className="favorites-container">
          <h1 className="page-title">Mis Favoritos</h1>

          <h2 className="section-title">Películas favoritas</h2>
          <section className="movies-grid">
            {this.state.favoriteMovies.length === 0 ? (
              <p className="favorites-empty">No hay películas favoritas.</p>
            ) : (
              this.state.favoriteMovies.map((item) =>
                <Card key={item.id} data={item} type="movie" />
              )
            )}
          </section>

          <h2 className="section-title">Series favoritas</h2>
          <section className="movies-grid">
            {this.state.favoriteSeries.length === 0 ? (
              <p className="favorites-empty">No hay series favoritas.</p>
            ) : (
              this.state.favoriteSeries.map((item) =>
                <Card key={item.id} data={item} type="tv" />
              )
            )}
          </section>

          <div
            className="detail-buttons"
            style={{ marginTop: "2rem", justifyContent: "center" }}
          >
            <button onClick={() => this.refrescar()}>Refrescar</button>
            <button onClick={() => this.borrarTodos()}>Borrar todos</button>
          </div>
        </div>
      </main>
    );
  }
}

export default Favoritos;
