import { useEffect, useState } from "react";

import api from "../../api/axios";

import AppShell from "../../components/layout/AppShell";

type LeaderboardEntry = {
  registrationId: string;
  name: string;
  phone: string;
  finishTime: string;
  finishTimeMs: number;
  updatedAt: string;
};

function formatTime(ms: number) {
  const totalSeconds = ms / 1000;
  if (!Number.isFinite(totalSeconds)) return "-";

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const millis = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000);

  if (minutes > 0) {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${millis.toString().padStart(3, "0")}`;
  }

  // no minutes: show seconds.ms
  return `${seconds}.${millis.toString().padEnd(3, "0").slice(0, 3)}`;
}

function TournamentLandingPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/public/leaderboard");
      setLeaderboard(res.data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <AppShell active="register">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-red-500/20 bg-white/5 p-7 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,0,0.12)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-200 shadow-[0_0_30px_rgba(255,0,0,0.12)]">
                🏁 F1 Sim Racing Tournament
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                RaceHub Championship
              </h1>
              <p className="mt-3 text-sm md:text-base text-zinc-300">
                Register using the QR flow. Admin will assign your timeslot.
                After the race, results are published here on the leaderboard.
              </p>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Register Now
                </a>
                <button
                  type="button"
                  onClick={fetchLeaderboard}
                  className="inline-flex items-center justify-center rounded-xl border border-red-500/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Refresh Leaderboard
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniStat title="Admin assigns timeslots" desc="Based on availability." />
                <MiniStat title="Public leaderboard" desc="See times when published." />
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-red-500/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="text-lg font-bold">How it works</h2>
              <ol className="mt-4 space-y-3 text-sm text-zinc-300">
                <li className="rounded-2xl border border-white/5 bg-black/30 p-4">
                  <div className="font-semibold text-zinc-200">1) Register</div>
                  <div className="mt-1 text-xs text-zinc-400">Use the QR form and submit your details.</div>
                </li>
                <li className="rounded-2xl border border-white/5 bg-black/30 p-4">
                  <div className="font-semibold text-zinc-200">2) Get timeslot</div>
                  <div className="mt-1 text-xs text-zinc-400">Admin assigns an available slot.</div>
                </li>
                <li className="rounded-2xl border border-white/5 bg-black/30 p-4">
                  <div className="font-semibold text-zinc-200">3) Race & publish</div>
                  <div className="mt-1 text-xs text-zinc-400">Admin enters your finish time (F1 sim results).</div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-red-500/20 bg-white/5 p-7 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,0,0.10)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Leaderboard</h2>
              <p className="mt-2 text-sm text-zinc-400">Sorted by finish time (lower is better).</p>
            </div>
            <div className="rounded-full bg-red-600/15 px-4 py-2 text-xs font-semibold text-red-200">
              Public
            </div>
          </div>

          {loading ? (
            <div className="mt-6 text-zinc-400">Loading leaderboard...</div>
          ) : leaderboard.length === 0 ? (
            <div className="mt-6 text-zinc-400">No results published yet.</div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-zinc-500">
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Driver</th>
                    <th className="px-4 py-3">Finish Time</th>
                    <th className="px-4 py-3">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row, idx) => (
                    <tr
                      key={row.registrationId}
                      className="border-t border-white/5 text-sm text-zinc-200"
                    >
                      <td className="px-4 py-4 font-semibold text-white">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold">{row.name}</div>
                        <div className="text-xs text-zinc-500">{row.phone}</div>
                      </td>
                      <td className="px-4 py-4 font-semibold">
                        {row.finishTime || formatTime(row.finishTimeMs)}
                      </td>
                      <td className="px-4 py-4 text-xs text-zinc-500">
                        {new Date(row.updatedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function MiniStat({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/30 p-4">
      <div className="text-sm font-semibold text-zinc-200">{title}</div>
      <div className="mt-1 text-xs text-zinc-400">{desc}</div>
    </div>
  );
}

export default TournamentLandingPage;

