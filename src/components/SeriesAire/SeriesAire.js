import React, { Component } from 'react'
import Card from '../Card/Card'
import './styles.css'

class SeriesAire extends Component {
  render() {
    return (
      
<section className='section_serieaire'>
            {
                this.props.series.slice(0,4).map((elm,idx)=> <Card key={idx + elm.original_name} data={elm} css={'card-article-series-air'}/> )
            }
        </section>      )
  }
}

export default  SeriesAire