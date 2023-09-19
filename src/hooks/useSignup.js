import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const UseSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (email, password) => {
    setError(null);
    setLoading(true);
    const response = await fetch(
      "https://workout-backend-1j7e.onrender.com/api/user/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };
  return { signup, error, loading };
};
