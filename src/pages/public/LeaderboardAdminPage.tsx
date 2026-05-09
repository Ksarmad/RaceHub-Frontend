import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../../api/axios";

import AppShell from "../../components/layout/AppShell";

type RegistrationRow = {
  id: string;
  name: string;
  phone: string;
  assignment?: {
    timeslot: {
      slotTime: string;
    };
  };
};

type LeaderboardRow = {
  registrationId: string;
  finishTime: string;
  finishTimeMs: number;
  updatedAt: string;
  name: string;
  phone: string;
};

function LeaderboardAdminPage() {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [finishTime, setFinishTime] = useState<string>("");

  const fetchAll = async () => {
    try {
      setLoading(true);

      const regRes = await api.get("/admin/registrations");
      setRegistrations(regRes.data.data || []);

      const lbRes = await api.get("/public/leaderboard");
      setLeaderboard(lbRes.data.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = async () => {
    if (!selectedUserId) {
      toast.error("Select a user");
      return;
    }

    if (!finishTime.trim()) {
      toast.error("Enter finish time");
      return;
    }

    try {
      await api.patch("/admin/leaderboard/finish-time", {
        registrationId: selectedUserId,
        finishTime,
      });
      toast.success("Finish time saved");
      setFinishTime("");
      await fetchAll();
    } catch (e: any) {
      const message =
        e?.response?.data?.message ||
        e?.response?.data?.errors?.[0]?.message ||
        "Save failed";
      toast.error(message);
    }
  };

  return (
    <AppShell active="admin">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black">Leaderboard Admin</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Enter each racer finish time (seconds like 75.32 or MM:SS.ms like 01:15.4).
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-zinc-400">Loading...</div>
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl border border-red-500/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="text-lg font-bold">Set Finish Time</div>
                <div className="mt-4 space-y-3">
                  <label className="text-xs font-semibold text-zinc-400">User</label>
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full rounded-xl border border-red-500/20 bg-black/40 px-4 py-3 text-white outline-none focus:border-red-500"
                  >
                    <option value="">Select registered user...</option>
                    {registrations.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.phone})
                      </option>
                    ))}
                  </select>

                  <label className="text-xs font-semibold text-zinc-400">Finish time</label>
                  <input
                    value={finishTime}
                    onChange={(e) => setFinishTime(e.target.value)}
                    placeholder="e.g. 75.32 or 01:15.4"
                    className="w-full rounded-xl border border-red-500/20 bg-black/40 px-4 py-3 text-white outline-none focus:border-red-500"
                  />

                  <button
                    onClick={onSave}
                    className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                  >
                    Save Time
                  </button>

                  <div className="text-xs text-zinc-500">
                    Saved times appear immediately on the public leaderboard.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 rounded-3xl border border-red-500/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold">Current Leaderboard</div>
                    <div className="mt-1 text-xs text-zinc-400">
                      Sorted by best (lowest) finish time.
                    </div>
                  </div>
                  <button
                    onClick={fetchAll}
                    className="rounded-xl border border-red-500/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Refresh
                  </button>
                </div>

                <div className="mt-4 overflow-x-auto">
                  {leaderboard.length === 0 ? (
                    <div className="text-sm text-zinc-400">No results yet.</div>
                  ) : (
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
                          <tr key={row.registrationId} className="border-t border-white/5 text-sm text-zinc-200">
                            <td className="px-4 py-4 font-semibold text-white">{idx + 1}</td>
                            <td className="px-4 py-4">
                              <div className="font-semibold">{row.name}</div>
                              <div className="text-xs text-zinc-500">{row.phone}</div>
                            </td>
                            <td className="px-4 py-4 font-semibold">{row.finishTime}</td>
                            <td className="px-4 py-4 text-xs text-zinc-500">
                              {new Date(row.updatedAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

export default LeaderboardAdminPage;

