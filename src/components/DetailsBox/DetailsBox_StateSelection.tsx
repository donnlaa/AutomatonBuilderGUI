import { useState, useEffect } from "react";
import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";
import StateManager from "../../StateManager";
import { useActionStack } from "../../utilities/ActionStackUtilities";

interface DetailsBox_StateSelectionProps {
    nodeWrapper: NodeWrapper
    startNode: NodeWrapper
    setStartNode: React.Dispatch<React.SetStateAction<NodeWrapper>>
}

interface SetStartStateButtonProps {
    node: NodeWrapper;
}

function SetStartStateButton(props: SetStartStateButtonProps) {
    const [isStartNodeInternal, setIsStartNodeInternal] = useState(StateManager.startNode === props.node);

    const [_, currentStackLocation] = useActionStack();
    useEffect(() => {
        setIsStartNodeInternal(StateManager.startNode === props.node);
    }, [currentStackLocation]);

    let classes = 'rounded-full p-2 m-1 mx-2 block ';
    if (isStartNodeInternal) {
        return (<button
            className={classes + 'bg-slate-400 text-gray-700'}
            disabled={true}>
            Current Start State
        </button>)
    }
    else {
        return <button
            className={classes + 'bg-emerald-500 text-white'}
            onClick={_ => StateManager.setNodeIsStart(props.node)}>
            Set Start State
        </button>
    }

}

export default function DetailsBox_StateSelection(props: DetailsBox_StateSelectionProps) {
    const nw = props.nodeWrapper;
    const [nodeLabelText, setLabelText] = useState(nw.labelText);
    const [isAcceptNode, setIsAcceptNode] = useState(nw.isAcceptNode);

    let updateNodeName = (newName: string) => {
        setLabelText(newName);
        StateManager.setNodeName(nw, newName);
    };

    let updateNodeIsAccept = (isAccept: boolean) => {
        setIsAcceptNode(isAccept);
        StateManager.setNodeIsAccept(nw, isAccept);
    };

    const [_, currentStackLocation] = useActionStack();
    useEffect(() => {
        setLabelText(nw.labelText);
        setIsAcceptNode(nw.isAcceptNode);
    }, [currentStackLocation]);

    return (
        <div className="flex flex-col">
            <div className="font-medium text-2xl">State</div>
            <div className="flex flex-row">
                <div className="flex-1 mr-4">Name</div>
                <input className="flex-1 bg-transparent" type="text" placeholder="State name" value={nodeLabelText} onChange={e => updateNodeName(e.target.value)}></input>

            </div>
            <SetStartStateButton node={nw} />
            <div>
                <input type="checkbox" id="is-accept-state" name="is-accept-state" checked={isAcceptNode} onChange={e => updateNodeIsAccept(e.target.checked)}></input>
                <label htmlFor="is-accept-state">Accept State</label>
            </div>
        </div>
    );
}