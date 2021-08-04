import React from 'react';
import './App.css';
import Router from './Router';
import { BlogContextProvider } from './Context/Context';
import axios from 'axios';
axios.defaults.withCredentials = true;

function App() {
  return (
    <BlogContextProvider>
      <Router />
    </BlogContextProvider>
  );
}

export default App;
