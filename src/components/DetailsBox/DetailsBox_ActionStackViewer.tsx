import { useState, useEffect } from "react";
import StateManager from "../../StateManager";
import UndoRedoManager, { Action } from "../../UndoRedoManager";
import { useActionStack } from "../../utilities/ActionStackUtilities";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { BsNodePlus } from "react-icons/bs";

interface ActionRowItemProps {
    displayString: string;
    id: string;
    greyedOut: boolean;
}

function ActionRowItem(props: ActionRowItemProps) {
    const [_, currentStackLocation] = useActionStack();
    return (<div className={`border-t-2 border-zinc-400 ${props.greyedOut ? 'text-slate-500' : ''}`}>
                {props.displayString}
            </div>);
}

export default function DetailsBox_ActionStackViewer() {
    const [currentStack, currentStackLocation] = useActionStack();
    return (
        <div className="flex flex-col">
            <div className="font-medium text-2xl">Action Stack</div>
            <motion.ul layout layoutId="list">
                <AnimatePresence>
                    {
                        currentStack.map((item, index) => {
                            return (
                                <motion.li
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    key={item.id}
                                >
                                    <ActionRowItem displayString={item.displayString} id={item.id} greyedOut={currentStack.length - index - 1 > currentStackLocation} />
                                </motion.li>
                            )
                        })
                    }
                </AnimatePresence>
            </motion.ul>
        </div>
    );
}