import Checkbox from "@skbkontur/react-ui/Checkbox";
import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader";
import { RecoilRoot } from "recoil";

import { Editor } from "./src/Editor/Editor";
import { RecoilEditor } from "./src/Recoil/RecoilEditor";

function AdminToolsEntryPoint() {
    const [recoil, setRecoil] = React.useState(true);

    return (
        <>
            <Checkbox checked={recoil} onChange={(_, value) => setRecoil(value)}>
                Use Recoil
            </Checkbox>
            {recoil ? (
                <RecoilRoot>
                    <RecoilEditor />
                </RecoilRoot>
            ) : (
                <Editor />
            )}
        </>
    );
}

export const AdminTools = hot(module)(AdminToolsEntryPoint);
ReactDom.render(<AdminTools />, document.getElementById("content"));
