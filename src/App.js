import React, { Component } from 'react';
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Navigation from "./Components/Navigation/Navigation";
import Signin from "./Components/Signin/Signin.js";
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
      imageUrl: '',
      box: {},
      route: "signin",
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className ="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === "signin" 
         ? <Signin onRouteChange={this.onRouteChange}/>
         : <div>
           <Logo />
           <Rank />
           <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
           <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
           </div>
         }
      </div>
    );
  }
}


export default App;
