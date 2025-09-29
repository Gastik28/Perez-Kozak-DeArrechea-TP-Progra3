import React, { Component } from "react";
import Card from "../../components/Card/Card";
import "./styles.css";
const apikey = "66374e925f9ce0061d8e10191732f374";
class Peliculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.match.params.category, // Recuperando la categoria de la URL
      MoviesPopular: [],
      MoviesTopRated: [],
      textoBoton: "Cargar más peliculas",
      pageNumber: 1
    };
  }
  componentDidMount() {
    {
      this.state.category === "popular-movie"
        ? 
        // Popular Movies Fetch 
        fetch( `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesPopular: data.results,
                pageNumber: this.state.pageNumber + 1 //Sumamos una pagina

              });
            })
        : 
        // Top Rated Movies Fetch 
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesTopRated: data.results,
                pageNumber: this.state.pageNumber + 1 //Sumamos una pagina

              });
            });
    }
  }

 cargarMas(){
this.state.category === "popular-movie"
        ? 
        // Hacemos un Fetch de las nuevas 20 peliculas que trae la proxima pagina
        fetch( `https://api.themoviedb.org/3/movie/popular?page=${this.state.pageNumber}&api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesPopular: this.state.MoviesPopular.concat(data.results), //Concateno las nuevos peliuclas con las que ya estan en MoviesPopular
                pageNumber: this.state.pageNumber + 1
              });
            })
        : 
        fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${this.state.pageNumber}&api_key=${apikey}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesTopRated: this.state.MoviesTopRated.concat(data.results), //Concateno los nuevos productos con los viejos
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
            {this.state.category === "popular-movie"
              ? "All Popular Movies"
              : "All Top Rated Movies"}
          </h1>
          
          {/* Cards */}
          {this.state.category === "popular-movie" ? (
            <section className='movies-grid'>
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
            <section className='movies-grid'>
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
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            {/*  Boton Cargar Mas */}
            <button className="detail-buttons" onClick={()=> this.cargarMas()}>
                {this.state.textoBoton}
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Peliculas;
