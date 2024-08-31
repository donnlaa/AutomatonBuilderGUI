import { useState, useEffect } from "react";
import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";
import StateManager from "../../StateManager";
import TransitionWrapper from "../../TransitionWrapper";
import TokenWrapper from "../../TokenWrapper";
import { useActionStack } from "../../utilities/ActionStackUtilities";
import { ListItem } from "../ListItem";

interface DetailsBox_TransitionSelectionProps {
    transition: TransitionWrapper;
}

interface DetailsBox_TransitionTokenCheckBoxProps {
    transition: TransitionWrapper;
    token: TokenWrapper;
}

function DetailsBox_TransitionTokenCheckBox(props: DetailsBox_TransitionTokenCheckBoxProps) {
    const token = props.token;
    const transition = props.transition;

    const [tokenIsIncluded, setTokenIsIncluded] = useState(transition.hasToken(token));

    let updateTokenIsIncluded = (isIncluded: boolean) => {
        setTokenIsIncluded(isIncluded);

        if (isIncluded) {
            StateManager.setTransitionAcceptsToken(transition, token);
        } else {
            StateManager.setTransitionDoesntAcceptToken(transition, token);
        }
    };

    const [_, currentStackLocation] = useActionStack();
    useEffect(() => {
        setTokenIsIncluded(transition.hasToken(token));
    }, [currentStackLocation]);

    let transitionUseTokenInput = (
        <input type="checkbox" id="is-epsilon-transition" name="is-epsilon-transition" checked={tokenIsIncluded} onChange={e => updateTokenIsIncluded(e.target.checked)}></input>
    );

    return (
        <ListItem key={token.id} title={token.symbol} rightContent={transitionUseTokenInput} />
    );
}

export default function DetailsBox_TransitionSelection(props: DetailsBox_TransitionSelectionProps) {
    const tw = props.transition;

    const srcNode = tw.sourceNode;
    const dstNode = tw.destNode;

    const [isEpsilonTransition, setEpsilonTransition] = useState(tw.isEpsilonTransition);

    let updateIsEpsilonTransition = (isEpsilon: boolean) => {
        setEpsilonTransition(isEpsilon);

        if (isEpsilon) {
            StateManager.setTransitionAcceptsEpsilon(tw);
        } else {
            StateManager.setTransitionDoesntAcceptEpsilon(tw);
        }
    };

    const [_, currentStackLocation] = useActionStack();
    useEffect(() => {
        setEpsilonTransition(tw.isEpsilonTransition);
    }, [currentStackLocation]);

    let transitionUseEpsilonInput = (
        <input type="checkbox" id="is-epsilon-transition" name="is-epsilon-transition" checked={isEpsilonTransition} onChange={e => updateIsEpsilonTransition(e.target.checked)}></input>
    );

    return (
        <div className="flex flex-col">
            <div className="font-medium text-2xl">Transition</div>
            <div>{srcNode.labelText} to {dstNode.labelText}</div>
            <div className="mt-3 ml-1 mb-1 text-left">
                Accepted Tokens
            </div>
            <div className="divide-y mb-3">
                <ListItem title="ε" rightContent={transitionUseEpsilonInput} />
                {StateManager.alphabet.map((token) => <DetailsBox_TransitionTokenCheckBox transition={tw} token={token} />)}
            </div>
            
        </div>
    );
}