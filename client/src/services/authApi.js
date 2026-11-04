const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, { method = "GET", body, token, signal } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    signal,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.message || `Request failed (HTTP ${response.status})`);
  return json;
}

export const registerUser = data => request("/api/auth/register", { method: "POST", body: data });
export const loginUser = data => request("/api/auth/login", { method: "POST", body: data });
export const getCurrentUser = (token, signal) => request("/api/auth/me", { token, signal });
export const getAdminOverview = (token, signal) => request("/api/admin/overview", { token, signal });
