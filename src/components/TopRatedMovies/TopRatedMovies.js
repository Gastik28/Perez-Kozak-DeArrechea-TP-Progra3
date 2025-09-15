import React, { Component } from 'react'
import Card from '../Card/Card'
 class TopRatedMovies extends Component {
  render() {
    return (
 <section>
            {
                this.props.movies.map((elm,idx)=> <Card key={idx + elm.original_title} data={elm}/> )
            }
        </section>    )
  }
}

export default TopRatedMovies