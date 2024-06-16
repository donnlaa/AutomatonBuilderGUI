import { useState, useEffect } from "react";
import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";
import StateManager from "../../StateManager";
import TransitionWrapper from "../../TransitionWrapper";
import TokenWrapper from "../../TokenWrapper";

interface DetailsBox_TransitionSelectionProps {
    transitionWrapper: TransitionWrapper;
    setLastUpdated: React.Dispatch<React.SetStateAction<number>>;
}

interface DetailsBox_TransitionTokenCheckBoxProps {
    transitionWrapper: TransitionWrapper;
    tokenWrapper: TokenWrapper;
    setLastUpdated: React.Dispatch<React.SetStateAction<number>>;
}

function DetailsBox_TransitionTokenCheckBox(props: DetailsBox_TransitionTokenCheckBoxProps) {
    const token = props.tokenWrapper;
    const transition = props.transitionWrapper;

    const [tokenIsIncluded, setTokenIsIncluded] = useState(transition.hasToken(token));
    useEffect(() => {
        if (tokenIsIncluded) {
            transition.addToken(token);
        }
        else {
            transition.removeToken(token);
        }
        props.setLastUpdated(new Date().getTime());
    }, [tokenIsIncluded]);

    return (
        <div key={token.id}>
            <input type="checkbox" id="is-epsilon-transition" name={`transition-accepts-${token.id}`} checked={tokenIsIncluded} onChange={e => setTokenIsIncluded(e.target.checked)}></input>
            <label htmlFor={`transition-accepts-${token.id}`}>{token.symbol}</label>
        </div>
    )
}

export default function DetailsBox_TransitionSelection(props: DetailsBox_TransitionSelectionProps) {
    const tw = props.transitionWrapper;

    const srcNode = tw.sourceNode;
    const dstNode = tw.destNode;

    const [isEpsilonTransition, setEpsilonTransition] = useState(tw.isEpsilonTransition);

    useEffect(() => {
        tw.isEpsilonTransition = isEpsilonTransition;
        props.setLastUpdated(new Date().getTime());
    }, [isEpsilonTransition]);

    return (
        <div className="flex flex-col">
            <div className="font-medium text-2xl">Transition</div>
            <div>{srcNode.labelText} to {dstNode.labelText}</div>
            <div>
                Transition on:
            </div>
            <div>
                <input type="checkbox" id="is-epsilon-transition" name="is-epsilon-transition" checked={isEpsilonTransition} onChange={e => setEpsilonTransition(e.target.checked)}></input>
                <label htmlFor="is-epsilon-transition">ε</label>
            </div>
            {StateManager.alphabet.map((token) => <DetailsBox_TransitionTokenCheckBox transitionWrapper={tw} tokenWrapper={token} setLastUpdated={props.setLastUpdated}/>)}
        </div>
    );
}