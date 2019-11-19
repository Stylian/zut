import React, {Component} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    TextField
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Page from "./Page";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Pages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            pages: [],
            tabActive: 0,
            addMenu: {
                dialogOpen: false,
                title: "",
                description: "",
            },
            editMenu: {
                dialogOpen: false,
                title: "",
                description: "",
            },
            pageMenu: {
                x: 0,
                y: 0,
                open: false,
                page: {
                    id: -1,
                    title: "",
                    description: ""
                },

            },
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

    // create page dialog handlers
    changeField = (field, dialogType) => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        if (field === "title") {
            this.setState(state => {
                return {
                    ...state,
                    [dialogType]: {
                        ...state[dialogType],
                        title: value,
                    }
                }
            });
        } else {
            this.setState(state => {
                return {
                    ...state,
                    [dialogType]: {
                        ...state[dialogType],
                        description: value,
                    }
                }
            });
        }

    }

    closeAddMenu = (event, newValue) => {
        this.setState(state => {
            return {
                ...state,
                addMenu: {
                    ...state.addMenu,
                    dialogOpen: false,
                }
            }
        });
    }

    changeTab = (event, newValue) => {

        let isTab = event.currentTarget.dataset.istab === "true";
        // plus icon popup
        if (!isTab) {
            this.setState(state => {
                return {
                    ...state,
                    addMenu: {
                        ...state.addMenu,
                        dialogOpen: true
                    },
                }
            });
        } else {
            // tab switch
            this.setState(state => {
                return {
                    ...state,
                    tabActive: newValue,
                }
            });
        }

    }

    // page menu handlers
    pageMenuClose = () => {
        this.setState(state => {
            return {
                ...state,
                pageMenu: {
                    ...state.pageMenu,
                    open: false,
                    x: 0,
                    y: 0
                }
            }
        });
    }

    pageMenuOpen = (event) => {
        this.pageMenuClose();
        if (event.buttons === 2) {
            document.oncontextmenu = function () {
                return false;
            }

            let page = {
                id: event.currentTarget.dataset.pageid,
                    title: event.currentTarget.dataset.pagetitle,
                    description: event.currentTarget.dataset.pagedescription,
            };
            let x = event.clientX;
            let y = event.clientY;

            this.setState(state => {
                return {
                    ...state,
                    pageMenu: {
                        ...state.pageMenu,
                        open: true,
                        x: x,
                        y: y,
                        page: page,
                    }
                }
            });
        }
    }

    openEditPopup = (event) => {
        this.pageMenuClose();
        this.setState(state => {
            return {
                ...state,
                editMenu: {
                    ...state.editMenu,
                    dialogOpen: true,
                    title: state.pageMenu.page.title,
                    description: state.pageMenu.page.description,
                }
            }
        });
    }

    closeEditMenu = (event, newValue) => {
        this.setState(state => {
            return {
                ...state,
                editMenu: {
                    ...state.editMenu,
                    dialogOpen: false,
                }
            }
        });
    }

    insertPage = (event) => {

        fetch("/pages/", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "title=" + this.state.addMenu.title + "&description=" + this.state.addMenu.description
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let newPage = result;
                    if (newPage.id === -1) {
                        return;
                    }
                    let newPages = [...this.state.pages, newPage];
                    this.setState(state => {
                        return {
                            ...state,
                            pages: newPages,
                            addMenu: {
                                dialogOpen: false
                            },
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

    updatePage = (event) => {

        fetch("/pages/" + this.state.pageMenu.page.id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "title=" + this.state.editMenu.title + "&description=" + this.state.editMenu.description
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        let pagesUpdated = [...this.state.pages];
                        let index = pagesUpdated.findIndex( a => a.id === result.id);
                        pagesUpdated[index] = result;

                        return {
                            ...state,
                            pages: pagesUpdated,
                            editMenu: {
                                ...state.editMenu,
                                dialogOpen: false
                            },
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

    deletePage = (event) => {
        this.pageMenuClose();
        fetch("/pages/" + this.state.pageMenu.page.id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(
                (result) => {

                    let newPages = [...this.state.pages];
                    newPages = newPages.filter( a => a.id !== result);

                    this.setState(state => {
                        return {
                            ...state,
                            pages: newPages,
                            addMenu: {
                                ...state.addMenu,
                                dialogOpen: false
                            },
                            tabActive: this.state.pages.length - 2 // as it has not updated yet, so that is former size
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

    render() {
        return this.state.isLoaded ? (
                <div>
                    <Tabs value={this.state.tabActive} onChange={this.changeTab}>
                        {this.state.pages.map((page, k) => {
                            return (
                                <Tab label={page.title}
                                     title={page.description}
                                     data-istab={true} key={k}
                                     onMouseDown={this.pageMenuOpen}
                                     data-pageid={page.id}
                                     data-pagetitle={page.title}
                                     data-pagedescription={page.description}
                                />
                            )
                        })}
                        <Tab icon={<AddIcon/>} data-istab={false}/>
                    </Tabs>
                    {this.state.pages.map((page, k) => {
                        return (
                            this.state.tabActive === k && <Page key={k} id={page.id}/>
                        )
                    })}

                    {/* edit page menu */}
                    <Menu
                        id="simple-menu"
                        anchorReference="anchorPosition"
                        anchorPosition={{top: this.state.pageMenu.y, left: this.state.pageMenu.x}}
                        keepMounted
                        open={this.state.pageMenu.open}
                        onClose={this.pageMenuClose}
                    >
                        <MenuItem onClick={this.openEditPopup}>
                            <ListItemIcon>
                                <EditIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Edit"/>
                        </MenuItem>
                        <MenuItem onClick={this.deletePage}>
                            <ListItemIcon>
                                <DeleteIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Delete"/>
                        </MenuItem>
                    </Menu>

                    {/*create page dialog*/}
                    <Dialog open={this.state.addMenu.dialogOpen} onClose={this.closeAddMenu}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">add a new page</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                error={this.state.addMenu.title === ""}
                                margin="dense"
                                id="title"
                                label="title"
                                type="text"
                                fullWidth
                                value={this.state.addMenu.title}
                                onChange={this.changeField("title", "addMenu")}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                label="description"
                                type="text"
                                fullWidth
                                multiline
                                rows="3"
                                value={this.state.addMenu.description}
                                onChange={this.changeField("description", "addMenu")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.insertPage}
                                color="primary"
                                disabled={this.state.addMenu.title === ""}
                            >
                                Insert
                            </Button>
                            <Button onClick={this.closeAddMenu} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/*edit page dialog*/}
                    <Dialog open={this.state.editMenu.dialogOpen} onClose={this.closeEditMenu}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">edit page</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                error={this.state.editMenu.title === ""}
                                margin="dense"
                                id="title"
                                label="title"
                                type="text"
                                fullWidth
                                value={this.state.editMenu.title}
                                onChange={this.changeField("title", "editMenu")}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                label="description"
                                type="text"
                                fullWidth
                                multiline
                                rows="3"
                                value={this.state.editMenu.description}
                                onChange={this.changeField("description", "editMenu")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.updatePage}
                                color="primary"
                                disabled={this.state.editMenu.title === ""}
                            >
                                Insert
                            </Button>
                            <Button onClick={this.closeEditMenu} color="primary">
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
