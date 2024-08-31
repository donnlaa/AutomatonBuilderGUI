
interface ModalWindowListItemProps {
    title: string,
    subtitle?: string | undefined,
    rightContent?: JSX.Element | undefined,
    destination?: any | null
}

export function CoreListItem(props: React.PropsWithChildren) {
    return (
        <div className="flow-root bg-white dark:bg-gray-600 p-2 px-2 first:rounded-t-lg last:rounded-b-lg">
            {props.children}
        </div>
    );
}

export function CoreListItem_Left(props: React.PropsWithChildren) {
    return (
        <div className="float-left align-middle ml-1">
            {props.children}
        </div>
    );
}

export function CoreListItem_Right(props: React.PropsWithChildren) {
    return (
        <div className="float-right align-middle mr-1">
            {props.children}
        </div>
    );
}

export function ListItem(props: React.PropsWithChildren<ModalWindowListItemProps>) {
    return (
        <CoreListItem>
            <CoreListItem_Left>
                {props.title}
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    {props.subtitle}
                </div>
            </CoreListItem_Left>
            <CoreListItem_Right>
                {props.rightContent}
            </CoreListItem_Right>
            <CoreListItem_Right>
                {props.destination !== null && props.destination !== undefined ? ">" : ""}
            </CoreListItem_Right>
        </CoreListItem>
    );
}