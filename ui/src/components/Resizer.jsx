import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

class Resizer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: this.props.height,
            width: this.props.width,
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
        if (resizedirection === "bottom") {
            doY = true;
        } else if (resizedirection === "right") {
            doX = true;
        } else if (resizedirection === "bottom-right") {
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
        if (this.state.resize.doX) {
            x = e.clientX;
        }
        if (this.state.resize.doY) {
            y = e.clientY;
        }
        if (this.state.resize.doX ||
            this.state.resize.doY) {

            this.setState(state => {
                return {
                    ...state,
                    height: this.state.resize.doY ?
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

            this.props.resize(this.state.width, this.state.height);
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

    render() {
        let editBorder = "1px rgba(204,31,48,1) solid";

        return (
            <div className="crop"
                 style={{
                     width: "100%",
                     height: "100%",
                 }}
            >

                <div className="crop-line crop-right-line-inner"
                     style={{
                         cursor: "e-resize",
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
                         borderLeft: editBorder,
                     }}
                ></div>
                <div className="crop-line crop-bottom-line-inner"
                     style={{
                         cursor:
                             "s-resize",
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
                         borderTop: editBorder
                     }}
                ></div>
                <div className="crop-corner crop-bottom-right-corner"
                ></div>
                <div className="crop-bottom-right-corner-outer"
                     data-resizedirection={"bottom-right"}
                     onMouseDown={this.startResizing}
                     onMouseMove={this.doResizing}
                     onMouseUp={this.stopResizing}
                     onMouseLeave={this.stopResizing}
                ></div>
            </div>
        )
    }
}

export default Resizer;