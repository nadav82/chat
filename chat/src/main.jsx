import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { RootCmp } from './RootCmp'
import "./assets/styles/main.scss"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RootCmp />
  </BrowserRouter>
);
