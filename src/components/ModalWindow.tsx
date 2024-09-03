import { BsXLg } from "react-icons/bs";
import { motion } from "framer-motion";

interface ClosableModalWindowProps {
    title?: string,
    close?: () => void
}

export function ClosableModalWindow(props: React.PropsWithChildren<ClosableModalWindowProps>) {
    return (<ModalWindow>
        <div className="m-3">
            <div className="flow-root">
                <div className="float-left">
                    <div className="font-medium text-3xl mb-2">
                        {props.title}
                    </div>
                </div>
                <button className="float-right" onClick={props.close}>
                    <BsXLg />
                </button>
            </div>
            {props.children}
        </div>
    </ModalWindow>);
}

export default function ModalWindow(props: React.PropsWithChildren) {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className={`z-40 fixed inset-0 bg-gray-500/50 dark:bg-gray-950/70`}></div>
                <div className={`fixed inset-0 z-50 w-screen overflow-y-auto`}>
                    <div className={`flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0`}>
                        <motion.div initial={{ y: -30 }} animate={{ y: 0 }} exit={{ y: -30 }}>
                            <div className='relative transform overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white text-left shadow-xl sm:w-full sm:max-w-lg'>
                                {props.children}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
