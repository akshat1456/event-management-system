import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      try {
        const data = await getEvents(controller.signal);
        if (!controller.signal.aborted) setEvents(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadEvents();
    return () => controller.abort();
  }, [reloadKey]);

  function refreshEvents() {
    setLoading(true);
    setError("");
    setReloadKey((key) => key + 1);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              EventHub
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">
              Explore Events
            </h1>
            <p className="mt-4 text-slate-600">
              Events loaded from the Node.js and Express API.
            </p>
          </div>
          <button
            type="button"
            onClick={refreshEvents}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Refresh from API
          </button>
        </div>

        {loading ? (
          <p className="mt-10 font-medium text-slate-600" role="status">
            Loading events from server...
          </p>
        ) : error ? (
          <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
            <p className="font-semibold">Could not load events.</p>
            <p className="mt-2">{error}</p>
            <p className="mt-2">Check that the Express server is running on port 5000.</p>
          </div>
        ) : events.length === 0 ? (
          <p className="mt-10 text-slate-600">No events are available.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
