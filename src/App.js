import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import PageNotFound from "./screens/PageNotFound/PageNotFound"; // importamos el componente de la pagina no encontrada


function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/detalle/:type/:id" component={Detalle} exact={true} />
        <Route component={PageNotFound}  />        {/* ruta para la pagina no encontrada */}

      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
