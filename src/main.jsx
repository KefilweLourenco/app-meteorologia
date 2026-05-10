// Importa o React para permitir usar JSX.
import React from "react";
// Importa a função que cria a raiz da aplicação no navegador.
import ReactDOM from "react-dom/client";
// Importa o componente principal do projeto.
import App from "./App.jsx";
// Importa os estilos globais da aplicação.
import "./estilos.css";

// Procura a div "root" do index.html e renderiza a aplicação dentro dela.
ReactDOM.createRoot(document.getElementById("root")).render(
  // O StrictMode ajuda a identificar problemas comuns durante o desenvolvimento.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
