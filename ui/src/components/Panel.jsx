import React, {Component} from "react";


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

                </div>
            </div>
        );
    }

}

export default Panel;
