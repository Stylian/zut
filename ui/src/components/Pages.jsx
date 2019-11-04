import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Page from "./Page";

class Pages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            pages: [],
            tabActive: 0,
            dialogOpen: false,
            title: "",
            titleError: true,
            description: "",
        };
    }

    componentDidMount() {
        fetch("/pages/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            pages: result,
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

    closeDialog = (event, newValue) => {
        this.setState(state => {
            return {
                ...state,
                dialogOpen: false,
            }
        });
    }

    insertPage = (event) => {

        fetch("/pages/", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "title=" + this.state.title + "&description=" + this.state.description
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let newPage = result;
                    if (newPage.id === -1) {
                        return;
                    }
                    let newPages = [...this.state.pages, newPage]
                    this.setState(state => {
                        return {
                            ...state,
                            pages: newPages,
                            dialogOpen: false,
                            tabActive: this.state.pages.length // as it has not updated yet, so that is former size
                        }
                    });
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

    handleChange = (event, newValue) => {

        let isTab = event.currentTarget.dataset.istab === "true";
        // plus icon popup
        if(!isTab) {
            this.setState(state => {
                return {
                    ...state,
                    dialogOpen: true,
                }
            });
        }else {
            // tab switch
            this.setState(state => {
                return {
                    ...state,
                    tabActive: newValue,
                }
            });
        }

    }

    changeField = field => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        if (field === "title") {
            this.setState(state => {
                return {
                    ...state,
                    title: value,
                    titleError: value === ""
                }
            });
        } else {
            this.setState(state => {
                return {
                    ...state,
                    description: value,
                }
            });
        }

    }

    render() {
        return this.state.isLoaded ? (
                <div>
                    <Tabs value={this.state.tabActive} onChange={this.handleChange}>
                        {this.state.pages.map((page, k) => {
                            return (
                                <Tab label={page.title} data-istab={true} key={k}/>
                            )
                        })}
                        <Tab icon={<AddIcon />} data-istab={false}/>
                    </Tabs>
                    {this.state.pages.map((page, k) => {
                        return (
                            this.state.tabActive === k && <Page key={k} id={page.id}/>
                        )
                    })}


                    <Dialog open={this.state.dialogOpen} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">add a new page</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                error={this.state.titleError}
                                margin="dense"
                                id="title"
                                label="title"
                                type="text"
                                fullWidth
                                value={this.state.title}
                                onChange={this.changeField("title")}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                label="description"
                                type="text"
                                fullWidth
                                multiline
                                rows="3"
                                value={this.state.description}
                                onChange={this.changeField("description")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.insertPage}
                                color="primary"
                                disabled={this.state.titleError}
                            >
                                Insert
                            </Button>
                            <Button onClick={this.closeDialog} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            )
            : (null)
    };
}

export default Pages;
