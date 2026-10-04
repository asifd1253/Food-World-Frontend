import { useRouteError, useNavigate } from "react-router";

const Error = () => {
  const err = useRouteError();
  const navigate = useNavigate();

  console.log(err);

  const status = err?.status || 500;
  const message = err?.statusText || err?.message || "Something went wrong.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-10">
        {/* Error Code */}
        <p className="text-7xl font-extrabold tracking-tight text-slate-200 sm:text-8xl">
          {status}
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Oops! Something went wrong
        </h1>

        {/* Error Message */}
        <p className="mt-3 text-base leading-6 text-slate-500">{message}</p>

        {/* Additional Message */}
        <p className="mt-2 text-sm text-slate-400">
          The page you are looking for might not exist or an unexpected error
          occurred.
        </p>

        {/* Go Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 cursor-pointer rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
        >
          Go Back Home
        </button>
      </div>
    </main>
  );
};

export default Error;
