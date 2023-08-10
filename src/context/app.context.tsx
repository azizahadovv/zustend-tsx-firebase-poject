import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface AuthContextState {
  user: User;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextState>({
  isLoading: false,
  user: {} as User,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [InitialLoading, setInitialLoading] = useState<boolean>(true);
  const { isLoading, setIsLoading, user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const value = useMemo(
    () => ({
      user,
      isLoading,
    }),
    [user, isLoading]
  );

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setIsLoading(true);
          setUser({} as User);
          navigate("/");
        }
        setInitialLoading(false);
        setIsLoading(false);
      }),
    []
  );

  return (
    <AuthContext.Provider value={value}>
      {InitialLoading ? "...loading" : children}
    </AuthContext.Provider>
  );
};
