import Button from "../../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-65 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="src/assets/images/game.png"
                alt="Game"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              LEARN THE BASICS
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              There is a great deal to learn about Hardwarena, so we’ll begin
              with the fundamentals. Review the guide below to gain a clear
              overview of its most widely used mode.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Gameplay</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Personalization Components
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Colors
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Expressions
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Builds
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">27</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Badges
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Profile Customization
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Avatar building and details section
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Edit Color
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Allows the player to change the color of their robot
                  character.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Change Expression
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  There are many fun expressions to pick from to make the
                  character look unique.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Choose Build
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Pick between different types of build to find the one that
                  suits your style.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Display Badges
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Showcase your achievements and milestones.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Modifying Capabilities
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src="src/assets/images/color.png"
                  alt="Color"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src="src/assets/images/face.png"
                  alt="Face"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src="src/assets/images/build.png"
                  alt="Build"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src="src/assets/images/badges.png"
                  alt="Badges"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
