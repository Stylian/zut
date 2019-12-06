import React, {Component} from "react";
import {Box} from "@material-ui/core";


class Panel extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let panel = this.props.panel;
        let editMode = true;
        let border = editMode ? "1px rgba(204,31,48,1) solid" : panel.border;
        return (
            <div data-id={panel.id}
                 style={{
                     position: "absolute",
                     height: panel.height,
                     width: panel.width,
                     top: panel.top,
                     left: panel.left,
                     backgroundColor: panel.backgroundColor
                 }}

            >
                <div className="container" style={{width: "100%", height: "100%"}}>
                    <div className="crop" style={{width: "100%", height: "100%",
                        cursor: editMode? "move" : "default"}}>
                        <div className="crop-line crop-top-line" style={{borderTop: border,
                            cursor: editMode? "n-resize" : "default"}}></div>
                        <div className="crop-line crop-right-line" style={{borderRight: border,
                            cursor: editMode? "e-resize" : "default"}}></div>
                        <div className="crop-line crop-bottom-line" style={{borderBottom: border,
                            cursor: editMode? "s-resize" : "default"}}></div>
                        <div className="crop-line crop-left-line" style={{borderLeft: border,
                            cursor: editMode? "w-resize" : "default"}}></div>

                        {editMode? (<div className="crop-corner crop-top-left-corner"></div>) : (null)}
                        {editMode? (<div className="crop-corner crop-top-right-corner"></div>) : (null)}
                        {editMode? (<div className="crop-corner crop-bottom-right-corner"></div>) : (null)}
                        {editMode? (<div className="crop-corner crop-bottom-left-corner"></div>) : (null)}
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
