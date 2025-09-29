import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles.css";

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
          value={this.state.valor} // muestra el actual "valor" del estado 
          onChange={(e) => this.setState({ valor: e.target.value })} // Cada vez que el usuario escribe el actualizamos el State y a "valor" le metemos el valor del evento
          // El valor del evento, osea lo que el usuario busca es justamente "e.target.value" 
        />
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tipo"
              value="movie"
              checked={this.state.tipo === "movie"} //Si el estado "tipo" es movie, me aparece este radio seleccionado
              onChange={(e) => this.setState({ tipo: e.target.value })} //Cuando clickeamos en el radio button "tipo" actualiza con el value "movie" que definimos 2 renglones arriba
            />
            Películas
          </label>
          <label>
            <input
              type="radio"
              name="tipo"
              value="tv"
              checked={this.state.tipo === "tv"}
              onChange={(e) => this.setState({ tipo: e.target.value })} // Lo mismo pero con series
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
