import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FormularioBusqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: "",
      tipo: "movie" // por defecto películas
    };
  }

  evitarSubmit(e) {
    e.preventDefault();
    // redirijo con withRouter a /resultados/:tipo/:query
    this.props.history.push(`/resultados/${this.state.tipo}/${this.state.valor}`);
  }

  render() {
    return (
      <form className="search-form" onSubmit={(e) => this.evitarSubmit(e)}>
        <label>Buscar:</label>
        <input
          type="text"
          value={this.state.valor}
          onChange={(e) => this.setState({ valor: e.target.value })}
        />
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tipo"
              value="movie"
              checked={this.state.tipo === "movie"}
              onChange={(e) => this.setState({ tipo: e.target.value })}
            />
            Películas
          </label>
          <label>
            <input
              type="radio"
              name="tipo"
              value="tv"
              checked={this.state.tipo === "tv"}
              onChange={(e) => this.setState({ tipo: e.target.value })}
            />
            Series
          </label>
        </div>
        <input type="submit" value="Buscar" />
      </form>
    );
  }
}

export default withRouter(FormularioBusqueda);
