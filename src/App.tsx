import './App.css';

import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import GetAllParticipant from './components/participants/GetAllParticipant';
import Confirmation from './components/Confirmation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

function App() {
  const router = createBrowserRouter([
    {
      path: '/success/:id',
      element: <Confirmation></Confirmation>,
    },
    {
      path: '/',
      element: <RegistrationForm></RegistrationForm>,
    },
    {
      path: '/gapfb',
      element: <GetAllParticipant></GetAllParticipant>,
    },
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
