import { Tool } from '../Tool';
import ToolButton from './ToolButton';
import StateManager from '../StateManager';
import { useRef } from 'react';
import { BsCursor, BsCursorFill, BsDownload, BsNodePlus, BsNodePlusFill, BsPlusCircle, BsPlusCircleFill, BsUpload, BsZoomIn, BsZoomOut, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { TbZoomReset } from "react-icons/tb";
import { BiCake, BiReset, BiSave, BiTrash } from "react-icons/bi";

interface ToolboxProps {
    currentTool: Tool
    setCurrentTool: React.Dispatch<React.SetStateAction<Tool>>
}

/**
 * Provides the UI interface with which the user can select a tool to use.
 * @param props
 * @param {Tool} props.currentTool The current tool being used.
 * @param {React.Dispatch<React.SetStateAction<Tool>>} props.setCurrentTool A function for setting the current tool.
 */
export default function Toolbox(props: React.PropsWithChildren<ToolboxProps>) {
    const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

    // Function to trigger file input click event
    const handleLoadButtonClick = () => {
        fileInputRef.current?.click(); // Programmatically click the hidden file input
    };

    return (
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
            <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center' onClick={StateManager.downloadJSON} title="Download from JSON">
                <BsDownload />
            </button>
            <input type='file' id='file-uploader' ref={fileInputRef} style={{ display: 'none' }} onChange={StateManager.uploadJSON} />
            <button className='rounded-full p-2 m-1 mx-2 block bg-amber-500 text-white text-center' onClick={handleLoadButtonClick} title="Load from JSON">
                <BsUpload />
            </button>
            {/* Reset Zoom Button */}
            <button className='rounded-full p-2 m-1 mx-2 block bg-blue-500 text-white text-center' onClick={StateManager.resetZoom} title="Reset Zoom">
                <div className='flex flex-row items-center justify-center'>
                    <TbZoomReset />
                </div>
            </button>
            {/* Center Stage Button */}
            <button className='rounded-full p-2 m-1 mx-2 block bg-green-500 text-white text-center' onClick={StateManager.centerStage} title="Center Stage">
                <div className='flex flex-row items-center justify-center'>
                    <BiReset />
                </div>
            </button>
            {/* Zoom In Button */}
            <button className='rounded-full p-2 m-1 mx-2 block bg-blue-500 text-white text-center' onClick={StateManager.zoomIn} title="Zoom In">
                <div className='flex flex-row items-center justify-center'>
                    <BsZoomIn />
                </div>
            </button>
            {/* Zoom Out Button */}
            <button className='rounded-full p-2 m-1 mx-2 block bg-blue-500 text-white text-center' onClick={StateManager.zoomOut} title="Zoom Out">
                <div className='flex flex-row items-center justify-center'>
                    <BsZoomOut />
                </div>
            </button>
            {/* Clear Stage No Save Button */}
            <button className='rounded-full p-2 m-10 mx-2 block bg-red-500 text-white text-center' onClick={StateManager.clearMachine} title="Clear the Automaton">
                <div className='flex flex-row items-center justify-center'>
                    <BiTrash />
                </div>
            </button>
            {/* Undo Button */}
            <button className='rounded-full p-2 m-1 mx-2 block bg-blue-500 text-white text-center' onClick={StateManager.undoState} title="Undo most recent action">
                <div className='flex flex-row items-center justify-center'>
                    <BsFillArrowLeftCircleFill />
                </div>
            </button>
            {/* Redo Button */}
            <button className='rounded-full p-2 m-1 mx-2 block bg-blue-500 text-white text-center' onClick={StateManager.redoState} title="Redo most recent action">
                <div className='flex flex-row items-center justify-center'>
                    <BsFillArrowRightCircleFill />
                </div>
            </button>                                    
        </div>
    );
}
