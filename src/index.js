//1. Import React and REACTDOM library
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
//Import pages
import ErrorPage from "./error-page";
import SignUp, { loader as BCLoader, action as signupAction } from './Pages/SignUp';
import ApplicationForm, { action as saveApplicationAction } from './Pages/ApplicationForm';
import ViewApplication from './Pages/ViewApplication';
import { action as updateAction } from './Pages/InspectorHomepage';
import { action as certificationAction } from './Pages/CertifierHomepage';
import Track from './Pages/Track';
import OrganicCertificate from './Pages/OrganicCertificate';
import ReactLeaflet from './map/ReactLeaflet';

// const combinedPageLoader = async () => {
//   return Promise.all([BCLoader(),UserLoader()]);
// };
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: BCLoader,
    action: signupAction
  },
  {
    path: "/application",
    element: <ApplicationForm />,
    loader: BCLoader,
    action: saveApplicationAction
  },
  {
    path: "/viewapplication",
    element: <ViewApplication />,
    loader: BCLoader
  },
  {
    path: "/track",
    element: <Track />,
    loader: BCLoader,
  },
  {
    path: "/certificate/:id",
    element: <OrganicCertificate />,
    loader: BCLoader,
  },
  {
    path: "/map",
    element: <ReactLeaflet />,
  },
  {
    path: "/update",
    action: updateAction,
  },
  {
    path: "/updatecertifier",
    action: certificationAction,
  },



]);

//2.Get a reference to the div with id 'root'
const rootElement = document.getElementById('root');

//3.Tell React to tke control of that element
const root = ReactDOM.createRoot(rootElement);

//4.Show component on screen
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);