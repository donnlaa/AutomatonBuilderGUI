# Automaton GUI

## Setup

First, make sure you have Node version 14.0 or greater installed. Then, navigate to this directory
in the terminal, and run:

```sh
npm install
```

Then, to build the actual program, run

```sh
npm run build
```

The built program components should then appear in the `dist` directory. Open
`index.html` in your web browser to run it!

## Usage

Most of the interface is the blank canvas, where the state diagram will be. On
the left side of the screen are two vertical panels. The left-most panel will
display properties about any currently-selected items. and the panel to the
right of that is the Toolbox, which allows you to change the current tool.

### Tools

#### Select (S)

The Select tool allows you to select and drag state nodes. You can also select
transitions between nodes. When a node or transition is selected, information
about it will appear in the left-most column of the GUI.

#### Add States (A)

The Add States tool allows you to add state nodes to the canvas by
double-clicking.

#### Add Transitions (T)

The Add Transitions tool allows you to create transitions between nodes by
clicking the nodes and dragging outwards from them. When you do so, a temporary
dotted arrow will appear. If you drag the tip over another node and release
the mouse button, a transition will be created between those two nodes.

### Configure Automaton

The Configure Automaton window allows you to set the automaton type (although
at present it has no effect), as well as specify the tokens for the input
alphabet.

### Saving and Loading

As of the time of writing this document, an automaton can be saved to the user's
computer by clicking the Save button in the Toolbox. The Load button, just below
it, should be able to load the JSON file format, but it is currently out of
operation.
