import React, { Component } from 'react'
import Card from '../Card/Card'
class TopRatedSeries extends Component {
  render() {
    return (
<section className='Section_container'>
            {
                this.props.series.slice(0,4).map((elm,idx)=> <Card key={idx + elm.original_title} data={elm}/> )
            }
        </section>      )
  }
}

export default TopRatedSeries