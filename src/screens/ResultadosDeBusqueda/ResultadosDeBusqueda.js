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
      .then(data => this.setState({ resultados: data.results || [] }))
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
      <div>
        <h1>Resultados ({tipo}) para: {query}</h1>
        <ul>
          {this.state.resultados.map(item => (
            <li key={item.id}>{item.title || item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ResultadosDeBusqueda;
