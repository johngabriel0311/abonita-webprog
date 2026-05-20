import { Outlet, useLocation } from "react-router-dom";

import authorization from "../assets/images/authorization.png";

import signin from "../assets/images/signin.png";

import signup from "../assets/images/signup.png";

const AuthLayout = () => {
  const location = useLocation();

  const isSignUp = location.pathname.includes("signup");

  const authBg = isSignUp ? signup : signin;

  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr] items-stretch">
        <div className="relative hidden min-h-screen w-full lg:block">
          <img
            src={authorization}
            alt="authorization"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <main className="relative flex min-h-screen items-center px-6 py-10 sm:px-10 lg:px-16 overflow-hidden">
          <img
            src={authBg}
            alt="auth background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative z-10 mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
