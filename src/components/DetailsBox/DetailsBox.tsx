import { useState } from 'react';
import NodeWrapper from "../../NodeWrapper";
import SelectableObject from "../../SelectableObject";
import TransitionWrapper from "../../TransitionWrapper";
import DetailsBox_NoSelection from "./DetailsBox_NoSelection";
import DetailsBox_StateSelection from "./DetailsBox_StateSelection";
import DetailsBox_TransitionSelection from "./DetailsBox_TransitionSelection";
import StateManager from '../../StateManager';

interface DetailsBoxProps {
  selection: Array<SelectableObject>;
  startNode: NodeWrapper;
  setStartNode: React.Dispatch<React.SetStateAction<NodeWrapper>>;
}

/**
 * Displays editors for each selected item in the left-hand panel.
 * @param props 
 * @param {Array<SelectableObject>} selection An array of the currently-selected
 * objects.
 * @param {NodeWrapper} startNode The node currently selected as the start node.
 * @param {React.Dispatch<React.SetStateAction<NodeWrapper>>} setStartNode A function
 * to call for setting the start node to another node.
 * @returns 
 */
export default function DetailsBox(props: DetailsBoxProps) {
  const [isSnapActive, setIsSnapActive] = useState(StateManager.isSnapToGridEnabled());

  // Function to toggle snap to grid feature on/off
  const handleToggleSnap = () => {
    StateManager.toggleSnapToGrid();
    setIsSnapActive(!isSnapActive); // Toggle the local UI state
  };

  // For each item selected display its corresponding editor
  const selectionElements = props.selection.map((item, index) => {
    if (item instanceof NodeWrapper) {
      return (
        <DetailsBox_StateSelection
          key={item.id}
          nodeWrapper={item}
          startNode={props.startNode}
          setStartNode={props.setStartNode}
        />
      );
    } else if (item instanceof TransitionWrapper) {
      return <DetailsBox_TransitionSelection key={item.id} transition={item} />;
    }
    return <div key={`unhandled-${index}`}>Unhandled item type</div>;
  });

  // The bottom toggle button is always rendered outside of the selectionElements logic
  return (
    <div className="details-box flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {selectionElements.length > 0 ? selectionElements : <DetailsBox_NoSelection />}
      </div>
      {/* Always render the toggle button at the bottom */}
      <div className="p-2 flex justify-center mt-auto">
        <button
          onClick={handleToggleSnap}
          className={`text-white font-bold py-2 px-4 rounded-full my-2 w-full ${isSnapActive ? 'bg-blue-700' : 'bg-blue-500'}`}
        >
          {isSnapActive ? 'Disable Snap to Grid' : 'Enable Snap to Grid'}
        </button>
      </div>
    </div>
  );
}
