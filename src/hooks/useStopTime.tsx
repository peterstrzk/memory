import { useContext, createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface IStop {
    stop: boolean;
    setStop: Dispatch<SetStateAction<boolean>>;
}

const SharedStopContext = createContext<IStop | undefined>(undefined);

export const SharedStopProvider = ({children}: {children: ReactNode}) => {
    const [stop, setStop] = useState<boolean>(false);

    return (
        <SharedStopContext.Provider value={{stop, setStop}}>
            {children}
        </SharedStopContext.Provider>
    );
}

const useSharedStop = () => {
    const context = useContext(SharedStopContext);
    if (!context) {
        throw new Error("useSharedStop must be used within a SharedStopProvider");
    }
    return context;
}

export default useSharedStop;
