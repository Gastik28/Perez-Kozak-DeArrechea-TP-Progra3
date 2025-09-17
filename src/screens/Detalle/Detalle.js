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
                MoviesDetalles: data
              });
            })
        : 
        fetch(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=${apikey}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesDetalles: data
              });
            })
        ;
    }
    
  }

  render() {
    console.log(this.state.SeriesDetalles);
    

    return <div>{this.state.SeriesDetalles.original_name}</div>;
  }
}

export default Detalle;
