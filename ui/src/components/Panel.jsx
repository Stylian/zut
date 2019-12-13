import React, {Component} from "react";
import {Box} from "@material-ui/core";


class Panel extends Component {

    constructor(props) {
        super(props);

        let panel = this.props.panel;
        this.state = {
            height: panel.height,
            width: panel.width,
            top: panel.top,
            left: panel.left,
            backgroundColor: panel.backgroundColor,
            editMode: true,
            move: {
                do: false,
                x: 0,
                y: 0
            },
            resize: {
                doX: false,
                doY: false,
                x: 0,
                y: 0
            }
        };
    }

    startResizing = (e) => {
        let resizedirection = e.currentTarget.dataset.resizedirection;
        let doX = false;
        let doY = false;
        if(resizedirection === "bottom") {
            doY = true;
        }else if( resizedirection === "right") {
            doX = true;
        }else if( resizedirection === "bottom-right") {
            doX = true;
            doY = true;
        }
        let x = e.clientX;
        let y = e.clientY;
        this.setState(state => {
            return {
                ...state,
                resize: {
                    doX: doX,
                    doY: doY,
                    x: x,
                    y: y
                }
            }
        });
        e.stopPropagation();
    }

    doResizing = (e) => {
        let x = 0;
        let y = 0;
        if(this.state.resize.doX) {
            x = e.clientX;
        }
        if(this.state.resize.doY) {
            y = e.clientY;
        }
        if(this.state.resize.doX ||
            this.state.resize.doY) {

            this.setState(state => {
                return {
                    ...state,
                    height: this.state.resize.doY?
                        state.height + y - state.resize.y :
                        state.height,
                    width: this.state.resize.doX ?
                        state.width + x - state.resize.x :
                        state.width,
                    resize: {
                        ...state.resize,
                        x: x,
                        y: y
                    }
                }
            });
        }
        e.stopPropagation();
    }

    stopResizing = (e) => {
        this.setState(state => {
            return {
                ...state,
                resize: {
                    doX: false,
                    doY: false
                }
            }
        });
        e.stopPropagation();
    }

    startMoving = (e) => {
        let x = e.clientX;
        let y = e.clientY;
        this.setState(state => {
            return {
                ...state,
                move: {
                    do: true,
                    x: x,
                    y: y
                }
            }
        });
    }

    doMoving = (e) => {
        if(this.state.move.do) {
            let x = e.clientX;
            let y = e.clientY;
            this.setState(state => {
                return {
                    ...state,
                    top: state.top + y - state.move.y,
                    left: state.left + x - state.move.x,
                    move: {
                        do: true,
                        x: x,
                        y: y
                    }
                }
            });
        }
    }
    stopMoving = (e) => {
        this.setState(state => {
            return {
                ...state,
                move: {
                    do: false
                }
            }
        });
    }


    render() {
        let border = this.state.editMode ? "1px rgba(204,31,48,1) solid" : this.props.panel.border;
        return (
            <div data-id={this.props.panel.id}
                 style={{
                     position: "absolute",
                     height: this.state.height,
                     width: this.state.width,
                     top: this.state.top,
                     left: this.state.left,
                     backgroundColor: this.state.backgroundColor
                 }}

            >

                {/* rezizers, borders*/}
                <div className="container" style={{width: "100%", height: "100%"}}>

                    <div className="crop"
                         style={{
                             width: "100%",
                             height: "100%",
                             cursor: this.state.editMode?
                                  "move" : "default"
                         }}
                         onMouseDown={this.startMoving}
                         onMouseMove={this.doMoving}
                         onMouseUp={this.stopMoving}
                         onMouseLeave={this.stopMoving}
                    >

                        <div className="crop-line crop-right-line-inner"
                             style={{
                                 cursor: this.state.editMode?
                                     "e-resize" : "default",
                                 zIndex: 10
                             }}
                             data-resizedirection={"right"}
                             onMouseDown={this.startResizing}
                             onMouseMove={this.doResizing}
                             onMouseUp={this.stopResizing}
                             onMouseLeave={this.stopResizing}
                        ></div>
                        <div className="crop-line crop-right-line"
                             style={{
                                 borderLeft: border,
                             }}
                        ></div>
                        <div className="crop-line crop-bottom-line-inner"
                             style={{
                                 cursor: this.state.editMode?
                                     "s-resize" : "default",
                                 zIndex: 10
                             }}
                             data-resizedirection={"bottom"}
                             onMouseDown={this.startResizing}
                             onMouseMove={this.doResizing}
                             onMouseUp={this.stopResizing}
                             onMouseLeave={this.stopResizing}
                        ></div>
                        <div className="crop-line crop-bottom-line"
                             style={{
                                 borderTop: border
                             }}
                        ></div>

                        {this.state.editMode?
                            (<div className="crop-corner crop-bottom-right-corner"
                        ></div>) : (null)}
                        {this.state.editMode?
                            (<div className="crop-bottom-right-corner-outer"
                                    data-resizedirection={"bottom-right"}
                                    onMouseDown={this.startResizing}
                                    onMouseMove={this.doResizing}
                                    onMouseUp={this.stopResizing}
                                    onMouseLeave={this.stopResizing}
                        ></div>) : (null)}
                    </div>

                    {this.props.panel.children.map((comp, k) => (
                            <Panel key={k} panel={comp}/>
                        )
                    )}

                </div>
            </div>


        );
    }

}

export default Panel;
