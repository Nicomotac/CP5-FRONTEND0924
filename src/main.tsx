import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaInicial from "./Routes/Home/PaginaInicial";
import ListaFuncionario from "./Routes/Home/ListaFuncionarios/ListaFuncionario";
import FormularioFuncionario from "./Routes/Home/Formulario/FormularioFuncionario";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, 
        element: <PaginaInicial /> 
      },
      { path: "listar", 
        element: <ListaFuncionario /> 
      },              
      { path: "formulario/incluir", 
        element: <FormularioFuncionario /> 
      }, 
      { path: "formulario/editar/:id", 
        element: <FormularioFuncionario /> 
      }, 
      { path: "formulario/excluir/:id", 
        element: <FormularioFuncionario /> 
      } 
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

