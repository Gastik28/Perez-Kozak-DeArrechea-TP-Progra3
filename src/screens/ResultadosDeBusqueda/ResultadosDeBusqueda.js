import React, { Component } from "react";

class ResultadosDeBusqueda extends React.Component {
  constructor(props){
    super(props);
    this.state = { resultados: [] };
  }

  componentDidMount(){
    const { tipo, query } = this.props.match.params;
    const endpoint = tipo === "tv" ? "search/tv" : "search/movie";
    const apikey = "66374e925f9ce0061d8e10191732f374";

    fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apikey}&query=${query}`)
      .then(r => r.json())
      .then(data => 
        this.setState({
           resultados: data.results || [] 
          }))
      .catch(err => console.log("Error:", err));
  }

  componentDidUpdate(prevProps){
    // si cambió el query o el tipo, vuelvo a buscar
    if (
      this.props.match.params.query !== prevProps.match.params.query ||
      this.props.match.params.tipo !== prevProps.match.params.tipo
    ) {
      const { tipo, query } = this.props.match.params;
      const endpoint = tipo === "tv" ? "search/tv" : "search/movie";
      const apikey = "66374e925f9ce0061d8e10191732f374";

      fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apikey}&query=${query}`)
        .then(r => r.json())
        .then(data => this.setState({ resultados: data.results || [] }))
        .catch(err => console.log("Error:", err));
    }
  }

  render(){
    const { tipo, query } = this.props.match.params;
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
