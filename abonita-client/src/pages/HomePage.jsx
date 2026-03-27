import Button from "../components/Button";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              ATOM-E-CITY
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              WELCOME TO HARDWARENA
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              HardWarena is an interactive gamified learning platform designed
              to teach computer hardware concepts through virtual simulations,
              missions, and challenges. It allows students to practice, learn,
              and track their progress in an engaging and accessible digital
              environment.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-65 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="src/assets/images/welcome.png"
                alt="Welcome"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Information Technology
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Developers
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">BSIT</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Program
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">INF237</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Section
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">05</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Members
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">3RD</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Year Level
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Game Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            What you're met with!
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src="src/assets/images/signup.png"
                alt="Feature"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Sign Up
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Make a new account for the first time.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src="src/assets/images/login.png"
                alt="Feature"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Log In</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Where returning players log in and new players register.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src="src/assets/images/play.png"
                alt="Feature"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Play</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              What to expect when inside the gamified learning application.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
