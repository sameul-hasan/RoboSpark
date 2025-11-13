// src/pages/dashboard/ShowAllTeam.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

type Member = { name?: string; email?: string; phone?: string };
type Team = {
  id: string;
  teamName?: string;
  institution?: string;
  competition?: string;
  leaderName?: string;
  leaderEmail?: string;
  leaderPhone?: string;
  members?: Member[];
  paymentMethod?: string;
  senderNumber?: string;
  transactionId?: string;
  fees?: { total?: number; base?: number; extraFee?: number; extraMembers?: number };
  paymentAccepted?: boolean;
  registeredAt?: any;
  [k: string]: any;
};

const competitions = [
  "Drone Challenge",
  "Line Following Robot (LFR)",
  "Techathon",
  "Robot Soccer",
  "Cosmo Cleanse",
];

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Fetch teams
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "registrations"));
      const list: Team[] = [];
      snap.forEach((d: QueryDocumentSnapshot<DocumentData>) => {
        list.push({ id: d.id, ...(d.data() as any) });
      });
      // sort by registeredAt desc if available
      list.sort((a, b) => {
        const ta = a.registeredAt?.seconds ?? 0;
        const tb = b.registeredAt?.seconds ?? 0;
        return tb - ta;
      });
      setTeams(list);
      setFilteredTeams(list);
    } catch (err) {
      console.error("fetchTeams error:", err);
      Swal.fire("Error", "Failed to load teams.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Search + filter
  useEffect(() => {
    let results = teams;
    if (search.trim()) {
      results = results.filter((t) =>
        (t.teamName ?? "").toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      results = results.filter((t) => t.competition === category);
    }
    setFilteredTeams(results);
  }, [search, category, teams]);

  // Mark as paid
  const markPaymentAccepted = async (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;
    const result = await Swal.fire({
      title: "Mark payment as accepted?",
      text: `${team.teamName} — mark paymentAccepted = true?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, mark paid",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await updateDoc(doc(db, "registrations", teamId), { paymentAccepted: true });
        setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, paymentAccepted: true } : t)));
        Swal.fire("Saved", "Payment marked as accepted.", "success");
      } catch (err) {
        console.error("markPaymentAccepted error:", err);
        Swal.fire("Error", "Failed to update payment status.", "error");
      }
    }
  };

  // Delete team
  const handleDelete = async (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;
    const confirmed = await Swal.fire({
      title: "Delete registration?",
      html: `<strong>${team.teamName}</strong><br/>This will permanently delete the registration.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (!confirmed.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "registrations", teamId));
      setTeams((prev) => prev.filter((t) => t.id !== teamId));
      setFilteredTeams((prev) => prev.filter((t) => t.id !== teamId));
      Swal.fire("Deleted", "Registration removed.", "success");
    } catch (err) {
      console.error("delete error:", err);
      Swal.fire("Error", "Could not delete registration.", "error");
    }
  };

  // Open edit modal
  const openEdit = (team: Team) => {
    // deep copy to avoid accidental live edits
    const copy = JSON.parse(JSON.stringify(team)) as Team;
    // ensure members array exists
    copy.members = copy.members ?? [];
    setEditingTeam(copy);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setEditingTeam(null);
  };

  // Edit helpers
  const updateEditingField = (key: string, value: any) => {
    setEditingTeam((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateEditingMember = (index: number, field: keyof Member, value: string) => {
    setEditingTeam((prev) => {
      if (!prev) return prev;
      const members = [...(prev.members ?? [])];
      members[index] = { ...(members[index] ?? {}), [field]: value };
      return { ...prev, members };
    });
  };

  const addEditingMember = () => {
    setEditingTeam((prev) => {
      if (!prev) return prev;
      const members = [...(prev.members ?? [])];
      if (members.length >= 5) {
        Swal.fire("Limit", "Max 5 additional members (leader + 5 = 6 total).", "info");
        return prev;
      }
      members.push({ name: "", email: "", phone: "" });
      return { ...prev, members };
    });
  };

  const removeEditingMember = (index: number) => {
    setEditingTeam((prev) => {
      if (!prev) return prev;
      const members = (prev.members ?? []).filter((_, i) => i !== index);
      return { ...prev, members };
    });
  };

  // Save edits
  const saveEdit = async () => {
    if (!editingTeam) return;
    // basic validation
    if (!editingTeam.teamName || !editingTeam.leaderName || !editingTeam.leaderEmail) {
      Swal.fire("Missing", "Please fill Team name, Leader name and Leader email.", "warning");
      return;
    }

    setSavingEdit(true);
    try {
      // Prepare cleaned members (remove blank names)
      const cleanedMembers = (editingTeam.members ?? []).filter((m) => (m.name ?? "").trim() !== "");
      const payload: any = {
        teamName: editingTeam.teamName,
        institution: editingTeam.institution ?? "",
        competition: editingTeam.competition ?? "",
        leaderName: editingTeam.leaderName ?? "",
        leaderEmail: editingTeam.leaderEmail ?? "",
        leaderPhone: editingTeam.leaderPhone ?? "",
        members: cleanedMembers,
        paymentMethod: editingTeam.paymentMethod ?? "",
        senderNumber: editingTeam.senderNumber ?? "",
        transactionId: editingTeam.transactionId ?? "",
        fees: editingTeam.fees ?? null,
        paymentAccepted: !!editingTeam.paymentAccepted,
      };

      await updateDoc(doc(db, "registrations", editingTeam.id), payload);

      // Update local UI
      setTeams((prev) => prev.map((t) => (t.id === editingTeam.id ? { ...t, ...payload } : t)));
      setFilteredTeams((prev) => prev.map((t) => (t.id === editingTeam.id ? { ...t, ...payload } : t)));

      Swal.fire("Saved", "Registration updated successfully.", "success");
      closeEdit();
    } catch (err) {
      console.error("saveEdit error:", err);
      Swal.fire("Error", "Failed to save changes.", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 pb-12 bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
      {/* header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-['Orbitron'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Registered Teams
        </h1>
        <p className="text-cyan-300 mt-2">Manage registrations — search, edit, delete & accept payments</p>
      </div>

      {/* search & filters */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by team name..."
          className="px-4 py-3 rounded-xl bg-gray-800/70 border border-cyan-600/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gray-800/70 border border-cyan-600/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All Competitions</option>
          {competitions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
            className="px-4 py-3 bg-cyan-600 text-black rounded-xl font-semibold"
          >
            Reset
          </button>
          <button
            onClick={fetchTeams}
            className="px-4 py-3 bg-indigo-700 rounded-xl hover:bg-indigo-600"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* content */}
      {loading ? (
        <div className="text-center text-cyan-400 animate-pulse">Loading teams...</div>
      ) : filteredTeams.length === 0 ? (
        <div className="text-center text-gray-400">No teams found.</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-gray-900/80 border border-cyan-600/30 rounded-2xl p-5 shadow-lg flex flex-col"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h2 className="text-cyan-300 text-xl font-bold">{team.teamName}</h2>
                  <p className="text-sm text-gray-300">{team.institution}</p>
                  <p className="mt-2 text-sm text-indigo-200"><strong>Competition:</strong> {team.competition}</p>
                </div>

                <div className="text-right">
                  <p className={`px-3 py-1 rounded-full text-xs font-semibold ${team.paymentAccepted ? "bg-green-700 text-green-100" : "bg-yellow-800 text-yellow-100"}`}>
                    {team.paymentAccepted ? "Paid" : "Pending"}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => openEdit(team)}
                      className="px-3 py-1 bg-indigo-600 rounded-md text-sm hover:bg-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* leader */}
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-cyan-700/20">
                <h3 className="text-sm font-semibold text-cyan-300">Team Leader</h3>
                <p className="text-gray-200">👤 {team.leaderName}</p>
                <p className="text-gray-300">✉ {team.leaderEmail}</p>
                <p className="text-gray-300">📞 {team.leaderPhone}</p>
              </div>

              {/* members */}
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-blue-300">Members ({team.members?.length ?? 0})</h4>
                {team.members && team.members.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {team.members.map((m: Member, i: number) => (
                      <li key={i} className="bg-gray-800/40 p-3 rounded-md border border-gray-700 text-gray-200">
                        <div className="text-sm font-semibold text-cyan-300">Member {i + 2}</div>
                        <div className="text-sm">👤 {m.name || "—"}</div>
                        <div className="text-xs text-gray-300">✉ {m.email || "—"}</div>
                        <div className="text-xs text-gray-300">📞 {m.phone || "—"}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 mt-2">No members added.</p>
                )}
              </div>

              {/* payment info */}
              <div className="mt-4 p-3 bg-gray-800/40 rounded-lg border border-indigo-700/20">
                <h4 className="text-sm font-semibold text-indigo-300">Payment</h4>
                <p className="text-sm">Method: {team.paymentMethod || "—"}</p>
                <p className="text-sm">Sender: {team.senderNumber || "—"}</p>
                <p className="text-sm">Txn ID: {team.transactionId || "—"}</p>
                {team.fees?.total && (
                  <p className="mt-2 text-green-300 font-bold">Amount: {team.fees.total} BDT</p>
                )}

                {!team.paymentAccepted ? (
                  <button
                    onClick={() => markPaymentAccepted(team.id)}
                    className="mt-3 w-full py-2 bg-green-600 text-black rounded-md font-semibold hover:bg-green-500"
                  >
                    Mark as Paid
                  </button>
                ) : (
                  <div className="mt-3 text-sm text-green-200 font-semibold bg-green-700/10 p-2 rounded-md text-center">
                    ✔ Payment accepted
                  </div>
                )}
              </div>

              <div className="mt-3 text-xs text-gray-400">
                Registered:{" "}
                {team.registeredAt?.seconds
                  ? new Date(team.registeredAt.seconds * 1000).toLocaleString()
                  : "—"}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditing && editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              // confirm close
              Swal.fire({
                title: "Discard changes?",
                text: "Any unsaved changes will be lost.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Discard",
                cancelButtonText: "Keep editing",
              }).then((r) => {
                if (r.isConfirmed) closeEdit();
              });
            }}
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative z-60 w-full max-w-3xl bg-gray-900/95 rounded-2xl p-6 md:p-8 shadow-2xl border border-cyan-700/30 overflow-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-300">Edit Registration</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={closeEdit}
                  className="px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700"
                >
                  Close
                </button>
                <button
                  onClick={saveEdit}
                  disabled={savingEdit}
                  className="px-4 py-2 bg-cyan-500 text-black rounded-md font-semibold hover:bg-cyan-400 disabled:opacity-60"
                >
                  {savingEdit ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            {/* form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-cyan-300 font-semibold">Team Name</label>
                <input
                  value={editingTeam.teamName ?? ""}
                  onChange={(e) => updateEditingField("teamName", e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-300 font-semibold">Institution</label>
                <input
                  value={editingTeam.institution ?? ""}
                  onChange={(e) => updateEditingField("institution", e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-300 font-semibold">Competition</label>
                <select
                  value={editingTeam.competition ?? ""}
                  onChange={(e) => updateEditingField("competition", e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                >
                  <option value="">Select</option>
                  {competitions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">Leader Name</label>
                  <input
                    value={editingTeam.leaderName ?? ""}
                    onChange={(e) => updateEditingField("leaderName", e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">Leader Email</label>
                  <input
                    value={editingTeam.leaderEmail ?? ""}
                    onChange={(e) => updateEditingField("leaderEmail", e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">Leader Phone</label>
                  <input
                    value={editingTeam.leaderPhone ?? ""}
                    onChange={(e) => updateEditingField("leaderPhone", e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">Payment Method</label>
                  <select
                    value={editingTeam.paymentMethod ?? ""}
                    onChange={(e) => updateEditingField("paymentMethod", e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  >
                    <option value="">Select</option>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">Sender Number</label>
                  <input
                    value={editingTeam.senderNumber ?? ""}
                    onChange={(e) => updateEditingField("senderNumber", e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                    placeholder="e.g. 017XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">Transaction ID</label>
                  <input
                    value={editingTeam.transactionId ?? ""}
                    onChange={(e) => updateEditingField("transactionId", e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                    placeholder="e.g. 1234567890"
                  />
                </div>
              </div>

              {/* members editor */}
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-cyan-300">Members</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={addEditingMember}
                      className="px-3 py-1 bg-green-600 text-black rounded-md"
                    >
                      + Add
                    </button>
                    <div className="text-xs text-gray-400">Max 5 additional members</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {(editingTeam.members ?? []).map((m, idx) => (
                    <div key={idx} className="bg-gray-800/50 p-3 rounded-md border border-gray-700">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 grid md:grid-cols-3 gap-2">
                          <input
                            value={m?.name ?? ""}
                            onChange={(e) => updateEditingMember(idx, "name", e.target.value)}
                            placeholder="Full name"
                            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700"
                          />
                          <input
                            value={m?.email ?? ""}
                            onChange={(e) => updateEditingMember(idx, "email", e.target.value)}
                            placeholder="Email (optional)"
                            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700"
                          />
                          <input
                            value={m?.phone ?? ""}
                            onChange={(e) => updateEditingMember(idx, "phone", e.target.value)}
                            placeholder="Phone (optional)"
                            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700"
                          />
                        </div>

                        <div className="flex flex-col gap-2 ml-2">
                          <button
                            onClick={() => removeEditingMember(idx)}
                            className="px-2 py-1 bg-red-600 rounded-md text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* payment accepted toggle */}
              <div className="pt-4 border-t border-gray-700">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!editingTeam.paymentAccepted}
                    onChange={(e) => updateEditingField("paymentAccepted", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-200">Payment accepted</span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
