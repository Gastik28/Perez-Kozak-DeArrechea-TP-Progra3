import React, { Component } from "react";
import "./styles.css";

class ResultadosDeBusqueda extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      resultados: [] 
    };
  }

  componentDidMount(){
    const { tipo, query } = this.props.match.params; // Recupero los parametros :tipo y :query de la busqueda 
    const endpoint = tipo === "tv" ? "search/tv" : "search/movie"; // Si tipo es tv usa un endpoint y sino otro 
    const apikey = "66374e925f9ce0061d8e10191732f374";

    fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apikey}&query=${query}`)
      .then(r => r.json())
      .then(data => 
        this.setState({
           resultados: data.results || [] // a resultados le meto todas las peliculas o series que me muestra como resultado de lo buscado por el usuario 
          }))
      .catch(err => console.log("Error:", err));
  }

  componentDidUpdate(prevProps){
    // si cambió el query o el tipo, vuelvo a buscar
    if (
      this.props.match.params.query !== prevProps.match.params.query || // Comparan que lo que busco nuevo el usuario sea diferente a lo que previamente busco el usuario 
      this.props.match.params.tipo !== prevProps.match.params.tipo // lo mmismo con tipo porque puede cambiar de peliculas a serie por ejemple y viceversa
    ) {
      const { tipo, query } = this.props.match.params;
      const endpoint = tipo === "tv" ? "search/tv" : "search/movie";
      const apikey = "66374e925f9ce0061d8e10191732f374";

      fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apikey}&query=${query}`)
        .then(r => r.json())
        .then(data => this.setState({ resultados: data.results || [] }))
        .catch(err => console.log("Error:", err));

        // Si alguno de las props cambiaron, osea Typw o Query cambio, vuelve a hacer todo el fetch a la API con los nuevos parametros y actualiza el estado
        // Did Update sirve para actualizar los resultados sin salir de la pantalla que estabamos o reinciarla. 
    }
  }

  render(){
    const { tipo, query } = this.props.match.params; // Los parametros del primer render
    return (
      <main>
        <div className="search-results">
          <h1 className="search-query">Resultados ({tipo}) para: {query}</h1>
          {this.state.resultados.length === 0 ? (
            <p className="no-results">No se encontraron resultados para tu búsqueda.</p>
          ) : (
            <div className="movies-grid">
              {this.state.resultados.map(item => (
                <div key={item.id} className="card-article-popular-movies">
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                  <h3>{item.title || item.name}</h3>
                  <div>
                    <p>{item.overview ? item.overview.substring(0, 100) + '...' : 'Sin descripción disponible'}</p>
                    <a href={`/detalle/${tipo}/${item.id}`}>Ver detalle</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default ResultadosDeBusqueda;
