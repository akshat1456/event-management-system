const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getEvents(signal) {
  const response = await fetch(`${API_BASE_URL}/api/events`, { signal });

  if (!response.ok) {
    throw new Error(`Unable to fetch events (HTTP ${response.status})`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Unexpected API response: expected an array of events");
  }

  return data;
}
