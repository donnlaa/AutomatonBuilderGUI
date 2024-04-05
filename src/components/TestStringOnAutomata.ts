import DFAState from 'automaton-kit/lib/dfa/DFAState';
import DFA from 'automaton-kit/lib/dfa/DFA';
import DFATransition from 'automaton-kit/lib/dfa/DFATransition';
import DFARunner, { DFARunnerStatus } from 'automaton-kit/lib/dfa/DFARunner';
import StateManager from '../StateManager';


// (method) StateManager.toJSON(): {
//     states: {
//         id: string;
//         x: number;
//         y: number;
//         label: string;
//     }[];
//     alphabet: {
//         id: string;
//         symbol: string;
//     }[];
//     transitions: {
//         id: string;
//         source: string;
//         dest: string;
//         isEpsilonTransition: boolean;
//         tokens: string[];
//     }[];
//     startState: string;
//     acceptStates: string[];
// }

function convertIDtoLabelOrSymbol(id: string, stateManagerData: any): string | null {
    // Check if the ID matches a state ID
    const state = stateManagerData.states.find((s: any) => s.id === id);
    if (state) {
        return state.label;
    }

    // Check if the ID matches a symbol ID in the alphabet
    const symbol = stateManagerData.alphabet.find((a: any) => a.id === id);
    if (symbol) {
        return symbol.symbol;
    }

    // ID not found in states or alphabet
    return null;
}

export function testStringOnAutomata(testString: string): string {
    let myDFA = new DFA();
    const stateManagerData = StateManager.toJSON();

    myDFA.inputAlphabet = StateManager.toJSON().alphabet.map((s) => s.symbol);
    myDFA.states = StateManager.toJSON().states.map((s) => new DFAState(s.label));
    myDFA.acceptStates = StateManager.toJSON().acceptStates.map((s) => {
        const label = convertIDtoLabelOrSymbol(s, stateManagerData);
        return myDFA.states.find((state) => state.label === label);
    });

    myDFA.startState = myDFA.states.find((s) => s.label === convertIDtoLabelOrSymbol(stateManagerData.startState, stateManagerData));

    
    myDFA.transitions = stateManagerData.transitions.flatMap((t) =>
    t.tokens.map((tokenID) => {
        const sourceLabel = convertIDtoLabelOrSymbol(t.source, stateManagerData);
        const tokenSymbol = convertIDtoLabelOrSymbol(tokenID, stateManagerData);
        const destLabel = convertIDtoLabelOrSymbol(t.dest, stateManagerData);

        return new DFATransition(
            myDFA.states.find((s) => s.label === sourceLabel),
            tokenSymbol,
            myDFA.states.find((s) => s.label === destLabel)
        );
    })
    );

    console.log(myDFA);
    
// let runner = new DFARunner(myDFA, testString.split(''));

console.log('Testing string:', testString);
/*
// Iterate over each character in the test string
for (let i = 0; i < testString.length; i++) {
    // Process the current character
    runner.runStep();
    
    // Log the current state of the runner
    console.log(`After processing '${testString[i]}':`, runner.getStatus());
}

// After running through all characters, check the final status
let result = runner.getStatus();

// Log the final status of the DFA runner
console.log('Final status:', result);
*/

    let runner = new DFARunner(myDFA, testString.split(''));
    runner.runUntilConclusion();
    let result = runner.getStatus();
    console.log('Testing string:', testString);

    switch (result) {
        case DFARunnerStatus.NotStarted:
            console.log('Result: Not Started');
            return 'Not Started';
        case DFARunnerStatus.InProgress:
            console.log('Result: In Progress');
            return 'In Progress';
        case DFARunnerStatus.Accepted:
            console.log('Result: Accepted');
            return 'Accepted';
        case DFARunnerStatus.Rejected:
            console.log('Result: Rejected');
            return 'Rejected';
        case DFARunnerStatus.InvalidDFA:
            console.log('Result: Invalid DFA');
            return 'Invalid DFA';
        case DFARunnerStatus.InvalidInputTokens:
            console.log('Result: Invalid Input Tokens');
            return 'Invalid Input Tokens';
        default:
            console.log('Result: Unknown Status');
            return 'Unknown Status';
    }
}

