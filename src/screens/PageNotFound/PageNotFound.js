import React from "react";

function PageNotFound() {
  return (
    <main>
      <div className="not-found">
        <h1>404 - Contenido inexistente</h1>
        <p>La página que buscás no existe.</p>
        <a href="/">Volver al inicio</a>
      </div>
    </main>
  );
}

export default PageNotFound;