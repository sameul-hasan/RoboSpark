// src/pages/dashboard/ShowAllTeam.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

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

/**
 * ShowAllTeam.tsx
 * Single-file, production-ready admin screen for:
 * - viewing teams
 * - search & filter
 * - edit modal (full fields, add/remove members)
 * - mark/unmark payment
 * - delete registration
 * - export PDF (detailed members, adjusted fonts)
 * - export Excel (dynamic member columns)
 *
 * Notes:
 * - Uses jsPDF + jspdf-autotable (ESM). We call (doc as any).autoTable(...) to avoid TypeScript signature issues.
 * - Uses XLSX (SheetJS) to create Excel file.
 * - Firestore calls are basic (updateDoc/deleteDoc/getDocs) — ensure your Firestore security rules allow the operations from your client or perform these server-side if needed.
 */

/* ------------------------------- Types ------------------------------- */
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

  // NEW FIELDS FOR COUPON
  couponCode?: string;

  fees?: {
    base?: number;
    extraFee?: number;
    extraMembers?: number;

    subtotal?: number; // NEW
    discountPercent?: number; // NEW
    discountAmount?: number; // NEW

    total?: number;
  };

  paymentAccepted?: boolean;
  registeredAt?: any;

  [k: string]: any;
};

/* ---------------------------- Competitions --------------------------- */
const competitions = [
  "Drone Challenge",
  "Line Following Robot (LFR)",
  "Techathon",
  "Robot Soccer",
  "Cosmo Cleanse",
];

