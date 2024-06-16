export function convertIDtoLabelOrSymbol(id: string, stateManagerData: any): string | null {
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