import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/auth.store";

function Auth() {
  const [auth, setAuth] = useState<"signin" | "signup">("signin");
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const { SignUp, SignIn } = useAuth();
  const { isLoading, error, user } = useAuthStore();

  function TogleAuth(state: "signin" | "signup"): void {
    setAuth(state);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Email.length || !Password.length) {
      setInvalid(true);
    }
    setInvalid(false);
    if (auth == "signup") {
      SignUp(Email, Password);
    } else {
      SignIn(Email, Password);
    }
  };

  return (
    <div className="container is-widescreen w-50 ">
      <form className="mt-5" onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal text-center">
          {" "}
          Please {auth === "signup" ? "Sign up " : "Sign in"}{" "}
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-floating">
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={`form-control my-3 ${invalid && "is-invalid"} `}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={`form-control my-3 ${invalid && "is-invalid"} `}
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          disabled={isLoading}
          type="submit"
        >
          {isLoading
            ? "loading..."
            : auth === "signin"
            ? " Sign In"
            : " Sign Up"}
        </button>
        <p className="fw-normal m-2 text-center">
          {auth === "signup" ? "Already have an account" : "Not Accaunt yet"}
          {auth === "signup" ? (
            <span
              onClick={() => TogleAuth("signin")}
              style={{ cursor: "pointer" }}
              className="fw-bolt text-primary"
            >
              Sign In
            </span>
          ) : (
            <span
              onClick={() => TogleAuth("signup")}
              style={{ cursor: "pointer" }}
              className="fw-bolt text-primary"
            >
              Sign Up now
            </span>
          )}
        </p>
      </form>
    </div>
  );
}

export default Auth;
