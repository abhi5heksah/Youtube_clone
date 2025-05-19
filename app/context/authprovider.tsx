import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchYoutubeData } from "~/utils/rapidapi";

interface AuthContextType {
    user: null | object; 
    loading: boolean;
    data: any[];    
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}


interface AuthProviderProps {
    children: ReactNode;
    user?: any; 
}

interface FetchAllDataFunction {
    (query: string): void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    data: [],
    value: "",
    setValue: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]); // 
    const [value, setValue] = useState<string>("New");
    const [user, setUser] = useState<null | object>(null); // Added user state

    useEffect(() => {
        fetchAllData(value);
    }, [value]);


const fetchAllData: FetchAllDataFunction = (query) => {
  setLoading(true);
  fetchYoutubeData(query)
    .then((res) => {
      setData(res.items); 
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching YouTube data:", error);
    });
};


    return (
        <AuthContext.Provider value={{ user, loading, data, value, setValue }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);