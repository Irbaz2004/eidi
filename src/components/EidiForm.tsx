import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Send, Sparkles, Gift } from "lucide-react";
import IslamicBackground from "./IslamicBackground";

const RELATIONSHIPS = [
  "Wife", "Husband", "Mother", "Father", "Sister", "Brother",
  "Girlfriend", "Boyfriend", "Daughter", "Son", "Uncle", "Aunty",
  "Grandmother", "Grandfather", "Friend", "Cousin",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const EidiForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "",
    to: "",
    relationship: "",
    amount: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.from.trim()) newErrors.from = "Your name is required";
    if (!form.to.trim()) newErrors.to = "Recipient name is required";
    if (!form.relationship.trim()) newErrors.relationship = "Relationship is required";
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = "Enter a valid amount";
    if (!form.message.trim()) newErrors.message = "Add a personal message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const params = new URLSearchParams({
      from: form.from,
      to: form.to,
      relationship: form.relationship,
      amount: form.amount,
      message: form.message,
    });
    navigate(`/eidi?${params.toString()}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const setAmount = (amt: number) => {
    setForm((prev) => ({ ...prev, amount: String(amt) }));
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <IslamicBackground />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <Sparkles className="text-gold-light w-5 h-5" />
            <span className="text-gold-light text-sm font-poppins tracking-widest uppercase">
              Eid Mubarak
            </span>
            <Sparkles className="text-gold-light w-5 h-5" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          <motion.h1
            className="font-playfair text-4xl md:text-5xl font-bold gold-text mb-3 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Virtual Eidi
          </motion.h1>

          <motion.p
            className="text-muted-foreground font-poppins text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Send heartfelt Eidi to your loved ones this Eid
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="glass-card rounded-2xl p-8 border border-gold/20"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-8 opacity-60" />

          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* From / To row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <label className="block text-gold-light text-xs font-poppins uppercase tracking-widest mb-2">
                  From
                </label>
                <input
                  name="from"
                  value={form.from}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`islamic-input w-full px-4 py-3 rounded-xl text-sm ${errors.from ? "border-red-400" : ""}`}
                />
                {errors.from && <p className="text-red-400 text-xs mt-1">{errors.from}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gold-light text-xs font-poppins uppercase tracking-widest mb-2">
                  To
                </label>
                <input
                  name="to"
                  value={form.to}
                  onChange={handleChange}
                  placeholder="Their name"
                  className={`islamic-input w-full px-4 py-3 rounded-xl text-sm ${errors.to ? "border-red-400" : ""}`}
                />
                {errors.to && <p className="text-red-400 text-xs mt-1">{errors.to}</p>}
              </motion.div>
            </div>

            {/* Relationship */}
            <motion.div variants={itemVariants}>
              <label className="block text-gold-light text-xs font-poppins uppercase tracking-widest mb-2">
                Relationship
              </label>
              <input
                name="relationship"
                value={form.relationship}
                onChange={handleChange}
                placeholder="e.g. Wife, Brother, Mom..."
                list="relationships"
                className={`islamic-input w-full px-4 py-3 rounded-xl text-sm ${errors.relationship ? "border-red-400" : ""}`}
              />
              <datalist id="relationships">
                {RELATIONSHIPS.map((r) => <option key={r} value={r} />)}
              </datalist>
              {errors.relationship && <p className="text-red-400 text-xs mt-1">{errors.relationship}</p>}
            </motion.div>

            {/* Amount */}
            <motion.div variants={itemVariants}>
              <label className="block text-gold-light text-xs font-poppins uppercase tracking-widest mb-2">
                Eidi Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold font-poppins font-semibold text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="5000"
                  min="1"
                  className={`islamic-input w-full pl-9 pr-4 py-3 rounded-xl text-sm ${errors.amount ? "border-red-400" : ""}`}
                />
              </div>
              {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
              <div className="flex gap-2 mt-2 flex-wrap">
                {[500, 1000, 2000, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className="text-xs px-3 py-1 rounded-lg font-poppins transition-all duration-200 border"
                    style={{
                      background: form.amount === String(amt) ? "hsl(45 72% 52% / 0.25)" : "transparent",
                      borderColor: form.amount === String(amt) ? "hsl(45 72% 52% / 0.6)" : "hsl(45 72% 52% / 0.2)",
                      color: "hsl(48 80% 80%)",
                    }}
                  >
                    ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Personal Message */}
            <motion.div variants={itemVariants}>
              <label className="block text-gold-light text-xs font-poppins uppercase tracking-widest mb-2">
                Personal Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your heartfelt Eid wishes here..."
                rows={3}
                className={`islamic-input w-full px-4 py-3 rounded-xl text-sm resize-none ${errors.message ? "border-red-400" : ""}`}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </motion.div>



            {/* Submit */}
            <motion.div variants={itemVariants} className="pt-2">
              <motion.button
                type="submit"
                className="btn-gold w-full py-4 rounded-xl flex items-center justify-center gap-3 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Gift className="w-5 h-5" />
                Generate Eidi Link
                <Send className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.form>

          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mt-8 opacity-40" />
        </motion.div>

        <motion.p
          className="text-center text-muted-foreground text-xs font-poppins mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          ✨ Spread joy & blessings this Eid al-Fitr ✨
        </motion.p>
      </div>
    </div>
  );
};

export default EidiForm;
