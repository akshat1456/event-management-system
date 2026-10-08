function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="bg-slate-900 px-6 py-24 text-center text-white">

        <div className="mx-auto max-w-4xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            EventHub
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Discover Amazing Events
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Find exciting events, connect with people, and
            register for experiences that interest you.
          </p>

          <button
            className="mt-8 rounded-lg bg-blue-600 px-7 py-3
                       font-semibold text-white shadow-sm
                       transition hover:bg-blue-700"
          >
            Explore Events
          </button>

        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white px-6 py-20 text-center">

        <div className="mx-auto max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Explore
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Find Your Next Experience
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Explore technology workshops, conferences,
            festivals, and other exciting events happening
            near you.
          </p>

        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 px-6 py-16">

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Discover
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Find technology events, workshops, conferences,
              and other experiences in one place.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Register
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Choose the events you are interested in and
              register with a simple process.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Experience
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Keep track of your registrations and participate
              in experiences that interest you.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;