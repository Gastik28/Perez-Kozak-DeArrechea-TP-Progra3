import React, { Component } from "react";
import Card from "../../components/Card/Card";
const apikey = "66374e925f9ce0061d8e10191732f374";
const urlPopMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`;
class Peliculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Recuperando la categoria de la URL
      category: this.props.match.params.category,
      MoviesPopular: [],
      MoviesTopRated: [],
    };
  }
  componentDidMount() {
    {
      this.state.category === "popular-movie"
        ? fetch(urlPopMovies)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesPopular: data.results,
              });
            })
        : fetch(urlTopRatedMovies)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesTopRated: data.results,
              });
            });
    }
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.category === "popular-movie"
            ? "All Popular Movies"
            : "All Top Rated Movies"}
        </h1>

        {this.state.category === "popular-movie" ? (
          <section className='section_topmovie'>
            {this.state.MoviesPopular.map((elm, idx) => (
              <Card
                key={idx + elm.original_title}
                data={elm}
                css={"card-article-popular-movies"}
                type={"movie"}
              />
            ))}
          </section>
        ) : (
          <section className='section_topmovie'>
            {this.state.MoviesTopRated.map((elm, idx) => (
              <Card
                key={idx + elm.original_title}
                data={elm}
                css={"card-article-popular-movies"}
                type={"movie"}
              />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default Peliculas;
