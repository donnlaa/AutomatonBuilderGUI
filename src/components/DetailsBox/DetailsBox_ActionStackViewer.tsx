import { useState, useEffect } from "react";
import StateManager from "../../StateManager";
import UndoRedoManager, { Action } from "../../UndoRedoManager";

interface ActionRowItemProps {
    displayString: string;
    greyedOut: boolean;
}

function useActionStack(): [Array<Action>, number] {
    const [currentStack, setCurrentStack] = useState([]);
    const [currentStackLocation, setCurrentStackLocation] = useState(-1);

    useEffect(() => {
        function handleStackChanged() {
            let newStack = UndoRedoManager.getStack().map(i => i).reverse();
            setCurrentStack(newStack);
            setCurrentStackLocation(UndoRedoManager.getStackLocation());
        }
        UndoRedoManager.startListeningOnStackChanged(handleStackChanged);
        return () => {
            UndoRedoManager.stopListeningOnStackChanged(handleStackChanged);
        }
    }, []);
    return [currentStack, currentStackLocation];
}

function ActionRowItem(props: ActionRowItemProps) {
    return (<div className={`border-t-2 border-zinc-400 ${props.greyedOut ? 'text-slate-500' : ''}`}>
        {props.displayString}
    </div>)
}

export default function DetailsBox_ActionStackViewer() {
    const [currentStack, currentStackLocation] = useActionStack();
    let stackItems = currentStack.map((action, index) => {
        return <ActionRowItem
            displayString={action.displayString}
            greyedOut={currentStack.length - index - 1 > currentStackLocation}
        />;
    });

    return (
        <div className="flex flex-col">
            <div className="font-medium text-2xl">Action Stack</div>
            <div>
                {stackItems}
            </div>
        </div>
    );
}