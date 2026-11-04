import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getAdminOverview } from "../services/authApi";
import { getEvents } from "../services/api";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const emptyForm = { title: "", description: "", date: "", location: "", category: "" };

function AdminDashboard() {
  const { token } = useAuth();
  const [overview, setOverview] = useState(null);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([getAdminOverview(token, controller.signal), getEvents(controller.signal)])
      .then(([details, list]) => {
        if (!controller.signal.aborted) { setOverview(details); setEvents(list); }
      })
      .catch((err) => { if (!controller.signal.aborted) setError(err.message); });
    return () => controller.abort();
  }, [token]);

  async function sendMutation(method, path, body) {
    const response = await fetch(`${API}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(json.message || `Request failed (${response.status})`);
    return json;
  }

  async function refreshList() {
    const [list, details] = await Promise.all([getEvents(), getAdminOverview(token)]);
    setEvents(list);
    setOverview(details);
  }

  async function saveEvent(event) {
    event.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      const action = editingId ? "updated" : "created";
      await sendMutation(editingId ? "PUT" : "POST", editingId ? `/api/events/${editingId}` : "/api/events", form);
      setForm(emptyForm); setEditingId("");
      await refreshList();
      setNotice(`Event ${action}. Socket.IO notification broadcast to connected clients.`);
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  function editEvent(event) {
    setEditingId(event._id || event.id);
    setForm({ title: event.title, description: event.description, date: event.date,
      location: event.location, category: event.category });
    setNotice("Editing selected event. Update the form and click Save Changes.");
    setError("");
  }

  async function deleteEvent(event) {
    if (!window.confirm(`Delete event: ${event.title}?`)) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await sendMutation("DELETE", `/api/events/${event._id || event.id}`);
      await refreshList();
      if (editingId === (event._id || event.id)) { setForm(emptyForm); setEditingId(""); }
      setNotice("Event deleted. Socket.IO notification broadcast to connected clients.");
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard — Real-Time Events</h1>
          <p className="mt-2 text-slate-600">Create, update, or delete an event to notify other connected users instantly.</p>
          {overview && <p className="mt-2 text-sm text-slate-600">Admin: {overview.admin.name} · Users: {overview.totalUsers} · Events: {overview.totalEvents}</p>}
        </header>
        {error && <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p>}
        {notice && <p role="status" className="rounded border border-green-200 bg-green-50 p-3 text-green-800">{notice}</p>}
        <form onSubmit={saveEvent} className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{editingId ? "Update event" : "Create new event"}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {Object.keys(emptyForm).map((key) => <label key={key} className="block text-sm font-semibold capitalize text-slate-700">
              {key}
              <input value={form[key]} required maxLength={key === "description" ? 1000 : key === "title" || key === "location" ? 120 : 80}
                onChange={(event) => setForm((previous) => ({ ...previous, [key]: event.target.value }))}
                className="mt-1 w-full rounded border border-slate-300 p-3 font-normal" placeholder={`Enter ${key}`}/>
            </label>)}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button disabled={busy} type="submit" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50">{editingId ? "Save Changes" : "Create Event"}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(""); setForm(emptyForm); }} className="rounded-lg border px-5 py-3">Cancel Edit</button>}
          </div>
        </form>
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">MongoDB Events ({events.length})</h2>
          {events.length === 0 && <p className="text-slate-500">No events yet. Create your first event above.</p>}
          <ul className="space-y-3">
            {events.map((event) => <li key={event._id || event.id} className="flex flex-wrap items-center justify-between gap-3 rounded border p-3">
              <div>
                <p className="font-semibold text-slate-900">{event.title}</p>
                <p className="text-sm text-slate-500">{event.date} · {event.location} · {event.category}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" disabled={busy} onClick={() => editEvent(event)} className="rounded border border-blue-300 px-3 py-2 text-blue-800">Edit</button>
                <button type="button" disabled={busy} onClick={() => deleteEvent(event)} className="rounded border border-red-300 px-3 py-2 text-red-700">Delete</button>
              </div>
            </li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
export default AdminDashboard;
