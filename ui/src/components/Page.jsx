import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {Box, Paper, TableCell} from "@material-ui/core";

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

    deletePage = (event) => {

        fetch("/pages/"+this.props.id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    // redirect to landing page
                    window.location.href = "/";

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
            <Paper style={{margin: 10, "margin-top": 10}}>

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
                    <Button>
                        <SaveIcon/>
                        Save
                    </Button>
                    <Button onClick={this.deletePage}>
                        <DeleteIcon/>
                        Delete
                    </Button>
                </Paper>

                <Box
                    style={{
                        minWidth: 1200,
                        maxWidth: 1200,
                        minHeight: 500,
                        maxHeight: 500
                    }}
                    class={"page_content"}></Box>

            </Paper>
        ) : (null)
    };
}

export default Page;
