import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/detalle/:type/:id" component={Detalle} exact={true} />

      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
