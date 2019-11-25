import React, {Component} from 'react';
import {Box} from "@material-ui/core";

class Container extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoaded: true,
            container: null
        };
    }

    render() {
        return this.state.isLoaded ? (
            <Box className={this.props.classes.page_content} >
                {this.props.contentId}

            </Box>
        ) : (null)
    };
}

export default Container;
