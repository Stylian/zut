import React, {Component} from 'react';
import Pages from "./Pages";

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: true // to change?
        };
    }

    render() {
        return this.state.isLoaded ? (
                <Pages classes={this.props.classes} />
            )
            : (null)
    };
}

export default LandingPage;
