import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import {withStyles} from "@material-ui/core";

const palette = {
    color3: 'rgb(204,214,205)',
    color2: 'rgb(160, 191, 163)',
    color1: 'rgb(113, 158, 118)',
}

const styles = theme => ({
    pages_tabs_root: {
            background: palette.color1,
            border: 0,
            "border-top-left-radius": 4,
            "border-top-right-radius": 4,
            color: 'white',
    },
    pages_tabs_indicator: {
        backgroundColor: 'transparent',
    },
    pages_tabs_selected: {
        background: palette.color2,
        color: 'white'
    },
    page_toolbar: {
        background: palette.color2,
        padding: '0 30px',
        color: 'white',
         height: 40
    },
    page_content: {
        background: palette.color3,
        height: 768
    }

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
