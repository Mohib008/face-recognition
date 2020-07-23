import React, { Component } from 'react';
import Particles from "react-particles-js";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./Components/Rank/Rank.js";
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        blur: 5,
        value_area: 100
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className ="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*<FaceRecognition />*/
        }
      </div>
    );
  }
}

export default App;
