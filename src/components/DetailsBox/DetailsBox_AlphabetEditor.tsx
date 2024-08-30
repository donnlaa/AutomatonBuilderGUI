import TokenWrapper from "../../TokenWrapper";
import { useState, useEffect } from "react";
import StateManager from "../../StateManager";

interface DetailsBox_TokenEditorProps {
    tokenWrapper: TokenWrapper
    removeFunc: (tk: TokenWrapper) => void
}

function DetailsBox_TokenEditor(props: DetailsBox_TokenEditorProps) {
    const tw = props.tokenWrapper;
    const [tokenSymbol, setTokenSymbol] = useState(tw.symbol);

    useEffect(() => {
        tw.symbol = tokenSymbol;
    }, [tokenSymbol]);

    return (
        <div className="flex flex-row mb-2">
            <input className="flex-1 text-inherit/40" type="text" placeholder="Token symbol" value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)}></input>
            <button className="flex-0 rounded-full mx-2 px-2 block aspect-square bg-red-500 text-center text-white" onClick={() => props.removeFunc(tw)}>x</button>
        </div>
    )
}
export default function DetailsBox_AlphabetEditor() {
    // UNDERLYING IDEA HERE: Alphabet is stored in the React component's state.
    // Whenever the React state variables are changed, push them to the StateManager.

    const [alphabet, setAlphabet] = useState(StateManager.alphabet);

    function addTokenToAlphabet() {
        const newAlphabet = [...alphabet];
        newAlphabet.push(new TokenWrapper());
        setAlphabet(newAlphabet);
    }

    function removeTokenFromAlphabet(tk: TokenWrapper) {
        const newAlphabet = alphabet.filter(i => i !== tk);
        StateManager.removeToken(tk);
        setAlphabet(newAlphabet);
    }

    useEffect(() => {
        StateManager.alphabet = alphabet;
    }, [alphabet]);

    const tokenWrapperElements = alphabet.map(tw => <DetailsBox_TokenEditor tokenWrapper={tw} removeFunc={removeTokenFromAlphabet} key={tw.id} />);



    return (
        <div className="flex flex-col">
            <div className="font-medium text-2xl">Alphabet</div>
            {tokenWrapperElements}
            <button className="rounded-full p-2 m-1 mx-2 block bg-gray-300 text-center" onClick={addTokenToAlphabet}>New Token</button>
        </div>
    );
}