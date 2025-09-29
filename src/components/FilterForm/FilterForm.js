import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.css'

class FilterForm extends Component {

    constructor(props) {
        // Props en este caso es filtrar=filtrarContenido(textoAFiltrar)
        super(props)
        this.state = {
            busqueda: ''
        }
    }

    controlarForm(evento) {
        evento.preventDefault() // Prevenimos que se envie el formulario 
    }

    controlarInput(evento) {
        this.setState({
            busqueda: evento.target.value // A busqueda del state le metemos Lo que el usuario busca en el buscador
        }, 
        () => this.props.filtrar(this.state.busqueda) // Le aplicamos el metodo filtrarContenido a (busqueda)
        );

        //Que va a hacer este metodo con busqueda:
        // Si el texto tiene algo, filtra los arrays originales y actualiza el estado con los resultados filtrados.
        // Si el texto está vacío, restaura los arrays originales (muestra todo).
    }

    render() {
        
        return (
            // on Submit --> Cuando se envia el form
            <form onSubmit={(evento) => this.controlarForm(evento)} className="filter-form">
                {/* On change --> Cada vez que escribe algo */}
                <input onChange={(evento) => this.controlarInput(evento)} /> 
                <button>Buscar</button>
            </form>
        )
    }
}

export default withRouter(FilterForm)
