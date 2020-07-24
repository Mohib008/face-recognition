import React, { Component } from 'react';
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./Components/Rank/Rank.js";
import './App.css';

const app = new Clarifai.App({
  apiKey: "4913057d21ec49a49a1aadb0f792b40e",
});


const particlesOptions = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        blur: 5,
        value_area: 100
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
    }


  render() {
    return (
      <div className ="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
