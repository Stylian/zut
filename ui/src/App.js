import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";

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
