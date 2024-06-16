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

export function testStringOnAutomata(testString: string): string {
    let myDFA = StateManager.dfa;
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

