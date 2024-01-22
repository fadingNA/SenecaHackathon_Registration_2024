import "./App.css";

import RegistrationForm from "./components/RegistrationForm";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import Confirmation from "./components/Confirmation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import GetAllParticipant from "./components/participants/GetAllParticipant";
import Login from "./components/participants/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/success/:id",
      element: <Confirmation></Confirmation>,
    },
    {
      path: "/",
      element: <RegistrationForm></RegistrationForm>,
    },
    {
      path: "/senecaadmin/getallparticipant",
      element: <GetAllParticipant></GetAllParticipant>,
    },
    {
      path: '/senecaadmin/login',
      element: <Login></Login>
    }
  ]);
  return (
    <React.Fragment>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </React.Fragment>
  );
}

export default App;

//<RegistrationForm></RegistrationForm>
