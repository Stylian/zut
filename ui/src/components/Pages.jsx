import React, {Component} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    Tabs,
    TextField
} from "@material-ui/core";
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

        // TODO
        console.log("title : " + this.state.title);
        console.log("description : " + this.state.description);

        this.setState(state => {
            return {
                ...state,
                dialogOpen: false,
            }
        });
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



        // fetch("/rest/persist/tabs/season/" + this.props.match.params.seasonNum, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: newValue
        // })
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState(state => {
        //                 return {
        //                     ...state,
        //                     tabActive: newValue,
        //                 }
        //             });
                // },
                // (error) => {
                //     this.setState(state => {
                //         return {
                //             ...state,
                //             isLoaded: true,
                //             error
                //         }
                //     });
                // }
            // )
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
                            this.state.tabActive === k && <Page key={k}/>
                        )
                    })}


                    <Dialog open={this.state.dialogOpen} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">add a new page</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="title"
                                type="text"
                                fullWidth
                                value={this.state.title}
                                onChange={this.changeField("title")}
                            />
                            <TextField
                                autoFocus
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
                            <Button onClick={this.insertPage} color="primary">
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
