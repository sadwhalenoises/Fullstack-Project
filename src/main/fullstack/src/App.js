import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Homepage from "./components/Homepage";
import Navigation from "./components/Navigation";

const TestData = () =>{

  const fetchData = () => {
    axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-e6a7bc54-dc02-4783-8658-71bdac934ee8").then(res => {
      console.log(res);
    });
  };

  useEffect(() =>{
    fetchData();
  },[]);
  
}
function App() {
  return (
    <div className="App">
      <Navigation />
      
    </div>
  );
}

export default App;
