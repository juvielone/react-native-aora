import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";

type StateContextType = {
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<null | StateContextType>(null);
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
type ContextProviderProps = {
  children: React.ReactNode;
};

const GlobalProvider = ({ children }: ContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res: any) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    setIsLoggedIn,
    isLoggedIn,
    setUser,
    user,
    setIsLoading,
    isLoading,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
