import React, { Component } from "react";
import Card from "../../components/Card/Card";
import "./styles.css";
const apikey = "66374e925f9ce0061d8e10191732f374";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.match.params.category, // Recuperando la categoria de la URL
      SeriesAire: [],
      SeriesTopRated: [],
      textoBoton: "Cargar más peliculas",
      pageNumber: 1
    };
  }

  componentDidMount() {
    {
      this.state.category === "live-series"
        ? 
        // Live-Series Fetch 
        fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesAire: data.results,
                pageNumber: this.state.pageNumber + 1 //Sumamos 1 pagina

              });
            })
        : 
        // Top-Rated-Series Fetch 
        fetch( `https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesTopRated: data.results,
                pageNumber: this.state.pageNumber + 1
              });
            });
    }
  }

   cargarMas(){
this.state.category === "live-series"
        ? 
        // Hacemos un Fetch de las nuevas 20 Series que trae la proxima pagina
        fetch( `https://api.themoviedb.org/3/tv/airing_today?page=${this.state.pageNumber}&api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
            console.log("Data",data.total_pages);
              this.setState({
                SeriesAire: this.state.SeriesAire.concat(data.results), //Concateno las nuevos Series con las que ya estan en SeriesAire
                pageNumber: this.state.pageNumber + 1
              });
            })
        : 
        fetch(`https://api.themoviedb.org/3/tv/top_rated?page=${this.state.pageNumber}&api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesTopRated: this.state.SeriesTopRated.concat(data.results), //Concateno los nuevos productos con los viejos
                pageNumber: this.state.pageNumber + 1
              });
            });  
 }
  render() {
    return (
      <main>
        <div className="page-container">
          {/* h1 */}
          <h1 className="page-title">
            {this.state.category === "live-series"
              ? "All Live Series"
              : "All Top Rated Series"}
          </h1>

          {/* Cards */}
          {this.state.category === "live-series" ? (
            <section className="movies-grid">
              {this.state.SeriesAire.map((elm, idx) => (
                <Card
                  key={idx + elm.original_name}
                  data={elm}
                  css={"card-article-popular-movies"}
                  type={"serie"}
                />
              ))}
            </section>
          ) : (
            <section className="movies-grid">
              {this.state.SeriesTopRated.map((elm, idx) => (
                <Card
                  key={idx + elm.original_name}
                  data={elm}
                  css={"card-article-popular-movies"}
                  type={"serie"}
                />
              ))}
            </section>
          )}
           <div style={{textAlign: 'center', marginTop: '2rem'}}>
            {/* Boton Cargar Mas */}
            <button className="detail-buttons" onClick={()=> this.cargarMas()}>
                {this.state.textoBoton}
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Series;
