import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, children, footerText, footerLink, footerLinkText }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">NexusFlow</h1>

        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
          <p className="text-sm text-slate-400 mb-6">{subtitle}</p>

          {children}

          <p className="text-sm text-slate-400 text-center mt-6">
            {footerText}{" "}
            <Link to={footerLink} className="text-blue-400 hover:underline">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}