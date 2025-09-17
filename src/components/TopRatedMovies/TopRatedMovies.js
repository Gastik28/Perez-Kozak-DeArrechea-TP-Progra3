import React, { Component } from 'react'
import Card from '../Card/Card'
import './styles.css'


 class TopRatedMovies extends Component {
  render() {
    return (
 <section className='section_topmovie'>
            {
                this.props.movies.slice(0,6).map((elm,idx)=> <Card key={idx + elm.original_title} data={elm} css={'card-article-top-rated-movies'} type={'movie'}/> )
            }
        </section>    )
  }
}

export default TopRatedMovies