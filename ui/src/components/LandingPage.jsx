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
            <div>
                <Pages />
            </div>
            )
            : (null)
    };
}

export default LandingPage;
