import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';
import {Box, ListItemIcon, ListItemText} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterNoneIcon from "@material-ui/core/SvgIcon/SvgIcon";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import MessageIcon from '@material-ui/icons/Message';
import ViewListIcon from '@material-ui/icons/ViewList';
import Panel from "./Panel";

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

            //default//todo for more nesting
            let container = this.pageContent.current;
            let rect = container.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            this.setState(state => {
                return {
                    ...state,
                    rightClickMenu: {
                        ...state.rightClickMenu,
                        open: true,
                        x: x,
                        y: y,
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
                    y: 0
                }
            }
        });
    }

    insertComponentHandler = (e) => {

        this.rightClickMenuClose();
        let compType = e.currentTarget.dataset.comptype;

        let component = {
            "top": this.state.rightClickMenu.y,
            "left": this.state.rightClickMenu.x,
            "height": 200,
            "width": 300,
        };

        // insert panel
        if (compType === "1") {
            component = {
                ...component,
                "type": "panel",
                "border": "1px solid black"
            }
        }

        this.insertComponent(component);
    }

    insertComponent = (component) => {

        fetch("/pages/" + this.state.page.id + "/components", {
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
                        state.page.components[state.page.components.length] = newComponent;
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
                                <Panel key={k} panel={comp}/>
                            )
                        )}
                    </Box>

                    {/* edit page menu */}
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
                </Box>

            </Box>
        ) : (null)
    };
}

export default Page;
