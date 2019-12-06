import React, {Component} from "react";
import {Box} from "@material-ui/core";


class Panel extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let panel = this.props.panel;
        return (
            <div data-id={panel.id}
                style={{
                    position: "absolute",
                    height: panel.height,
                    width: panel.width,
                    top: panel.top,
                    left: panel.left,
                    border: panel.border,
                    backgroundColor: panel.backgroundColor
                }}

            >
                <div style={{position: "relative"}} >

                    {this.props.panel.children.map((comp,k) => (
                            <Panel key={k} panel={comp}/>
                        )
                    )}

                </div>
            </div>
        );
    }

}

export default Panel;
