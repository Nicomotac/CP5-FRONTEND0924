import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FormularioFuncionario from './Routes/Home/Formulario/FormularioFuncionario.tsx'
import ListaFuncionario from './Routes/Home/ListaFuncionarios/ListaFuncionario.tsx'
import PaginaInicial from './Routes/Home/PaginaInicial.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaInicial />,
    children: [
      {
        path: '/',
        element: <ListaFuncionario />
      },
      {
        path: '/incluir',
        element: <FormularioFuncionario />
      },
      {
      path: '/editar/id',
      element: <FormularioFuncionario />
    },
    {
      path: '/excluir',
      element: <FormularioFuncionario />
    },
    {
      path: '/listar',
      element: <FormularioFuncionario />
    }

    ]
  }
])


createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <RouterProvider router ={router} />
        <App />
  </StrictMode>,
)
