import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import {withStyles} from "@material-ui/core";


const styles = theme => ({
    pages_tabs: {
        background: 'linear-gradient(90deg,  rgba(0,107,179,1) 0%, rgba(128,204,255,1) 100%)',
        border: 0,
        "border-top-left-radius": 4,
        "border-top-right-radius": 4,
        color: 'white',
    },
    page_toolbar: {
        background: 'linear-gradient(90deg,  rgba(0,107,179,1) 0%, rgba(128,204,255,1) 100%)',
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
    },
});


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;

        return (
            <BrowserRouter>
                <Route exact path='/' render={(props) => <LandingPage classes={classes} {...props} />}/>
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(App);
