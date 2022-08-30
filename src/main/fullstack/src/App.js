import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import ProfileAPI from "./components/HomePage/ProfileAPI";


function App() {


  return (
    <div className="App">
      <ProfileAPI />
      <Navigation />
    </div>
  );
}

export default App;
