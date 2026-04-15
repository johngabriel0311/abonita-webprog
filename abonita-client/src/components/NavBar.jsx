import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Gameplay", to: "/articles" },
  {
    label: "Sign In",
    to: "/auth/signin",
    hover: "hover:bg-[#253b80] hover:text-white",
  },
  {
    label: "Sign Up",
    to: "/auth/signup",
    hover: "hover:bg-[#cd45a1] hover:text-white",
  },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="space-y-0.5">
            <img
              src="/src/assets/images/logo.png"
              alt="logo"
              className="h-12 w-auto transition-transform duration-300 hover:scale-110"
            />
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300",
                  isActive
                    ? "bg-white text-black shadow-md"
                    : `text-zinc-400 ${
                        link.hover || "hover:text-white hover:bg-white/10"
                      }`,
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
