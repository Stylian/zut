import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

class Mover extends Component {

    constructor(props) {
        super(props);

        this.state = {
            top: this.props.top,
            left: this.props.left,
            move: {
                do: false,
                x: 0,
                y: 0
            },
        };
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
        if (this.state.move.do) {
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

            this.props.relocate(this.props.id, this.state.left, this.state.top);
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
        return (
            <Button  style={{
                cursor: "move"
            }}
                     onMouseDown={this.startMoving}
                     onMouseMove={this.doMoving}
                     onMouseUp={this.stopMoving}
                     onMouseLeave={this.stopMoving}
            >
                <DragIndicatorIcon/>
            </Button>
        )
    }
}

export default Mover;