import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
        404
      </h1>

      <p className="mt-4 text-base sm:text-lg text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-black px-6 py-2 text-white text-sm sm:text-base hover:bg-gray-800 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
