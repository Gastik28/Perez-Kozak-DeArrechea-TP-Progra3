import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.css'

class FilterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            busqueda: ''
        }
    }

    controlarForm(evento) {
        evento.preventDefault()
    }

    controlarInput(evento) {
        this.setState({
            busqueda: evento.target.value
        }, () => this.props.filtrar(this.state.busqueda)
        );
    }

    render() {
        return (
            <form onSubmit={(evento) => this.controlarForm(evento)} className="filter-form">
                <input onChange={(evento) => this.controlarInput(evento)} />
                <button>Buscar</button>
            </form>
        )
    }
}

export default withRouter(FilterForm)
