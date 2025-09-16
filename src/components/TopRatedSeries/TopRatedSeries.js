import React, { Component } from 'react'
import Card from '../Card/Card'
import './styles.css'

class TopRatedSeries extends Component {
  render() {
    return (
<section className='section_topseries'>
            {
                this.props.series.slice(0,6).map((elm,idx)=> <Card key={idx + elm.original_title} data={elm} css={'card-article-top-rated-series'}/> )
            }
        </section>      )
  }
}

export default TopRatedSeries