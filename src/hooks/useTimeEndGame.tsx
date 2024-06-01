import { useContext, createContext, useState, ReactNode } from "react";

interface ITime {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
}

const SharedTimeContext = createContext<ITime | undefined>(undefined);

export const SharedStopProvider = ({children}: {children: ReactNode}) => {
    const [time, setTime] = useState<number>(0);

    return (
        <SharedTimeContext.Provider value={{time, setTime}}>
            {children}
        </SharedTimeContext.Provider>
    );
}

const useSharedStop = () => {
    const context = useContext(SharedTimeContext);
    if (!context) {
        throw new Error("useSharedStop must be used within a SharedStopProvider");
    }
    return context;
}

export default useSharedStop;
