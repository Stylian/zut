import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';
import {Box, Paper} from "@material-ui/core";

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
            <Paper>

                <Box
                    style={{
                        minWidth: 1700,
                        maxWidth: 1700,
                        minHeight: 720,
                        maxHeight: 720,
                        margin: 10
                    }}
                >
                    {this.props.contentId}

                </Box>

            </Paper>
        ) : (null)
    };
}

export default Container;
