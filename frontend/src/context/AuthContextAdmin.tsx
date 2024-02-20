import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  loginAdmin,
  checkAdminAuthStatus,
  logoutAdmin,
} from "../helpers/api-communicator";

type Admin = {
  name: string;
  email: string;
};
type AdminAuth = {
  isLoggedIn: boolean;
  admin: Admin | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContextAdmin = createContext<AdminAuth | null>(null);

export const AuthProviderAdmin = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const data = await checkAdminAuthStatus();
      if (data) {
        setAdmin({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);
  const login = async (email: string, password: string) => {
    const data = await loginAdmin(email, password);
    if (data) {
      setAdmin({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {
    await logoutAdmin();
    setIsLoggedIn(false);
    setAdmin(null);
    window.location.reload();
  };

  const value = {
    admin,
    isLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContextAdmin.Provider value={value}>
      {children}
    </AuthContextAdmin.Provider>
  );
};

export const useAuthAdmin = () => useContext(AuthContextAdmin);
