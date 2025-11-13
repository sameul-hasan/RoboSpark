import React, { useEffect, useState } from "react";
import {
  Tag,
  Percent,
  Plus,
  Edit,
  Trash2,
  Search,
  Zap,
} from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

/* TYPES */
interface Coupon {
  id?: string;
  name: string;
  code: string;
  percentage: number;
  createdAt?: any;
}

/* Mobile Coupon Card */
const CouponCard: React.FC<{
  coupon: Coupon;
  onEdit: (c: Coupon) => void;
  onDelete: (c: Coupon) => void;
}> = ({ coupon, onEdit, onDelete }) => (
  <div className="bg-slate-800 p-5 rounded-xl shadow-lg border border-indigo-700/50 hover:border-indigo-500 transition duration-300">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-xl font-bold text-indigo-300 flex items-center">
        <Tag className="w-5 h-5 mr-2 text-indigo-400" />
        {coupon.name}
      </h3>
    </div>

    <p className="text-sm text-gray-400 mb-4 font-mono">
      Code: <span className="text-gray-200 font-semibold">{coupon.code}</span>
    </p>

    <div className="flex justify-between items-center border-t border-slate-700 pt-3">
      <div className="text-2xl font-extrabold text-white flex items-center">
        <Percent className="w-5 h-5 mr-2 text-indigo-400" />
        {coupon.percentage}%
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(coupon)}
          className="p-2 rounded-full text-gray-400 hover:text-indigo-400 hover:bg-slate-700 transition"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(coupon)}
          className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-slate-700 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

const CouponManager: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState<{
    id?: string | null;
    name: string;
    code: string;
    percentage: number | "";
  }>({
    id: null,
    name: "",
    code: "",
    percentage: "",
  });

  const couponsCol = collection(db, "coupons");

  /* LOAD COUPONS REAL-TIME */
  useEffect(() => {
    const q = query(couponsCol, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list: Coupon[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data() as any;
        list.push({
          id: docSnap.id,
          name: d.name,
          code: d.code,
          percentage: d.percentage,
        });
      });
      setCoupons(list);
    });

    return () => unsub();
  }, []);

  /* FILTER */
  const filteredCoupons = coupons.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* FORM HELPERS */
  const openCreateModal = () => {
    setForm({ id: null, name: "", code: "", percentage: "" });
    setIsModalOpen(true);
  };

  const validateForm = () => {
    if (!form.name.trim()) return Swal.fire("Validation", "Name required!", "warning");
    if (!form.code.trim()) return Swal.fire("Validation", "Code required!", "warning");

    const pct = Number(form.percentage);
    if (!pct || pct <= 0 || pct > 100)
      return Swal.fire("Validation", "Percentage must be 1–100", "warning");

    return true;
  };

  const saveCoupon = async () => {
    if (!validateForm()) return;

    const payload = {
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      percentage: Number(form.percentage),
      createdAt: serverTimestamp(),
    };

    try {
      if (form.id) {
        await updateDoc(doc(db, "coupons", form.id), payload);
        Swal.fire("Saved", "Coupon updated!", "success");
      } else {
        await addDoc(couponsCol, payload);
        Swal.fire("Saved", "Coupon created!", "success");
      }
      setIsModalOpen(false);
    } catch {
      Swal.fire("Error", "Failed to save coupon.", "error");
    }
  };

  const handleEdit = (c: Coupon) => {
    setForm({
      id: c.id!,
      name: c.name,
      code: c.code,
      percentage: c.percentage,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (c: Coupon) => {
    const res = await Swal.fire({
      title: "Delete?",
      html: `<strong>${c.name}</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!res.isConfirmed) return;

    await deleteDoc(doc(db, "coupons", c.id!));
    Swal.fire("Deleted", "Coupon removed.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <header className="mb-10 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-indigo-400 flex items-center">
          <Zap className="w-8 h-8 mr-3" />
          Coupon Manager
        </h1>

        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Coupon
        </button>
      </header>

      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Search by name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-slate-800 rounded-xl border border-indigo-700/40 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-slate-700 text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs">Name</th>
              <th className="px-6 py-3 text-left text-xs">Code</th>
              <th className="px-6 py-3 text-left text-xs">Discount</th>
              <th className="px-6 py-3 text-right text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map((c) => (
              <tr key={c.id} className="border-b border-slate-700 hover:bg-slate-700/40">
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4 font-mono">{c.code}</td>
                <td className="px-6 py-4 font-bold">{c.percentage}%</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(c)} className="hover:text-indigo-400">
                    <Edit />
                  </button>
                  <button onClick={() => handleDelete(c)} className="hover:text-red-400">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden mt-6">
        {filteredCoupons.map((c) => (
          <CouponCard key={c.id} coupon={c} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-8 rounded-xl w-full max-w-md border border-indigo-600">
            <h2 className="text-2xl font-bold text-indigo-300 mb-6">
              {form.id ? "Edit Coupon" : "Create Coupon"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Coupon Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 rounded-lg"
              />

              <input
                type="text"
                placeholder="CODE123"
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value.toUpperCase() })
                }
                className="w-full px-4 py-2 bg-slate-700 rounded-lg font-mono uppercase"
              />

              <input
                type="number"
                placeholder="Percentage"
                value={form.percentage}
                onChange={(e) =>
                  setForm({ ...form, percentage: Number(e.target.value) })
                }
                className="w-full px-4 py-2 bg-slate-700 rounded-lg"
              />
            </div>

            <div className="flex justify-end mt-8 space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveCoupon}
                className="px-4 py-2 bg-indigo-600 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CouponManager;
