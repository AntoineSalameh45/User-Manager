import { ChangeEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router";
import useSessionStore from "../../../store/authStore";

const Login = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setpasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const setIsLoggedIn = useSessionStore((state) => state.setIsLoggedIn);
    const setAccessToken = useSessionStore((state) => state.setAccessToken);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
      setpasswordVisible((prev) => !prev);
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value);
    const handlePassChange = (e: ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value);
    const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

    const handleSubmit = async (email: string, password: string) => {
      try {
        setSubmitting(true);
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        const result = data.result?.data;

        if (response.ok && data.status === 200) {
          setAccessToken(result.accessToken, result.expiresIn);
          setIsLoggedIn(true);
          navigate("/dashboard");
        } else {
          console.log("Login failed:", result);
          setErrorMessage(result?.message || "Email or Password Incorrect");
        }
      } catch (e) {
        console.log("Login error:", e);
        setErrorMessage("Something went wrong");
      } finally {
        setSubmitting(false);
      }
    };

    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pagebg">
        <div className="bg-cardbg text-txt shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-3xl font-bold text-center mt-10">Login</h1>
          <form
            className="flex flex-col items-center mt-10 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(email, password);
            }}
          >
            <div className="flex flex-col w-80">
              <label htmlFor="email" className="text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-300 p-2 rounded focus:outline-primary"
                required
              />
            </div>

            <div className="flex flex-col w-80">
              <label htmlFor="password" className="text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePassChange}
                  className="border border-gray-300 p-2 rounded focus:outline-primary w-full pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  {passwordVisible ? (
                    <VisibilityOff fontSize="small" className="text-txt"/>
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}

            <button
              type="submit"
              className={`w-auto py-2 px-4 text-insidetxt rounded ${
                isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-btn"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;