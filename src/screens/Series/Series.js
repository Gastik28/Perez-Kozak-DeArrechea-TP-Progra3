import React, { Component } from "react";
import Card from "../../components/Card/Card";
const apikey = "66374e925f9ce0061d8e10191732f374";
const urlSeriesAire = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apikey}`;
const urlTopRatedSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}`;
class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Recuperando la categoria de la URL
      category: this.props.match.params.category,
      SeriesAire: [],
      SeriesTopRated: [],
    };
  }

  componentDidMount() {
    {
      this.state.category === "live-series"
        ? fetch(urlSeriesAire)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesAire: data.results,
              });
            })
        : fetch(urlTopRatedSeries)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesTopRated: data.results,
              });
            });
    }
  }
  render() {
    return (
      <main>
        <div className="page-container">
          <h1 className="page-title">
            {this.state.category === "live-series"
              ? "All Live Series"
              : "All Top Rated Series"}
          </h1>

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
        </div>
      </main>
    );
  }
}

export default Series;
