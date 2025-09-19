import React, { Component } from "react";
const apikey = "66374e925f9ce0061d8e10191732f374";

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      type: props.match.params.type,
      MoviesDetalles: [],
      SeriesDetalles: [],
      pedidoInicialCompleto: false // Nuevo estado para controlar la carga
    };
  }
  componentDidMount() {
    {
      this.state.type === "movie"
        ? fetch(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apikey}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesDetalles: data,
                pedidoInicialCompleto: true // Marcar como completo cuando se recibe la data
              });
            })
        : fetch(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=${apikey}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesDetalles: data,
                pedidoInicialCompleto: true 
              });
            });
    }
  }

  render() {
    console.log("Movie", this.state.MoviesDetalles);
    console.log("serie", this.state.SeriesDetalles);

    return (
      <main>
         {this.state.pedidoInicialCompleto ? ( 
          <div className="detail-container">
            <div className="detail-poster">
              {
                this.state.type === "movie"
                    ? <img  src={`https://image.tmdb.org/t/p/w500${this.state.MoviesDetalles.poster_path}`} alt="" />
                    :
                    <img  src={`https://image.tmdb.org/t/p/w500${this.state.SeriesDetalles.poster_path}`} alt="" />        
              }
            </div>
            <div className="detail-info">
              <h1 className="detail-title"> 
                {
                  this.state.type === "movie"
                    ? this.state.MoviesDetalles.original_title:
                    this.state.SeriesDetalles.original_name
                } 
              </h1>

              <p className="detail-overview">
                {
                  this.state.type === "movie"
                    ? this.state.MoviesDetalles.overview:
                    this.state.SeriesDetalles.overview
                }
              </p>

              <div className="detail-meta">
                <p>Fecha de estreno:
                  {
                    this.state.type === "movie"
                      ? this.state.MoviesDetalles.release_date
                      :
                      this.state.SeriesDetalles.first_air_date
                  }        
                </p>
                <p>
                  {
                    this.state.type === "movie"
                      ? "Duracion: " + this.state.MoviesDetalles.runtime + " minutos"
                      :
                      ""
                  }     
                </p>
                <p>Rating:
                  {
                    this.state.type === "movie"
                      ? this.state.MoviesDetalles.vote_average
                      :
                      this.state.SeriesDetalles.vote_average
                  }      
                </p>
                <p>Genero:
                  {
                    this.state.type === "movie"
                      ? this.state.MoviesDetalles?.genres?.map((genre) => genre.name).join(", ")
                      : this.state.SeriesDetalles?.genres?.map((genre) => genre.name).join(", ")
                  }      
                </p>
              </div>

              <div className="detail-buttons">
                <button> Favoritos</button>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="loading">Cargando...</h2>
        )}
      </main>
    );
  }
}

export default Detalle;
