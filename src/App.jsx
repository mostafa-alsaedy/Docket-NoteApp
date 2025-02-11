import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import AuthenticationContext from "./Context/AuthenticationContext";
import NoteContext from "./Context/NoteContext";
import ModalContext from "./Context/ModalContext";
import ProtectedRoutes from "./Context/ProtectedRoutes";



function App() {

  const myRouter = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
      ]
    }
  ])

  return (
    <>
      <AuthenticationContext>
        <NoteContext>
          <ModalContext>
          <RouterProvider router={myRouter} />
          </ModalContext>
        </NoteContext>
      </AuthenticationContext>
    </>
  )
}

export default App
