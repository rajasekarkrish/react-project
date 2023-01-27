import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/header';

import { render } from "react-dom";

const Routing = ()=> {
  return(
   <App/>
  )
  }
  
  const rootElement = document.getElementById("root");
  render(<Routing />, rootElement);
  
