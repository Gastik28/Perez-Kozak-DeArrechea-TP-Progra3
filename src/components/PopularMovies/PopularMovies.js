import React, { Component } from 'react'
import Card from '../Card/Card'
import './styles.css'

 class PopularMovies extends Component {
    
  render() {
    return (
        <section className='section_popmovie'>
            {
                this.props.movies.slice(0,4).map((elm,idx)=> <Card key={idx + elm.original_title} data={elm} css={'card-article-popular-movies'} type={'movie'}/> )
            }
        </section>
    )
  }
}

export default PopularMovies