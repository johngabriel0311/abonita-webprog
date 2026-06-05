import Button from "../components/Button";
import bg404 from "../assets/images/404.png";
import kira from "../assets/images/kira.png";

function NotFoundPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-8 bg-[#253b80]"
      style={{
        backgroundImage: `url(${bg404})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-start max-w-md">
        <h1 className="text-9xl font-bold text-zinc-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-zinc-700 mb-3">
          Sorry, the page is not found
        </h2>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
          The link you are looking for doesn't exist
          <br />
          or another error occurred.
        </p>
        <Button to="/">Back Home</Button>
      </div>

      <div className="ml-16">
        <img src={kira} alt="404 Not Found" className="w-90" />
      </div>
    </div>
  );
}

export default NotFoundPage;
