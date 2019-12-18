import React, {Component} from "react";
import Mover from "./Mover";
import Resizer from "./Resizer";


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
        };
    }

    relocate = (x, y) => {
        this.setState(state => {
            return {
                ...state,
                top: y,
                left: x
            }
        })
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
        let editBorder = this.state.editMode ? "1px rgba(204,31,48,1) solid" : this.props.panel.border;
        let border = this.props.panel.border;
        return (
            <div className="component_container" data-id={this.props.panel.id}
                 style={{
                     position: "absolute",
                     height: this.state.height,
                     width: this.state.width,
                     top: this.state.top,
                     left: this.state.left,
                     backgroundColor: this.state.backgroundColor,
                     border: border
                 }}

            >

                <div>
                    <Mover
                        top={this.state.top}
                        left={this.state.left}
                        relocate={this.relocate}
                    />

                </div>
                <div className="container" style={{width: "100%", height: "100%"}}>

                    <div className="panel_content"  style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}>

                    </div>

                    <Resizer
                        top={this.state.top}
                        left={this.state.left}
                        width={this.state.width}
                        height={this.state.height}
                        resize={this.resize}
                    />
                </div>
            </div>
        );
    }

}

export default Panel;
