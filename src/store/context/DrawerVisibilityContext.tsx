"use client";

import { createContext, ReactNode, useState } from "react";

interface DrawerState {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IdState {
    value: number | null | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | null | undefined>>;
}

interface DrawerContextType {
    add: DrawerState;
    edit: DrawerState;
    remove: DrawerState;
    view: DrawerState;
    id: IdState;
}

const initialState: DrawerContextType = {
    add: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    edit: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    remove: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    view: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    id: {
        value: undefined,
        setValue: (() => {}) as React.Dispatch<React.SetStateAction<number | null | undefined>>,
    },
};

export const DrawerContext = createContext<DrawerContextType>(initialState);

const DrawerVisibilityContext = ({ children }: { children: ReactNode }) => {
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isViewVisible, setIsViewVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isRemoveVisible, setIsRemoveVisible] = useState(false);
    const [id, setId] = useState<number | null | undefined>(undefined);

    return (
        <DrawerContext.Provider
            value={{
                add: { visible: isAddVisible, setVisible: setIsAddVisible },
                view: { visible: isViewVisible, setVisible: setIsViewVisible },
                edit: { visible: isEditVisible, setVisible: setIsEditVisible },
                remove: { visible: isRemoveVisible, setVisible: setIsRemoveVisible },
                id: { value: id, setValue: setId },
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};

export default DrawerVisibilityContext;
