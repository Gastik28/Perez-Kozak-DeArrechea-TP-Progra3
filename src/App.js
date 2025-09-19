import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Peliculas from "./screens/Peliculas/Peliculas";
import Series from "./screens/Series/Series";
import Detalle from "./screens/Detalle/Detalle";
import PageNotFound from "./screens/PageNotFound/PageNotFound"; // importamos el componente de la pagina no encontrada
import ResultadosDeBusqueda from "./screens/ResultadosDeBusqueda/ResultadosDeBusqueda";
import Favoritos from "./screens/Favoritos/Favoritos"; // importamos el componente de los favoritos
import './styles.css';


function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/movies/:category?" component={Peliculas} exact={true} />
        <Route path="/series/:category?" component={Series} exact={true} />
        <Route path="/detalle/:type/:id" component={Detalle} exact={true} />
        <Route path="/resultados/:tipo/:query" component={ResultadosDeBusqueda} exact={true} />
        <Route path="/favorites" component={Favoritos} exact={true} />  
        <Route component={PageNotFound}  />       
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
