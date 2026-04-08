const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-10 text-center">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-center items-center">
        <p className="text-sm text-center">
          © 2026 Hardwarena and all related logos, characters, names, and
          distinctive likenesses thereof are exclusive property of Hardwarena.
          All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0"></div>
      </div>
      <img
        src="/src/assets/images/logo.png"
        alt="logo"
        className="h-24 w-auto mt-4 md:mt-0 mb-8 mx-auto block"
      />
    </footer>
  );
};

export default Footer;
