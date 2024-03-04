import { createContext, useContext, useEffect, useState } from "react";

interface LoginProps {
    email: string;
    password: string;
}
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (credentials: LoginProps) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const getValueFromLocalStorage = (key: string) => {
   return window.localStorage.getItem(key)
}

const removeValueFromLocalStorage = (key: string) => {
    window.localStorage.removeItem(key);
}

const setValueInLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
}

type UserLoginResponse = {
    accessToken: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (credentials: LoginProps) => {
    const { email, password } = credentials;
    if (email === 'abc@gmail.com' && password === 'abc$1234') {
        const response: UserLoginResponse = {
            accessToken: 'acess'
        }
        console.log('time before login =', new Date());
        setValueInLocalStorage('token', response.accessToken);
        setIsAuthenticated(true)
    } else {
        throw new Error('Invalid Credentials');
    }
  };

  const logout = () => {
    removeValueFromLocalStorage('token')
    console.log('time after logout =', new Date());
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextProps => {
    const context =useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export default AuthProvider;