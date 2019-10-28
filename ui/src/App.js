import React, {Component} from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import LandingPage from "./components/LandingPage";
import Admin from "./components/Admin";
import Season from "./components/Season";
import Team from "./components/Team";
import Group from "./components/Group";
import Players from "./components/Players";
import Stats from "./components/history_components/Stats";
import Statistics from "./components/history_components/Statistics";
import Coefficients from "./components/history_components/Coefficients";
import Player from "./components/Player";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={LandingPage}/>
            </BrowserRouter>
        );
    }
}

export default App;