/* ------------------------------ Component ---------------------------- */
export default function TeamsPage(): JSX.Element {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  /* ------------------------------ Fetching ------------------------------ */
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "registrations"));
      const list: Team[] = [];
      snap.forEach((d: QueryDocumentSnapshot<DocumentData>) => {
        list.push({ id: d.id, ...(d.data() as any) });
      });

      list.sort((a, b) => {
        const ta = a.registeredAt?.seconds ?? 0;
        const tb = b.registeredAt?.seconds ?? 0;
        return tb - ta;
      });

      setTeams(list);
      setFilteredTeams(list);
    } catch (err) {
      console.error("fetchTeams error:", err);
      Swal.fire("Error", "Failed to load teams. Check console.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  /* --------------------------- Search / Filter --------------------------- */
  useEffect(() => {
    let results = teams;
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (t) =>
          (t.teamName ?? "").toLowerCase().includes(q) ||
          (t.leaderName ?? "").toLowerCase().includes(q) ||
          (t.leaderEmail ?? "").toLowerCase().includes(q) ||
          (t.institution ?? "").toLowerCase().includes(q)
      );
    }
    if (category) {
      results = results.filter((t) => t.competition === category);
    }
    setFilteredTeams(results);
  }, [search, category, teams]);

  /* ------------------------------ Export PDF ----------------------------- */
  const exportPDF = () => {
    try {
      const doc = new jsPDF("p", "pt", "a4");

      doc.setFontSize(16);
      doc.text("RoboSpark 2025 — Full Team Report", 40, 40);

      const columns = [
        "Team",
        "Competition",
        "Leader",
        "Members",
        "Payment",
        "Amount",
        "Registered",
      ];

      const rows = filteredTeams.map((t) => {
        const membersText = (t.members ?? [])
          .map(
            (m, i) =>
              `${i + 1}. ${m.name || "—"} (${m.email || "—"}, ${
                m.phone || "—"
              })`
          )
          .join("\n");

        return [
          t.teamName,
          t.competition,
          `${t.leaderName}\n${t.leaderEmail}\n${t.leaderPhone}`,
          membersText || "—",
          t.paymentAccepted ? "Paid" : "Pending",
          t.fees?.total ? `${t.fees.total} BDT` : "—",
          t.registeredAt?.seconds
            ? new Date(t.registeredAt.seconds * 1000).toLocaleString()
            : "—",
        ];
      });

      autoTable(doc, {
        head: [columns],
        body: rows,
        startY: 70,
        styles: {
          fontSize: 7,
          cellPadding: 4,
          overflow: "linebreak",
        },
        columnStyles: {
          2: { cellWidth: 120 },
          3: { cellWidth: 160 },
        },
      });

      doc.save("robospark_report.pdf");
    } catch (err) {
      console.error("exportPDF error:", err);
    }
  };

  /* ------------------------------ Export Excel --------------------------- */
  const exportExcel = () => {
    try {
      // Build rows with dynamic member columns (Member1..Member5)
      const rows = filteredTeams.map((t) => {
        const row: any = {
          "Team Name": t.teamName || "—",
          Competition: t.competition || "—",
          "Leader Name": t.leaderName || "—",
          "Leader Email": t.leaderEmail || "—",
          "Leader Phone": t.leaderPhone || "—",
          "Payment Status": t.paymentAccepted ? "Paid" : "Pending",
          "Payment Method": t.paymentMethod || "—",
          "Sender Number": t.senderNumber || "—",
          "Transaction ID": t.transactionId || "—",
          Amount: t.fees?.total ?? "—",
          "Members Count": t.members?.length ?? 0,
          "Registered At": t.registeredAt?.seconds
            ? new Date(t.registeredAt.seconds * 1000).toLocaleString()
            : "—",
        };

        // Add up to 5 members (members array stores additional members beyond leader)
        (t.members ?? []).forEach((m, i) => {
          row[`Member ${i + 2} Name`] = m.name || "—";
          row[`Member ${i + 2} Email`] = m.email || "—";
          row[`Member ${i + 2} Phone`] = m.phone || "—";
        });

        return row;
      });

      const worksheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
      const filename = `robospark_teams_full_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, filename);
    } catch (err) {
      console.error("exportExcel error:", err);
      Swal.fire("Error", "Unable to generate Excel. Check console.", "error");
    }
  };
  const API_URL = import.meta.env.VITE_API_URL;

  /* ------------------------------ Edit Modal ----------------------------- */
  const openEdit = (team: Team) => {
    const copy: Team = JSON.parse(JSON.stringify(team));
    // Ensure members array exists and limit to max 5 additional members
    copy.members = copy.members ?? [];
    setEditingTeam(copy);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setEditingTeam(null);
  };

  const updateEditingField = (key: string, value: any) => {
    setEditingTeam((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateEditingMember = (
    index: number,
    field: keyof Member,
    value: string
  ) => {
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
        Swal.fire(
          "Limit",
          "Max 5 additional members allowed (leader + 5 = 6 total).",
          "info"
        );
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

  const saveEdit = async () => {
    if (!editingTeam) return;

    // Minimal validation
    if (
      !editingTeam.teamName ||
      !editingTeam.leaderName ||
      !editingTeam.leaderEmail
    ) {
      Swal.fire(
        "Missing fields",
        "Team name, leader name and leader email are required.",
        "warning"
      );
      return;
    }

    setSavingEdit(true);
    try {
      const cleanedMembers = (editingTeam.members ?? []).filter(
        (m) => (m.name ?? "").trim() !== ""
      );
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

      // update local list
      setTeams((prev) =>
        prev.map((t) => (t.id === editingTeam.id ? { ...t, ...payload } : t))
      );
      setFilteredTeams((prev) =>
        prev.map((t) => (t.id === editingTeam.id ? { ...t, ...payload } : t))
      );

      Swal.fire("Saved", "Registration updated successfully.", "success");
      closeEdit();
    } catch (err) {
      console.error("saveEdit error:", err);
      Swal.fire("Error", "Failed to save changes. Check console.", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  /* ------------------------------ Delete ------------------------------- */
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

  /* --------------------------- Toggle Payment -------------------------- */
  const togglePayment = async (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;

    const label = team.paymentAccepted
      ? "Unmark payment?"
      : "Mark payment as accepted?";

    const confirmed = await Swal.fire({
      title: label,
      text: `${team.teamName}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: team.paymentAccepted ? "Unmark" : "Mark Paid",
    });

    if (!confirmed.isConfirmed) return;

    try {
      const newStatus = !team.paymentAccepted;

      // 1️⃣ Update Firestore
      await updateDoc(doc(db, "registrations", teamId), {
        paymentAccepted: newStatus,
      });

      // update local state
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId ? { ...t, paymentAccepted: newStatus } : t
        )
      );
      setFilteredTeams((prev) =>
        prev.map((t) =>
          t.id === teamId ? { ...t, paymentAccepted: newStatus } : t
        )
      );

      // 2️⃣ SEND EMAIL ONLY IF MARKED TRUE
      if (newStatus === true) {
        try {
          await fetch(`${API_URL}/api/payment-mail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(team),
          });

          Swal.fire("Payment Confirmed", "Email sent successfully!", "success");
        } catch (emailErr) {
          console.error("Email error:", emailErr);
          Swal.fire(
            "Warning",
            "Payment marked, but email could not be sent.",
            "warning"
          );
        }
      } else {
        Swal.fire("Updated", "Payment unmarked.", "success");
      }
    } catch (err) {
      console.error("togglePayment error:", err);
      Swal.fire("Error", "Failed to update payment. Check console.", "error");
    }
  };

  /* ------------------------------- Render ------------------------------- */
  return (
    <div className="min-h-screen pt-28 px-4 pb-12 bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-['Orbitron'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Registered Teams
        </h1>
        <p className="text-cyan-300 mt-2">
          Manage registrations — search, edit, delete, mark payment & export
        </p>
      </div>

      {/* Filters & actions */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by team / leader / institution..."
          className="px-4 py-3 rounded-xl bg-gray-800/70 border border-cyan-600/30 focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gray-800/70 border border-cyan-600/30"
        >
          <option value="">All Competitions</option>
          {competitions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
            className="px-4 py-3 bg-cyan-600 rounded-xl text-black font-semibold"
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

        <div className="flex gap-2">
          <button
            onClick={exportPDF}
            className="px-4 py-3 bg-red-600 rounded-xl hover:bg-red-500 w-full font-semibold"
          >
            Export PDF
          </button>
          <button
            onClick={exportExcel}
            className="px-4 py-3 bg-green-600 rounded-xl hover:bg-green-500 w-full font-semibold"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <div className="text-center text-cyan-400 animate-pulse">
          Loading teams...
        </div>
      ) : filteredTeams.length === 0 ? (
        <div className="text-center text-gray-400">No teams found.</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="p-5 rounded-2xl border border-cyan-600/30 bg-gray-900/80"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold text-cyan-300">
                    {team.teamName}
                  </h2>
                  <p className="text-sm text-gray-300">{team.institution}</p>
                </div>

                <div>
                  <p
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      team.paymentAccepted ? "bg-green-600" : "bg-yellow-700"
                    }`}
                  >
                    {team.paymentAccepted ? "Paid" : "Pending"}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => openEdit(team)}
                      className="px-3 py-1 bg-indigo-600 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="px-3 py-1 bg-red-600 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Leader */}
              <div className="mt-3 p-3 border border-gray-700 rounded-lg bg-gray-800/50">
                <h3 className="text-sm font-semibold text-cyan-300">Leader</h3>
                <p>👤 {team.leaderName || "—"}</p>
                <p className="text-xs">✉ {team.leaderEmail || "—"}</p>
                <p className="text-xs">📞 {team.leaderPhone || "—"}</p>
              </div>

              {/* Members */}
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-blue-300">
                  Members ({team.members?.length ?? 0})
                </h4>
                {(team.members ?? []).map((m, i) => (
                  <div key={i} className="mt-2 bg-gray-800/40 p-2 rounded-md">
                    <p className="text-sm">👤 {m.name || "—"}</p>
                    <p className="text-xs">✉ {m.email || "—"}</p>
                    <p className="text-xs">📞 {m.phone || "—"}</p>
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="mt-3 p-3 bg-gray-800/40 border border-indigo-600/30 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-300">
                  Payment Info
                </h4>
                <p>Method: {team.paymentMethod || "—"}</p>
                <p>Sender: {team.senderNumber || "—"}</p>
                <p>Txn: {team.transactionId || "—"}</p>

                {/* Coupon Info */}
                {team.fees?.discountPercent > 0 && (
                  <div className="mt-2 p-2 bg-pink-600/20 border border-pink-500 rounded-md">
                    <p className="text-pink-300 text-sm font-semibold">
                      Coupon Applied
                    </p>
                    <p className="text-pink-200 text-xs">
                      Code: {team.couponCode || "—"}
                    </p>
                    <p className="text-pink-200 text-xs">
                      Discount: {team.fees.discountPercent}%
                    </p>
                    <p className="text-pink-200 text-xs">
                      Discount Amount: {team.fees.discountAmount} BDT
                    </p>
                  </div>
                )}

                {/* Fee Breakdown */}
                {team.fees?.subtotal !== undefined && (
                  <p className="mt-1 text-gray-300 text-sm">
                    Subtotal: {team.fees.subtotal} BDT
                  </p>
                )}

                {team.fees?.total !== undefined && (
                  <p className="mt-1 text-green-300 font-bold">
                    Total Payable: {team.fees.total} BDT
                  </p>
                )}

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => togglePayment(team.id)}
                    className="py-2 bg-green-600 rounded-md text-black font-bold"
                  >
                    {team.paymentAccepted ? "Unmark Paid" : "Mark Paid"}
                  </button>
                  <button
                    onClick={() => openEdit(team)}
                    className="py-2 bg-indigo-600 rounded-md"
                  >
                    Edit Details
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {team.registeredAt?.seconds
                  ? new Date(team.registeredAt.seconds * 1000).toLocaleString()
                  : "—"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ------------ EDIT MODAL ------------ */}
      {isEditing && editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() =>
              Swal.fire({
                title: "Discard changes?",
                text: "Any unsaved changes will be lost.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Discard",
                cancelButtonText: "Keep editing",
              }).then((r) => {
                if (r.isConfirmed) closeEdit();
              })
            }
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-60 w-full max-w-3xl bg-gray-900/95 rounded-2xl p-6 md:p-8 shadow-2xl border border-cyan-700/30 overflow-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-300">
                Edit Registration
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => closeEdit()}
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
                <label className="block text-sm text-cyan-300 font-semibold">
                  Team Name
                </label>
                <input
                  value={editingTeam.teamName ?? ""}
                  onChange={(e) =>
                    updateEditingField("teamName", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-300 font-semibold">
                  Institution
                </label>
                <input
                  value={editingTeam.institution ?? ""}
                  onChange={(e) =>
                    updateEditingField("institution", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-300 font-semibold">
                  Competition
                </label>
                <select
                  value={editingTeam.competition ?? ""}
                  onChange={(e) =>
                    updateEditingField("competition", e.target.value)
                  }
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
                  <label className="block text-sm text-cyan-300 font-semibold">
                    Leader Name
                  </label>
                  <input
                    value={editingTeam.leaderName ?? ""}
                    onChange={(e) =>
                      updateEditingField("leaderName", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">
                    Leader Email
                  </label>
                  <input
                    value={editingTeam.leaderEmail ?? ""}
                    onChange={(e) =>
                      updateEditingField("leaderEmail", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">
                    Leader Phone
                  </label>
                  <input
                    value={editingTeam.leaderPhone ?? ""}
                    onChange={(e) =>
                      updateEditingField("leaderPhone", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">
                    Payment Method
                  </label>
                  <select
                    value={editingTeam.paymentMethod ?? ""}
                    onChange={(e) =>
                      updateEditingField("paymentMethod", e.target.value)
                    }
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
                  <label className="block text-sm text-cyan-300 font-semibold">
                    Sender Number
                  </label>
                  <input
                    value={editingTeam.senderNumber ?? ""}
                    onChange={(e) =>
                      updateEditingField("senderNumber", e.target.value)
                    }
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-cyan-300 font-semibold">
                    Transaction ID
                  </label>
                  <input
                    value={editingTeam.transactionId ?? ""}
                    onChange={(e) =>
                      updateEditingField("transactionId", e.target.value)
                    }
                    placeholder="e.g. 1234567890"
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                </div>
              </div>

              {/* members editor */}
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-cyan-300">
                    Members
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={addEditingMember}
                      className="px-3 py-1 bg-green-600 text-black rounded-md"
                    >
                      + Add
                    </button>
                    <div className="text-xs text-gray-400">
                      Max 5 additional members (leader + 5 = 6)
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {(editingTeam.members ?? []).map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800/50 p-3 rounded-md border border-gray-700"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 grid md:grid-cols-3 gap-2">
                          <input
                            value={m?.name ?? ""}
                            onChange={(e) =>
                              updateEditingMember(idx, "name", e.target.value)
                            }
                            placeholder="Full name"
                            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700"
                          />
                          <input
                            value={m?.email ?? ""}
                            onChange={(e) =>
                              updateEditingMember(idx, "email", e.target.value)
                            }
                            placeholder="Email (optional)"
                            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700"
                          />
                          <input
                            value={m?.phone ?? ""}
                            onChange={(e) =>
                              updateEditingMember(idx, "phone", e.target.value)
                            }
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

              {/* payment toggle */}
              <div className="pt-4 border-t border-gray-700">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!editingTeam.paymentAccepted}
                    onChange={(e) =>
                      updateEditingField("paymentAccepted", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-200">
                    Payment accepted
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
