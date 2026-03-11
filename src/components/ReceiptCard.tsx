import { useRef } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

interface ReceiptCardProps {
  from: string;
  to: string;
  relationship: string;
  amount: string;
  message: string;
}

const ReceiptCard = ({ from, to, relationship, amount, message }: ReceiptCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const formattedAmount = Number(amount).toLocaleString("en-IN");

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0a1f14",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `eidi-from-${from}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* The downloadable card — NO webkit gradient text, solid colors only for html2canvas compat */}
      <div
        ref={cardRef}
        style={{
          width: "100%",
          borderRadius: "16px",
          padding: "28px 24px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(145deg, #0d2218 0%, #0f2e1c 50%, #0a1a11 100%)",
          border: "1.5px solid rgba(212,175,55,0.5)",
          boxShadow: "0 0 40px rgba(212,175,55,0.15)",
        }}
      >
        {/* Top ornament row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.7))" }} />
          <span style={{ color: "#D4AF37", fontSize: "20px", lineHeight: 1 }}>❋</span>
          <span style={{ color: "#D4AF37", fontSize: "14px", lineHeight: 1 }}>✦</span>
          <span style={{ color: "#D4AF37", fontSize: "20px", lineHeight: 1 }}>❋</span>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, transparent, rgba(212,175,55,0.7))" }} />
        </div>

        {/* Arabic text */}
        <div style={{ textAlign: "center", marginBottom: "6px" }}>
          <p style={{ fontFamily: "serif", fontSize: "13px", color: "#c9a84c", letterSpacing: "0.15em", marginBottom: "6px" }}>
            ☽ عيد مبارك ☾
          </p>
          {/* Eid Mubarak — solid gold, NO webkit clip */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#D4AF37",
            margin: 0,
            lineHeight: 1.2,
          }}>
            Eid Mubarak
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", margin: "14px 0", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)" }} />

        {/* From / To / Relationship row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", padding: "0 8px" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#5a8a6a", marginBottom: "4px" }}>From</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#f0e6c8" }}>{from}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "20px" }}>🎁</span>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", color: "#5a8a6a" }}>to their</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "12px", fontWeight: 500, color: "#c9a84c" }}>{relationship}</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#5a8a6a", marginBottom: "4px" }}>To</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#f0e6c8" }}>{to}</p>
          </div>
        </div>

        {/* Amount badge — solid colors, NO webkit text clip */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
          <div style={{
            padding: "14px 36px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #3a2006 0%, #7a5510 50%, #3a2006 100%)",
            border: "1.5px solid rgba(212,175,55,0.7)",
            boxShadow: "0 0 20px rgba(212,175,55,0.25)",
            textAlign: "center",
          }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(240,220,150,0.6)", marginBottom: "4px" }}>
              Eidi Amount
            </p>
            {/* Amount — solid light gold, NOT gradient text */}
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "30px",
              fontWeight: 700,
              color: "#f0d060",
              margin: 0,
              lineHeight: 1.2,
            }}>
              ₹ {formattedAmount}
            </p>
          </div>
        </div>

        {/* Message */}
        <div style={{
          borderRadius: "10px",
          padding: "14px 18px",
          marginBottom: "16px",
          background: "rgba(10,25,16,0.8)",
          border: "1px solid rgba(212,175,55,0.15)",
          position: "relative",
        }}>
          <span style={{ position: "absolute", top: "2px", left: "10px", fontSize: "36px", fontFamily: "serif", color: "rgba(212,175,55,0.2)", lineHeight: 1 }}>"</span>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "13px",
            fontStyle: "italic",
            color: "#f0e6c8",
            textAlign: "center",
            lineHeight: 1.7,
            padding: "0 16px",
            margin: 0,
          }}>
            {message}
          </p>
          <span style={{ position: "absolute", bottom: "2px", right: "10px", fontSize: "36px", fontFamily: "serif", color: "rgba(212,175,55,0.2)", lineHeight: 1 }}>"</span>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4))" }} />
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: "#5a8a6a" }}>تقبل الله منا ومنكم</p>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, transparent, rgba(212,175,55,0.4))" }} />
        </div>
      </div>

      {/* Download button */}
      <motion.button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-poppins text-sm font-medium"
        style={{
          background: "hsl(150 35% 10% / 0.9)",
          border: "1px solid hsl(45 72% 52% / 0.4)",
          color: "hsl(48 80% 80%)",
        }}
        whileHover={{ scale: 1.03, borderColor: "hsl(45 72% 52% / 0.8)" } as any}
        whileTap={{ scale: 0.97 }}
      >
        <Download className="w-4 h-4" />
        Download Eidi Card
      </motion.button>
    </motion.div>
  );
};

export default ReceiptCard;
