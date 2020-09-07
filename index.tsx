import Select from "@skbkontur/react-ui/Select";
import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader";

import { Editor } from "./src/Editor/Editor";
import { EffectorEditor } from "./src/Effector/EffectorEditor";
import { RecoilEditor } from "./src/Recoil/RecoilEditor";
import { ReduxEditor } from "./src/Redux/ReduxEditor";

const items = [
    ["React", "React"],
    ["Recoil", "Recoil"],
    ["Redux", "Redux"],
    ["Effector", "Effector"],
];

const renderItems = {
    React: <Editor />,
    Recoil: <RecoilEditor />,
    Redux: <ReduxEditor />,
    Effector: <EffectorEditor />,
};

function AdminToolsEntryPoint() {
    const [state, setState] = React.useState("React");

    return (
        <>
            <Select<string> items={items} value={state} onChange={(_, value) => setState(value)}>
                Use Recoil
            </Select>
            {renderItems[state]}
        </>
    );
}

export const AdminTools = hot(module)(AdminToolsEntryPoint);
ReactDom.render(<AdminTools />, document.getElementById("content"));
