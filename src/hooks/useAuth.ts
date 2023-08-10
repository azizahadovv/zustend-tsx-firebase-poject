import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthStore } from "../store/auth.store";
import { User } from "@firebase/auth";

export const useAuth = () => {
  const { user, error, isLoading, setError, setIsLoading, setUser } =
    useAuthStore();
  const navigete = useNavigate();

  const SignUp = async (email: string, password: string) => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        setIsLoading(false);
        navigete("/admin");
      })
      .catch((err) => {
        const result = err as Error;
        setError(result.message);
        console.log(result.message);
      })
      .finally(() => setIsLoading(false));
  };
  const SignIn = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        setIsLoading(false);
        navigete("/admin");
      })
      .catch((err) => {
        const result = err as Error;
        setError(result.message);
        console.log(result.message);
      })
      .finally(() => setIsLoading(false));
  };

  const Logout = async () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({} as User);
        navigete("/");
      })
      .catch((err) => {
        const result = err as Error;
        setError(result.message);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    SignIn,
    SignUp,
    Logout,
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
};
