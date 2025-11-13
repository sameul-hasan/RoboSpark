import React, { useState, useMemo, useEffect } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { CountdownTimer } from "@/components/CountDown";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface InputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div className="space-y-1 w-full">
    <label className="text-cyan-300 text-sm font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700
      focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition"
    />
  </div>
);

const App: React.FC = () => {
  const competitionFees: any = {
    "Drone Challenge": { base: 2000, extra: 600 },
    "Line Following Robot (LFR)": { base: 1500, extra: 500 },
    Techathon: { base: 2000, extra: 600 },
    "Robot Soccer": { base: 1500, extra: 500 },
    "Cosmo Cleanse": { base: 1500, extra: 500 },
  };

  const competitions = Object.keys(competitionFees);

  const [couponList, setCouponList] = useState<any[]>([]);
  useEffect(() => {
    const fetchCoupons = async () => {
      const snap = await getDocs(collection(db, "coupons"));
      const list: any[] = [];

      snap.forEach((docSnap) => {
        const d = docSnap.data();

        list.push({
          id: docSnap.id,
          name: d.name?.trim() || "",
          code: d.code?.toString().trim().toUpperCase(),
          percentage: Number(d.percentage) || 0,
        });
      });

      setCouponList(list);
    };

    fetchCoupons();
  }, []);

  const [formData, setFormData] = useState({
    teamName: "",
    institution: "",
    competition: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    paymentMethod: "",
    senderNumber: "",
    transactionId: "",
    couponCode: "",
    members: [
      { name: "", email: "", phone: "" },
      { name: "", email: "", phone: "" },
    ],
    paymentaccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (
    index: number,
    field: "name" | "email" | "phone",
    value: string
  ) => {
    const updated = [...formData.members];
    updated[index][field] = value;
    setFormData({ ...formData, members: updated });
  };

  const addMember = () => {
    if (formData.members.length < 5) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: "", email: "", phone: "" }],
      });
    }
  };

  const removeMember = (index: number) => {
    const updated = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members: updated });
  };

  const validate = () => {
    return (
      formData.teamName &&
      formData.institution &&
      formData.competition &&
      formData.leaderName &&
      formData.leaderEmail &&
      formData.leaderPhone &&
      formData.paymentMethod &&
      formData.senderNumber &&
      formData.transactionId
    );
  };

  const teamSize = useMemo(
    () => 1 + formData.members.filter((m) => m.name.trim() !== "").length,
    [formData]
  );

  const calculatedFees = useMemo(() => {
    if (!formData.competition) return null;

    const feeInfo = competitionFees[formData.competition];
    const base = feeInfo.base;
    const extraMembers = Math.max(0, teamSize - 3);
    const extraFee = extraMembers * feeInfo.extra;
    const subtotal = base + extraFee;

    // Firestore coupon check
    let discountPercent = 0;
    let discountAmount = 0;

    const couponObj = couponList.find(
      (c) => c.code.toUpperCase() === formData.couponCode.toUpperCase()
    );
    if (couponObj) {
      discountPercent = couponObj.percentage;
      discountAmount = Math.floor((subtotal * discountPercent) / 100);
    }

    const total = subtotal - discountAmount;

    return {
      base,
      extraFee,
      extraMembers,
      subtotal,
      discountPercent,
      discountAmount,
      total,
    };
  }, [formData.competition, teamSize, formData.couponCode, couponList]);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      Swal.fire("Missing Fields", "Please fill all required fields.", "error");
      return;
    }

    Swal.fire({
      title: "Submitting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const cleanedMembers = formData.members.filter(
        (m) => m.name.trim() !== ""
      );

      await addDoc(collection(db, "registrations"), {
        ...formData,
        members: cleanedMembers,
        teamSize,
        fees: calculatedFees,
        registeredAt: serverTimestamp(),
      });
      const API_URL = import.meta.env.VITE_API_URL;

      await fetch(`${API_URL}/api/register-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      Swal.fire("Success", "Your team has been registered!", "success");

      setFormData({
        teamName: "",
        institution: "",
        competition: "",
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        paymentMethod: "",
        senderNumber: "",
        transactionId: "",
        couponCode: "",
        members: [
          { name: "", email: "", phone: "" },
          { name: "", email: "", phone: "" },
        ],
        paymentaccepted: false,
      });
    } catch {
      Swal.fire("Error", "Failed to submit. Try again.", "error");
    }
  };

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-950 via-indigo-900 to-black text-white p-6">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-['Orbitron'] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          ROBOSPARK 2025
        </h1>
        <p className="text-cyan-200 mt-3 text-lg">
          Team Registration – Max 6 Members
        </p>
      </div>

      <CountdownTimer />

      <form
        onSubmit={submitForm}
        className="max-w-4xl mx-auto bg-gray-900/70 p-10 rounded-2xl shadow-2xl border border-cyan-700/30 mt-10 space-y-10"
      >
        {/* TEAM INFO */}
        <section>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            1. Team Details
          </h2>

          <InputField
            label="Team Name"
            name="teamName"
            required
            value={formData.teamName}
            onChange={handleChange}
          />

          <InputField
            label="Institution Name"
            name="institution"
            required
            value={formData.institution}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <label className="text-cyan-300 font-semibold">Competition *</label>
            <select
              name="competition"
              required
              value={formData.competition}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select competition</option>
              {competitions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </section>

        {/* TEAM LEADER */}
        <section>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            2. Team Leader (Required)
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Leader Full Name"
              name="leaderName"
              required
              value={formData.leaderName}
              onChange={handleChange}
            />

            <InputField
              label="Leader Email"
              name="leaderEmail"
              type="email"
              required
              value={formData.leaderEmail}
              onChange={handleChange}
            />

            <InputField
              label="Leader Phone"
              name="leaderPhone"
              type="tel"
              required
              value={formData.leaderPhone}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* MEMBERS */}
        <section>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            3. Team Members
          </h2>

          {formData.members.map((m, index) => (
            <div
              key={index}
              className="border border-gray-700 p-4 rounded-xl bg-gray-800/50 mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg text-cyan-300 font-semibold">
                  Member {index + 2}
                </h3>

                {formData.members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="text-red-400 text-xl"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <InputField
                  label="Name"
                  name="member-name"
                  value={m.name}
                  onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                  }
                />

                <InputField
                  label="Email"
                  name="member-email"
                  type="email"
                  value={m.email}
                  onChange={(e) =>
                    handleMemberChange(index, "email", e.target.value)
                  }
                />

                <InputField
                  label="Phone"
                  name="member-phone"
                  type="tel"
                  value={m.phone}
                  onChange={(e) =>
                    handleMemberChange(index, "phone", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-500"
          >
            + Add Member
          </button>
        </section>

        {/* FEE SUMMARY */}
        {calculatedFees && (
          <section className="bg-gray-800/60 border border-cyan-700/40 p-6 rounded-xl text-lg space-y-2">
            <p className="text-cyan-300 font-bold text-xl">
              Registration Fee Summary
            </p>

            <p>
              Base Fee (3 Members):{" "}
              <span className="text-cyan-400 font-bold">
                {calculatedFees.base} BDT
              </span>
            </p>

            {calculatedFees.extraMembers > 0 && (
              <p>
                Extra Members ({calculatedFees.extraMembers}):{" "}
                <span className="text-cyan-400 font-bold">
                  {calculatedFees.extraFee} BDT
                </span>
              </p>
            )}

            <p className="font-bold text-yellow-300">
              Subtotal: {calculatedFees.subtotal} BDT
            </p>

            {/* NEW DISCOUNT DISPLAY */}
            {calculatedFees.discountPercent > 0 && (
              <p className="font-bold text-pink-400">
                Coupon Applied ({calculatedFees.discountPercent}%): -{" "}
                {calculatedFees.discountAmount} BDT
              </p>
            )}

            <p className="text-2xl font-extrabold text-green-400">
              Total Payable: {calculatedFees.total} BDT
            </p>
          </section>
        )}

        {/* COUPON FIELD */}
        <section>
          <InputField
            label="Coupon Code"
            name="couponCode"
            placeholder="Enter coupon (optional)"
            value={formData.couponCode}
            onChange={handleChange}
          />
          {formData.couponCode &&
            !couponList.find(
              (c) => c.code.toUpperCase() === formData.couponCode.toUpperCase()
            ) && <p className="text-red-400 text-sm">Invalid coupon code.</p>}
        </section>

        {/* PAYMENT */}
        <section>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">4. Payment</h2>

          <div className="space-y-2">
            <label className="text-cyan-300 font-semibold">
              Payment Method *
            </label>
            <select
              name="paymentMethod"
              required
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select method</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
          </div>

          {formData.paymentMethod && (
            <div className="bg-gray-800/40 p-4 rounded-lg border border-cyan-700/30 mt-4">
              <p className="text-cyan-300 font-semibold mb-2">
                Send Payment To:
              </p>

              {formData.paymentMethod === "bkash" && (
                <p className="text-pink-400 text-lg font-bold">
                  bKash: 017XXXXXXXX
                </p>
              )}

              {formData.paymentMethod === "nagad" && (
                <p className="text-yellow-400 text-lg font-bold">
                  Nagad: 018XXXXXXXX
                </p>
              )}
              {formData.paymentMethod === "rocket" && (
                <p className="text-yellow-400 text-lg font-bold">
                  Rocket: 018XXXXXXXX
                </p>
              )}
            </div>
          )}

          <InputField
            label="Sender Number"
            name="senderNumber"
            required
            value={formData.senderNumber}
            onChange={handleChange}
            placeholder="Number used to send payment"
          />

          <InputField
            label="Transaction ID"
            name="transactionId"
            required
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="e.g., TXN12345ABC"
          />
        </section>

        <button
          type="submit"
          className="w-full py-4 bg-cyan-600 rounded-xl text-black font-bold text-xl hover:bg-cyan-500"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default App;
