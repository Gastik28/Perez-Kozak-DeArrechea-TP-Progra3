import React, { Component } from 'react'
import Card from '../Card/Card'
 class TopRatedMovies extends Component {
  render() {
    return (
 <section className='Section_container'>
            {
                this.props.movies.slice(0,4).map((elm,idx)=> <Card key={idx + elm.original_title} data={elm}/> )
            }
        </section>    )
  }
}

export default TopRatedMovies