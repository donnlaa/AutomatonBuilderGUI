import { useState, useEffect } from "react";
import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";
import StateManager from "../../StateManager";

interface DetailsBox_StateSelectionProps {
    nodeWrapper: NodeWrapper
    startNode: NodeWrapper
    setStartNode: React.Dispatch<React.SetStateAction<NodeWrapper>>
}

interface SetStartStateButtonProps {
    nodeWrapper: NodeWrapper
    startNode: NodeWrapper
    setStartNode: React.Dispatch<React.SetStateAction<NodeWrapper>>
}

function SetStartStateButton(props: SetStartStateButtonProps) {
    let classes = 'rounded-full p-2 m-1 mx-2 block ';
    if (StateManager.startNode === props.nodeWrapper) {
        return (<button
            className={classes + 'bg-slate-400 text-gray-700'}
            disabled={true}>
            Current Start State
        </button>)
    }
    else {
        return <button
            className={classes + 'bg-emerald-500 text-white'}
            onClick={e => props.setStartNode(props.nodeWrapper)}>
            Set Start State
        </button>
    }

}


export default function DetailsBox_StateSelection(props: DetailsBox_StateSelectionProps) {
    const nw = props.nodeWrapper;
    const [nodeLabelText, setLabelText] = useState(nw.labelText);
    const [isAcceptNode, setIsAcceptNode] = useState(nw.isAcceptNode);

    useEffect(() => {
        StateManager.setNodeName(nw, nodeLabelText);
    }, [nodeLabelText]);

    useEffect(() => {
        nw.isAcceptNode = isAcceptNode;
    }, [isAcceptNode]);

    return (
        <div className="flex flex-col">
            <div className="font-medium text-2xl">State</div>
            <div className="flex flex-row">
                <div className="flex-1 mr-4">Name</div>
                <input className="flex-1 bg-transparent" type="text" placeholder="State name" value={nodeLabelText} onChange={e => setLabelText(e.target.value)}></input>

            </div>
            <SetStartStateButton nodeWrapper={nw} startNode={props.startNode} setStartNode={props.setStartNode} />
            <div>
                <input type="checkbox" id="is-accept-state" name="is-accept-state" checked={isAcceptNode} onChange={e => setIsAcceptNode(e.target.checked)}></input>
                <label htmlFor="is-accept-state">Accept State</label>
            </div>
        </div>
    );
}