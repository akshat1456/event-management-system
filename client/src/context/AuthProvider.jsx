import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser, loginUser } from "../services/authApi";

// sessionStorage limits login persistence to this tab; tokens are still readable by JS.
const initialToken = () => sessionStorage.getItem("eventhubToken") || "";
function AuthProvider({ children }) {
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(initialToken()));

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    getCurrentUser(token, controller.signal)
      .then(data => { if (!controller.signal.aborted) setUser(data.user); })
      .catch(() => {
        if (!controller.signal.aborted) {
          sessionStorage.removeItem("eventhubToken");
          setToken("");
          setUser(null);
        }
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [token]);

  async function login(credentials) {
    const result = await loginUser(credentials);
    sessionStorage.setItem("eventhubToken", result.token);
    setUser(result.user);
    setToken(result.token);
    setLoading(false);
    return result.user;
  }
  function logout() {
    sessionStorage.removeItem("eventhubToken");
    setToken("");
    setUser(null);
    setLoading(false);
  }
  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
