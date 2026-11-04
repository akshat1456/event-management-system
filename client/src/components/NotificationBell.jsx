import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SERVER = import.meta.env.VITE_API_URL || "http://localhost:5000";

function NotificationBell() {
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const socket = io(SERVER, { autoConnect: false, reconnection: true });
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onNotification = (notification) => {
      if (!notification || typeof notification.message !== "string") return;
      setNotifications((previous) => [notification, ...previous].slice(0, 25));
      setUnread((previous) => previous + 1);
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("event:notification", onNotification);
    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("event:notification", onNotification);
      socket.disconnect();
    };
  }, []);

  function toggleOpen() {
    setOpen((previous) => !previous);
    setUnread(0);
  }

  return (
    <div className="relative">
      <button type="button" onClick={toggleOpen}
        aria-label={`Notifications (${unread} unread)`}
        aria-expanded={open}
        className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-bold text-white hover:bg-slate-700">
        🔔 Notifications <span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5">{unread}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-[100] mt-2 w-80 max-w-[90vw] rounded-lg border border-slate-300 bg-white p-4 text-slate-900 shadow-xl">
          <div className="flex items-center justify-between gap-2 border-b pb-2">
            <strong>Real-time notifications</strong>
            <span className={`text-xs font-semibold ${connected ? "text-green-700" : "text-red-600"}`}>
              {connected ? "● Live" : "○ Disconnected"}
            </span>
          </div>
          {notifications.length === 0 ? <p className="py-4 text-sm text-slate-500">No notifications yet. Keep this page open while an admin changes an event.</p> :
            <ul className="max-h-72 space-y-2 overflow-y-auto pt-3">
              {notifications.map((n, i) => <li key={`${n.timestamp}-${n.eventId}-${i}`} className="rounded bg-blue-50 p-3 text-sm">
                <p className="font-semibold">{n.message}</p>
                <p className="mt-1 text-xs text-slate-600">{new Date(n.timestamp).toLocaleTimeString()}</p>
              </li>)}
            </ul>}
        </div>
      )}
    </div>
  );
}
export default NotificationBell;
