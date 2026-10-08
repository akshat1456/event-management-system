import { useState } from "react";

function EventCard({
  title,
  description,
  date,
  location,
}) {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">

      {/* Event Title */}
      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-3 leading-6 text-slate-600">
        {description}
      </p>

      {/* Event Information */}
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">

        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">
            Date:
          </span>{" "}
          {date}
        </p>

        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">
            Location:
          </span>{" "}
          {location}
        </p>

      </div>

      {/* Registration Button / Status */}
      <div className="mt-auto pt-6">

        {registered ? (
          <div className="rounded-lg bg-green-50 px-4 py-3 text-center">
            <p className="font-semibold text-green-700">
              Successfully Registered!
            </p>
          </div>
        ) : (
          <button
            onClick={() => setRegistered(true)}
            className="w-full rounded-lg bg-blue-600 px-4 py-3
                       font-semibold text-white
                       transition hover:bg-blue-700
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        )}

      </div>

    </div>
  );
}

export default EventCard;