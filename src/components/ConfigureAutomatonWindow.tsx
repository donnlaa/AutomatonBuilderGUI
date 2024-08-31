import { useEffect, useState } from "react";
import TokenWrapper from "../TokenWrapper";
import StateManager from "../StateManager";
import { CoreListItem, CoreListItem_Left, CoreListItem_Right, ListItem } from "./ListItem";
import { BsPlusCircleFill, BsXCircleFill } from "react-icons/bs";
import { useActionStack } from "../utilities/ActionStackUtilities";

interface ListItem_TokenEditorProps {
    token: TokenWrapper
}

function ListItem_TokenEditor(props: React.PropsWithChildren<ListItem_TokenEditorProps>) {
    const tw = props.token;
    const [tokenSymbol, setTokenSymbol] = useState(tw.symbol);

    let updateTokenSymbol = (newSymbol: string) => {
        setTokenSymbol(newSymbol);
        StateManager.setTokenSymbol(tw, newSymbol);
    };
    
    const [_, currentStackLocation] = useActionStack();
    useEffect(() => {
        setTokenSymbol(tw.symbol);
    }, [currentStackLocation]);

    return (
        <CoreListItem>
            <CoreListItem_Left>
                <input className="focus:outline-none bg-transparent grow" type="text" minLength={1} maxLength={1} placeholder="Token symbol" value={tokenSymbol} onChange={e => updateTokenSymbol(e.target.value)}></input>
            </CoreListItem_Left>
            <CoreListItem_Right>
                <button className="flex-0 float-right px-2 block text-center text-red-500 align-middle" onClick={() => StateManager.removeToken(tw)}>
                    <BsXCircleFill />
                </button>
            </CoreListItem_Right>
        </CoreListItem>
    )
}

function AlphabetList() {
    // UNDERLYING IDEA HERE: Alphabet is stored in the React component's state.
    // Whenever the React state variables are changed, push them to the StateManager.

    const [alphabet, setAlphabet] = useState(StateManager.alphabet);

    function addTokenToAlphabet() {
        StateManager.addToken();
        // setAlphabet(StateManager.alphabet);
        // const newAlphabet = [...alphabet];
        // newAlphabet.push(new TokenWrapper());
        // setAlphabet(newAlphabet);
    }

    // useEffect(() => {
    //     StateManager.alphabet = alphabet;
    // }, [alphabet]);

    const [_, currentStackLocation] = useActionStack();
    useEffect(() => {
        setAlphabet(StateManager.alphabet);
    }, [currentStackLocation]);

    const tokenWrapperElements = alphabet.map(tw => <ListItem_TokenEditor token={tw} key={tw.id} />);

    return (<>
        <div className="mt-3 ml-1 mb-1">
            Input Alphabet
        </div>
        <div className="divide-y">
            {tokenWrapperElements}
            <CoreListItem>
                <CoreListItem_Left>
                    <button className="text-blue-500 dark:text-blue-400 flex flex-row items-center" onClick={addTokenToAlphabet}>
                        <BsPlusCircleFill className="mr-1"/>
                        Add Token
                    </button>
                </CoreListItem_Left>
            </CoreListItem>
        </div>
    </>);
}
export default function ConfigureAutomatonWindow() {
    const faTypeSelector = (
        <select name="automaton-type" id="automaton-type" className="float-right align-bottom dark:text-black">
            <option value="dfa">DFA</option>
            <option value="nfa">NFA</option>
        </select>
    );

    const closeConfigWindow = () => {
        console.log('close me');
    };

    return (
        <div className="">
            <div className="divide-y">
                <ListItem
                    title="Automaton Type"
                    subtitle="An NFA will have fewer requirements than a DFA."
                    rightContent={faTypeSelector}
                />
            </div>
            <AlphabetList />
        </div>
    );
}