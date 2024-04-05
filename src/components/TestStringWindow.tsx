import { SetStateAction, useState } from "react";
import { testStringOnAutomata } from "./TestStringOnAutomata";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import DFA from 'automaton-kit/lib/dfa/DFA';
import DFATransition from 'automaton-kit/lib/dfa/DFATransition';
import DFAState from 'automaton-kit/lib/dfa/DFAState';
import StateManager from "../StateManager";

export default function TestStringWindow() {
    const [testString, setTestString] = useState('');
    const [result, setResult] = useState('');

    const handleTestString = () => {
        const testResult = testStringOnAutomata(testString);
        setResult(testResult);
    };

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTestString(e.target.value);
        setResult(''); // Clear the result when the test string changes
    };

    return (
        <div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-300">
                <input
                    className="focus:outline-none bg-transparent flex-grow border-0 py-2"
                    type="text"
                    placeholder="Enter string to test"
                    value={testString}
                    onChange={handleChange} // Updated to use the new handleChange function
                />
                <button
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700"
                    onClick={handleTestString}
                >
                    <BsFillClipboardCheckFill />
                </button>
            </div>
            {result && <div className="mt-4 text-lg font-semibold">{`Result: ${result}`}</div>}
            <div className="flex-1"></div> {/* This div creates extra space at the bottom */}
        </div>
    );
}
