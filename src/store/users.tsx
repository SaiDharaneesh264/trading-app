import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export type UserType = {
    id: number;
    fullName: string;
    email: string;
    password: string;
    balance: number;
  };


interface AuthContextType {
    isAuthenticated: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
    logout: () => void;
    updateUser: (newUser: UserType) => void;
    user: UserType;
}

type AuthProviderProps = {
    children: React.ReactNode;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUserInfo] = useState<UserType>({
    id: 0,
    fullName: "",
    email: "",
    password: "",
    balance: 0,
  });

    const logout = () => {
        console.log('called logout method');
        setAuthenticated(false);
        navigate('/login')
    }
    const updateUser = (newUser: UserType) => {
        console.log('in the update the user method')
        setUserInfo(newUser)
        console.log('user =', user);
        setAuthenticated(true);
        console.log('authenticated set to true')
    }

    const storeAcessTooken = (token: string, expiryTime: number) => {
        const now = Date.now();
        const expiryDate = new Date(now + expiryTime);
        localStorage.setItem('accessToken', JSON.stringify({
            token,
            expiry: expiryDate.getTime()
        }))
    }

    const getAccessToken = () => {
        const storedData = localStorage.getItem('acecessToken');
        if (!storedData) {
            return null;
        }
        try {
            const data = JSON.parse(storedData);
            const expiry = new Date(data.expiry);
            if (expiry.getTime() < Date.now()) {
                localStorage.removeItem('accessToken');
                return null;
            }
            return data.token;
        } catch (error) {
            console.error('Error parsing stored access token', error);
            return null;
        }
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, user, updateUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context =useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}
export default AuthProvider;