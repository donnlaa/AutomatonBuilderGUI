import { useState, useEffect } from "react";
import StateManager from "../StateManager";
import UndoRedoManager, { Action } from "../UndoRedoManager";

export function useActionStack(): [Array<Action>, number] {
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