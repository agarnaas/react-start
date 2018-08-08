import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Leaflet from "./Leaflet/Leaflet";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    Anepane prøver ut <code>Leaflet</code> med kart fra{" "}
                    <a href="http://www.kartverket.no/">Kartverket</a>
                </p>
                <br />
                <div className="Map-container">
                    <Leaflet />
                </div>
            </div>
        );
    }
}

export default App;
