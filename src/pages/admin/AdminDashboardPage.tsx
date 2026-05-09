import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import { authStorage } from "../../lib/auth";

import type { Registration } from "../../types/registration";
import type { Timeslot } from "../../types/registration";
import QRCodeSection from "./QRCodeSection";

import toast from "react-hot-toast";

function AdminDashboardPage() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);

  const [loading, setLoading] = useState(true);

  const [assigningId, setAssigningId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const handleLogout = () => {
    authStorage.removeToken();

    navigate("/admin/login");
  };

  const fetchTimeslots = async () => {
    try {
      const response = await api.get("/admin/timeslots/available");

      setTimeslots(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await api.get("/admin/registrations");

      setRegistrations(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchTimeslots();
  }, []);

  const handleAssign = async (userId: string, timeslotId: string) => {
    try {
      setAssigningId(userId);

      await api.patch("/admin/assign-timeslot", {
        userId,
        timeslotId,
      });

      toast.success("Timeslot assigned");

      fetchRegistrations();

      fetchTimeslots();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Assignment failed");
    } finally {
      setAssigningId(null);
    }
  };

  const filteredRegistrations = registrations.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const isAssigned = !!user.assignment;

    if (filter === "assigned") {
      return matchesSearch && isAssigned;
    }

    if (filter === "not_assigned") {
      return matchesSearch && !isAssigned;
    }

    return matchesSearch;
  });

  return (
    <div
      className="
        min-h-screen
        bg-black
        p-4
        text-white
        md:p-6
      "
    >
      {/* Header */}
      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-black
            "
          >
            Admin Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">Manage registrations</p>
        </div>

        <button
          onClick={handleLogout}
          className="
            rounded-xl
            bg-red-600
            px-5
            py-2
            font-medium
            transition-all

            hover:bg-red-500
          "
        >
          Logout
        </button>
      </div>
      <QRCodeSection />
      {/* Filters */}
      <div
        className="
          mb-6
          grid
          gap-4
          md:grid-cols-3
        "
      >
        <input
          type="text"
          placeholder="Search name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            rounded-xl
            border
            border-red-500/20
            bg-white/5
            px-4
            py-3
            text-white
            outline-none

            focus:border-red-500
          "
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
            rounded-xl
            border
            border-red-500/20
            bg-white/5
            px-4
            py-3
            text-white
            outline-none

            focus:border-red-500
          "
        >
          <option value="all">All</option>

          <option value="assigned">Assigned</option>

          <option value="not_assigned">Not Assigned</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-zinc-400">Loading registrations...</div>
      ) : (
        <div className="space-y-4">
          {filteredRegistrations.map((user) => (
            <div
              key={user.id}
              className="
                  rounded-2xl
                  border
                  border-red-500/10
                  bg-white/5
                  p-5
                  backdrop-blur-xl
                "
            >
              <div
                className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
              >
                <div>
                  <h2
                    className="
                        text-xl
                        font-bold
                      "
                  >
                    {user.name}
                  </h2>

                  <p className="mt-1 text-zinc-400">{user.email}</p>

                  <p className="text-zinc-400">{user.phone}</p>
                </div>

                <div
                  className="
    flex
    flex-col
    items-start
    gap-2
    md:items-end
  "
                >
                  {user.assignment ? (
                    <>
                      <span
                        className="
          rounded-full
          bg-green-500/20
          px-4
          py-2
          text-sm
          font-medium
          text-green-400
        "
                      >
                        Assigned
                      </span>

                      <p className="text-sm text-zinc-400">
                        Slot: {user.assignment.timeslot.slotTime}
                      </p>
                    </>
                  ) : (
                    <>
                      <span
                        className="
          rounded-full
          bg-yellow-500/20
          px-4
          py-2
          text-sm
          font-medium
          text-yellow-400
        "
                      >
                        Not Assigned
                      </span>

                      {/* Assign Dropdown */}
                      <select
                        disabled={assigningId === user.id}
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAssign(user.id, e.target.value);
                          }
                        }}
                        className="
          rounded-xl
          border
          border-red-500/20
          bg-black
          px-3
          py-2
          text-sm
          text-white
          outline-none
        "
                      >
                        <option value="">
                          {assigningId === user.id
                            ? "Assigning..."
                            : "Assign Slot"}
                        </option>

                        {timeslots.map((slot) => (
                          <option key={slot.id} value={slot.id}>
                            {slot.slotTime}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;
