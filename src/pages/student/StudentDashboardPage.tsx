import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function StudentDashboardPage() {
  const navigate = useNavigate();

  const copySupport = async () => {
    try {
      await navigator.clipboard.writeText(
        "support@racehub.example"
      );
      toast.success("Support email copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-200 shadow-[0_0_40px_rgba(255,0,0,0.10)]">
            Student Portal
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
            Live
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            Your Game Registration
          </h1>
          <p className="mt-2 text-sm text-zinc-300">
            Admin will assign your timeslot. You’ll be notified on WhatsApp.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/register")}
            className="rounded-xl border border-red-500/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Update Details
          </button>
          <button
            onClick={copySupport}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Contact Support
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-red-500/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Registration Status</h2>
            <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-300">
              Pending Timeslot
            </span>
          </div>

          <p className="mt-3 text-sm text-zinc-300">
            We’ve saved your details. Keep your WhatsApp number active.
          </p>

          <div className="mt-5 rounded-2xl border border-white/5 bg-black/30 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-600/15 text-red-300 shadow-[0_0_35px_rgba(255,0,0,0.18)]">
                ⏳
              </div>
              <div>
                <div className="text-sm font-semibold">What happens now?</div>
                <div className="mt-1 text-xs text-zinc-400">
                  You’ll receive your slot details via WhatsApp.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-red-500/10 bg-white/5 p-5 backdrop-blur-xl md:col-span-2">
          <h2 className="text-lg font-bold">How it works</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Step n="01" title="Scan & Register" desc="Fill your details and submit." />
            <Step n="02" title="Admin Assigns" desc="We’ll allocate an available timeslot." />
            <Step n="03" title="WhatsApp Confirmation" desc="You’ll receive your timeslot instantly." />
            <Step n="04" title="Show Up On Time" desc="Join at the venue and get ready." />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-red-500/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">Need to update anything?</h2>
            <p className="mt-2 text-sm text-zinc-300">
              If your phone/email changed, update it. (This page is UI-only.)
            </p>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="w-full rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 md:w-auto"
          >
            Go to Registration
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/30 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-red-600/15 text-red-300 font-black shadow-[0_0_30px_rgba(255,0,0,0.16)]">
          {n}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold">{title}</div>
          <div className="mt-1 text-xs text-zinc-400">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;

