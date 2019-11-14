import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';
import {Box, Paper} from "@material-ui/core";

class Page extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            page: null
        };
    }

    componentDidMount() {
        fetch("/pages/" + this.props.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            page: result,
                            isLoaded: true,
                        }
                    });
                },
                (error) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: false,
                            error
                        }
                    });
                }
            )
    }

    savePage = (event) => {

        // temp trial

        fetch("/pages/"+this.props.id+"/components", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "top=100&left=50&height=300&width=600"
        })
            .then(res => res.json())
            .then(
                (result) => {

                },
                (error) => {
                    this.setState(state => {
                        return {
                            ...state,
                            error
                        }
                    });
                }
            )

    }

    render() {
        return this.state.isLoaded ? (
            <Paper style={{margin: 10, marginTop: 10}}>

                <Paper>
                    <Button>
                        <EditIcon/>
                        Edit
                    </Button>
                    <Button>
                        <PublishIcon/>
                        Publish
                    </Button>
                    <Button>
                        <LockIcon/>
                        Lock view
                    </Button>
                    <Button onClick={this.savePage}>
                        <SaveIcon/>
                        Save
                    </Button>
                </Paper>

                <Box
                    style={{
                        minWidth: 1200,
                        maxWidth: 1200,
                        minHeight: 500,
                        maxHeight: 500
                    }}
                    // class={"page_content"}
                ></Box>

            </Paper>
        ) : (null)
    };
}

export default Page;
