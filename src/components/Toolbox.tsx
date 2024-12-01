import { Tool } from '../Tool';
import ToolButton from './ToolButton';
import StateManager from '../StateManager';
import { useRef } from 'react';
import { useState } from 'react';
import { BsCursor, BsCursorFill, BsDownload, BsNodePlus, BsNodePlusFill, BsPlusCircle, BsPlusCircleFill, BsUpload, BsZoomIn, BsZoomOut, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsCake } from 'react-icons/bs';
import { TbZoomReset } from "react-icons/tb";
import { GrGrid } from "react-icons/gr";
import ConfirmationDialog from './ConfirmationDialog';
import { FaRegImage } from "react-icons/fa6";
import { BiFileBlank, BiReset} from "react-icons/bi";

import { ClosableModalWindow } from './ModalWindow';
import { motion, AnimatePresence } from 'framer-motion';


interface ToolboxProps {
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

interface ActionButtonProps {
    onClick: () => void
    icon: JSX.Element
    title: string
    bgColor: string
    margin?: string
}

function ActionButton({onClick, icon, title, bgColor, margin = 'm-1'}: ActionButtonProps) {
    return (
        <button className={`rounded-full p-2 ${margin} mx-2 block text-white text-center ${bgColor}`} onClick={onClick} title={title}>
        <div className='flex flex-row items-center justify-center'>{icon}</div>
        </button>
    );
}

/**
 * Provides the UI interface with which the user can select a tool to use.
 * @param props
 * @param {Tool} props.currentTool The current tool being used.
 * @param {React.Dispatch<React.SetStateAction<Tool>>} props.setCurrentTool A function for setting the current tool.
 */
export default function Toolbox(props: React.PropsWithChildren<ToolboxProps>) {
    const [isSnapActive, setIsSnapActive] = useState(StateManager.snapToGridEnabled);
    const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

    // Function to toggle snap to grid feature on/off
    const handleToggleSnap = () => {
        StateManager.toggleSnapToGrid();
        setIsSnapActive(!isSnapActive); // Toggle the local UI state
    };

    // Function to trigger file input click event
    const handleLoadButtonClick = () => {
        fileInputRef.current?.click(); // Programmatically click the hidden file input
    };
    const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleClearMachineClick = () => {
    setIsDialogVisible(true);
  };

  const handleConfirm = () => {
    StateManager.clearMachine();
    setIsDialogVisible(false);
  };

  const handleCancel = () => {
    setIsDialogVisible(false);
  };

    return (
        <>
        <div className='flex flex-col text-xl'>
            <ToolButton tool={Tool.Select} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool} title="Select [S]">
                <div className='flex flex-row items-center place-content-center'>
                    {props.currentTool === Tool.Select ? <BsCursorFill /> : <BsCursor />}
                </div>
            </ToolButton>
            <ToolButton tool={Tool.States} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool} title="Add States [A]">
                <div className='flex flex-row items-center place-content-center'>
                    {props.currentTool === Tool.States ? <BsPlusCircleFill /> : <BsPlusCircle />}
                </div>
            </ToolButton>
            <ToolButton tool={Tool.Transitions} setCurrentTool={props.setCurrentTool} currentTool={props.currentTool} title="Add Transitions [T]">
                <div className='flex flex-row items-center place-content-center'>
                    {props.currentTool === Tool.Transitions ? <BsNodePlusFill /> : <BsNodePlus />}
                </div>
            </ToolButton>
            <div className='grow'></div>
            {/* Enable Snap to Grid Button */}
            <ActionButton onClick={handleToggleSnap} icon={<GrGrid />} title={isSnapActive ? 'Disable Snap to Grid' : 'Enable Snap to Grid'} bgColor={isSnapActive ? 'bg-fuchsia-800' : 'bg-fuchsia-500'} ></ActionButton>
            <ActionButton onClick={StateManager.downloadJSON} icon={<BsDownload />} title="Download from JSON" bgColor="bg-amber-500"></ActionButton>
            <input type='file' id='file-uploader' ref={fileInputRef} style={{ display: 'none' }} onChange={StateManager.uploadJSON} />
            <ActionButton onClick={handleLoadButtonClick} icon={<BsUpload />} title="Load from JSON" bgColor="bg-amber-500"></ActionButton>
            {/* Reset Zoom Button */}
            <ActionButton onClick={StateManager.resetZoom} icon={<TbZoomReset />} title="Reset Zoom" bgColor="bg-blue-500"></ActionButton>
            {/* Center Stage Button */}
            <ActionButton onClick={StateManager.centerStage} icon={<BiReset />} title="Center Stage" bgColor="bg-green-500"></ActionButton>
            {/* Zoom In Button */}
            <ActionButton onClick={StateManager.zoomIn} icon={<BsZoomIn />} title="Zoom In" bgColor="bg-blue-500"></ActionButton>
            {/* Zoom Out Button */}
            <ActionButton onClick={StateManager.zoomOut} icon={<BsZoomOut />} title="Zoom Out" bgColor="bg-blue-500"></ActionButton>
            {/* Clear Stage No Save Button */}
            <div className="flex flex-col items-center mt-4"></div>
            <ActionButton onClick={handleClearMachineClick}icon={<BiFileBlank />}title="New Automaton"bgColor="bg-black" margin="m-10"></ActionButton>
      
      
            {/* Undo Button */}
            <ActionButton onClick={StateManager.undoState} icon={<BsFillArrowLeftCircleFill />} title="Undo most recent action" bgColor="bg-blue-500"></ActionButton>
            {/* Redo Button */}
            <ActionButton onClick={StateManager.redoState} icon={<BsFillArrowRightCircleFill />} title="Redo most recent action" bgColor="bg-blue-500"></ActionButton>
            {/* Export Button */}
            <ActionButton onClick={StateManager.exportAutomatonToImage} icon={<FaRegImage />} title="Export Automaton to PNG" bgColor="bg-teal-500" margin="m-10"/>
        </div>
        
        {isDialogVisible&&(
        <ConfirmationDialog
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure you want to clear the machine?"
        
                />
            )}
            

        </>
    );
}
