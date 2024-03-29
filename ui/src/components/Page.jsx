import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemIcon,
    ListItemText, Paper,
    TextField
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterNoneIcon from "@material-ui/core/SvgIcon/SvgIcon";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import MessageIcon from '@material-ui/icons/Message';
import ViewListIcon from '@material-ui/icons/ViewList';
import Panel from "./Panel";
import Mover from "./Mover";
import Resizer from "./Resizer";

class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            page: null,
            rightClickMenu: {
                container: null,
                x: 0,
                y: 0,
                open: false,
            },
            editComponentDialog: {
                dialogOpen: false,
                height: 0
            }
        };

        this.pageContent = React.createRef();
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

    // right click menu handlers
    rightClickMenuOpen = (event) => {
        if (event.buttons === 2) {
            document.oncontextmenu = function () {
                return false;
            }

            let container = event.target ;// need to add this here -> .closest("component_container");
            let x = event.clientX;
            let y = event.clientY;

            this.setState(state => {
                return {
                    ...state,
                    rightClickMenu: {
                        ...state.rightClickMenu,
                        open: true,
                        x: x,
                        y: y,
                        container: container
                    }
                }
            });
        }
    }

    rightClickMenuClose = () => {
        this.setState(state => {
            return {
                ...state,
                rightClickMenu: {
                    ...state.rightClickMenu,
                    open: false,
                    x: 0,
                    y: 0,
                    container: null
                }
            }
        });
    }

    insertComponentHandler = (e) => {

        let compType = e.currentTarget.dataset.comptype;

        let rect = this.state.rightClickMenu.container.getBoundingClientRect();
        let x = this.state.rightClickMenu.x - rect.left;
        let y = this.state.rightClickMenu.y - rect.top;
        let parentId = this.state.rightClickMenu.container.dataset.id;

        if( parentId == undefined) {
            parentId = -1;
        }else {
            parentId = parseInt(parentId);
        }

        let component = {
            top: y,
            left: x,
            height: 100,
            width: 200,
        };

        // insert panel
        if (compType === "1") {
            component = {
                ...component,
                type: "panel",
                border: "1px solid black"
            }

        }

        this.rightClickMenuClose();
        this.insertComponent(component, parentId);
    }

    insertComponent = (component, parentId) => {

        let url = "";
        if(parentId < 1) {
            // add to page
            url= "/pages/" + this.state.page.id + "/components";
        }else {
            //add to component
            url= "components/" + parentId + "/children";
        }

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(component)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let newComponent = result;
                    if (newComponent.id === -1) {
                        return;
                    }
                    this.setState(state => {
                        if(parentId < 1) {
                            state.page.components[state.page.components.length] = newComponent;
                        }else {
                            let parentIndex = state.page.components.findIndex( comp => comp.id === parentId);
                            state.page.components[parentIndex].children[state.page.components[parentIndex].children.length] = newComponent;
                        }
                        return state;
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

    // create page dialog handlers
    changeField = (field, dialogType) => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        this.setState(state => {
            return {
                ...state,
                [dialogType]: {
                    ...state[dialogType],
                    [field]: value,
                }
            }
        });

    }

    editOpenDialog = () => {
        this.setState(state => {
            return {
                ...state,
                editComponentDialog: {
                    dialogOpen: true
                }
            }
        });
    }

    closeEditCompDialog = () => {
        this.setState(state => {
            return {
                ...state,
                editComponentDialog: {
                    dialogOpen: false
                }
            }
        });
    }

    relocate = (id, x, y) => {

        let compIndex = this.state.page.components.findIndex( comp => comp.id === id);

        this.setState(state => {
            state.page.components[compIndex].top = y;
            state.page.components[compIndex].left = x;
            return state;
        });
    }

    resize = (x, y) => {
        this.setState(state => {
            return {
                ...state,
                height: y,
                width: x
            }
        })
    }

    render() {
        return this.state.isLoaded ? (
            <Box>

                <Box className={this.props.classes.page_toolbar}>
                    <Button className={this.props.classes.page_toolbar}>
                        <EditIcon/>
                        Edit
                    </Button>
                    <Button className={this.props.classes.page_toolbar}>
                        <PublishIcon/>
                        Publish
                    </Button>
                    <Button className={this.props.classes.page_toolbar}>
                        <LockIcon/>
                        Lock view
                    </Button>
                    <Button onClick={this.savePage} className={this.props.classes.page_toolbar}>
                        <SaveIcon/>
                        Save
                    </Button>
                </Box>

                <Box>
                    <Box className={this.props.classes.page_content}
                         onMouseDown={this.rightClickMenuOpen}
                         ref={this.pageContent}
                    >
                        {this.state.page.components.map((comp,k) => (
                            <div className="component_container" data-id={comp.id}
                                 style={{
                                     position: "absolute",
                                     height: comp.height,
                                     width: comp.width,
                                     top: comp.top,
                                     left: comp.left,
                                     backgroundColor: comp.backgroundColor,
                                     border: comp.border
                                 }}

                            >

                                <div className={this.props.classes.component_toolbar}>
                                    <Mover
                                        id={comp.id}
                                        top={comp.top}
                                        left={comp.left}
                                        relocate={this.relocate}
                                    />
                                    <Button title={"edit component"} onClick={this.props.editOpen}>
                                        <EditIcon/>
                                    </Button>

                                </div>
                                <div className="container" style={{width: "100%", height: "100%"}}>

                                    <div className="panel_content"  style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                    }}>

                                    </div>

                                    <Resizer
                                        width={comp.width}
                                        height={comp.height}
                                        resize={this.resize}
                                    />
                                </div>
                            </div>
                            )
                        )}
                    </Box>

                    {/* right click on page menu */}
                    <Menu
                        id="simple-menu"
                        anchorReference="anchorPosition"
                        anchorPosition={{top: this.state.rightClickMenu.y, left: this.state.rightClickMenu.x}}
                        keepMounted
                        open={this.state.rightClickMenu.open}
                        onClose={this.rightClickMenuClose}
                    >
                        <MenuItem data-comptype={1} onClick={this.insertComponentHandler}>
                            <ListItemIcon>
                                <FilterNoneIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Insert Panel"/>
                        </MenuItem>
                        <MenuItem data-comptype={2} onClick={this.insertComponentHandler}>
                            <ListItemIcon>
                                <MessageIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Add Label"/>
                        </MenuItem>
                        <MenuItem data-comptype={3} onClick={this.insertComponentHandler}>
                            <ListItemIcon>
                                <ViewListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Insert Table"/>
                        </MenuItem>
                        <MenuItem data-comptype={4} onClick={this.insertComponentHandler}>
                            <ListItemIcon>
                                <InsertChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Insert Graph"/>
                        </MenuItem>
                        <MenuItem data-comptype={5} onClick={this.insertComponentHandler}>
                            <ListItemIcon>
                                <AttachFileIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Attach File"/>
                        </MenuItem>
                    </Menu>

                    {/*edit component dialog*/}
                    <Dialog open={this.state.editComponentDialog.dialogOpen} onClose={this.closeEditCompDialog}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">edit component</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                error={this.state.editComponentDialog.height < 24}
                                margin="dense"
                                id="height"
                                label="height"
                                type="text"
                                fullWidth
                                value={this.state.editComponentDialog.height}
                                onChange={this.changeField("height", "editComponentDialog")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.updateComponent}
                                color="primary"
                            >
                                Update
                            </Button>
                            <Button onClick={this.closeEditCompDialog} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>

            </Box>
        ) : (null)
    };
}

export default Page;
