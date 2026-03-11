import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Copy, Check, Gift, Home, ChevronDown } from "lucide-react";
import IslamicBackground from "@/components/IslamicBackground";
import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import ReceiptCard from "@/components/ReceiptCard";

// Simple encoding/decoding functions
const encodeData = (data) => {
  return btoa(encodeURIComponent(JSON.stringify(data)));
};

const decodeData = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch (error) {
    return null;
  }
};

const EidiReveal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Try to get encoded data first, fallback to individual params
  const encodedData = searchParams.get("data");
  
  let from = "Someone";
  let to = "You";
  let relationship = "Loved One";
  let amount = "0";
  let message = "Eid Mubarak!";

  if (encodedData) {
    const decoded = decodeData(encodedData);
    if (decoded) {
      from = decoded.from || from;
      to = decoded.to || to;
      relationship = decoded.relationship || relationship;
      amount = decoded.amount || amount;
      message = decoded.message || message;
    }
  } else {
    from = searchParams.get("from") || from;
    to = searchParams.get("to") || to;
    relationship = searchParams.get("relationship") || relationship;
    amount = searchParams.get("amount") || amount;
    message = searchParams.get("message") || message;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setStep(4);

    const duration = 3500;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ["#D4AF37", "#FFD700", "#0F5132", "#FFFFFF", "#F5F5DC"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ["#D4AF37", "#FFD700", "#0F5132", "#FFFFFF", "#F5F5DC"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

const handleCopyLink = () => {
  const shareableData = {
    from,
    to,
    relationship,
    amount,
    message
  };
  
  const encodedString = encodeData(shareableData);
  // Include /eidi so that the link goes to the correct route to display the greeting
  const shareableUrl = `${window.location.origin}/eidi?data=${encodedString}`;
  
  navigator.clipboard.writeText(shareableUrl);
  setCopied(true);
  setTimeout(() => setCopied(false), 2500);
};

  const stepVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      <IslamicBackground />

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-8">

        {/* Step 1: Eid greeting header */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div className="text-center" variants={stepVariants} initial="hidden" animate="visible">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60" />
                <span className="text-gold text-lg">✦</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60" />
              </div>
              <p className="text-muted-foreground font-poppins text-sm uppercase tracking-widest mb-1">
                Wishing Eid Mubarak to my
              </p>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold gold-text leading-tight">
                {relationship}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: From → To */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              className="glass-card rounded-2xl px-8 py-5 border border-gold/20 text-center w-full"
              variants={stepVariants} initial="hidden" animate="visible"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-xs font-poppins uppercase tracking-widest mb-1">From</p>
                  <p className="font-playfair text-2xl font-semibold text-cream">{from}</p>
                </div>
                <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <path d="M0 10 H32 M26 4 L32 10 L26 16" stroke="hsl(45 72% 52%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </motion.div>
                <div className="text-center">
                  <p className="text-muted-foreground text-xs font-poppins uppercase tracking-widest mb-1">To</p>
                  <p className="font-playfair text-2xl font-semibold text-cream">{to}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gold/10">
                <p className="text-muted-foreground text-sm font-poppins">has sent you a special Eidi 🎁</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Envelope */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              className="relative flex flex-col items-center"
              style={{ minHeight: "300px" }}
              variants={stepVariants} initial="hidden" animate="visible"
            >
              <EnvelopeAnimation isOpen={isOpen} onOpen={handleOpen} amount={amount} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: After opening */}
        <AnimatePresence>
          {isOpen && step >= 4 && (
            <motion.div
              className="w-full flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {/* Personal message */}
              <div className="glass-card rounded-2xl p-6 w-full border border-gold/20 text-center relative overflow-hidden">
                <span className="absolute top-2 left-4 text-5xl font-playfair leading-none opacity-20" style={{ color: "hsl(45 72% 52%)" }}>"</span>
                <span className="absolute bottom-2 right-4 text-5xl font-playfair leading-none opacity-20" style={{ color: "hsl(45 72% 52%)" }}>"</span>
                <p className="font-playfair text-lg md:text-xl text-cream italic leading-relaxed px-4">{message}</p>
                <div className="mt-4 pt-3 border-t border-gold/10">
                  <p className="text-gold text-sm font-poppins">— With love, {from} ❤️</p>
                </div>
              </div>

              {/* Copy link button */}
              <motion.button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl border font-poppins text-sm font-medium transition-all duration-200"
                style={{
                  borderColor: "hsl(45 72% 52% / 0.4)",
                  color: "hsl(48 80% 80%)",
                  background: "hsl(150 35% 8% / 0.8)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Link Copied!" : "Copy Eidi Link"}
              </motion.button>

              {/* Eidi Receipt Card (collapsible) */}
              <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <button
                  onClick={() => setShowReceipt((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-3 rounded-xl font-poppins text-sm font-medium transition-all mb-3"
                  style={{
                    border: "1px solid hsl(45 72% 52% / 0.25)",
                    background: "hsl(150 35% 8% / 0.6)",
                    color: "hsl(48 80% 75%)",
                  }}
                >
                  <span>🎴 Download Eidi Greeting Card</span>
                  <motion.span animate={{ rotate: showReceipt ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {showReceipt && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ overflow: "hidden" }}
                    >
                      <ReceiptCard
                        from={from}
                        to={to}
                        relationship={relationship}
                        amount={amount}
                        message={message}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Bottom actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <motion.button
                  onClick={() => navigate("/")}
                  className="btn-gold flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-poppins text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Gift className="w-4 h-4" />
                  Send Your Own Eidi
                </motion.button>
              </div>

              <motion.button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-muted-foreground text-xs font-poppins hover:text-gold transition-colors"
                whileHover={{ x: -3 }}
              >
                <Home className="w-3 h-3" />
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Islamic footer text */}
        <AnimatePresence>
          {step >= 2 && !isOpen && (
            <motion.p
              className="text-muted-foreground text-xs font-poppins text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
            >
              ☽ تقبل الله منا ومنكم ☽
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EidiReveal;