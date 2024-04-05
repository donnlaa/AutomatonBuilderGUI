interface FloatingPanelProps {
    heightPolicy: string;
    style?: React.CSSProperties;
}

export default function FloatingPanel(props: React.PropsWithChildren<FloatingPanelProps>) {
    return (
        <div className={`z-10 bg-gray-300/50 dark:bg-gray-300/50 dark:text-white w-fit h-${props.heightPolicy} p-2 m-5 rounded-lg backdrop-blur-xl shadow-xl resize-x`} style={props.style}>
            {props.children}
        </div>
    );
}