import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Peliculas from "./screens/Peliculas/Peliculas";
import Detalle from "./screens/Detalle/Detalle";
import PageNotFound from "./screens/PageNotFound/PageNotFound"; // importamos el componente de la pagina no encontrada
import ResultadosDeBusqueda from "./screens/ResultadosDeBusqueda/ResultadosDeBusqueda";


function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/movies/:category" component={Peliculas} exact={true} />
        <Route path="/detalle/:type/:id" component={Detalle} exact={true} />
        <Route path="/resultados/:tipo/:query" component={ResultadosDeBusqueda} exact={true} />
        <Route component={PageNotFound}  />       

      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
