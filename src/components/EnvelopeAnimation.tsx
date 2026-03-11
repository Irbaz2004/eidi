import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeAnimationProps {
  isOpen: boolean;
  onOpen: () => void;
  amount: string;
}

// Flying money note
const MoneyNote = ({ delay, angle, distance }: { delay: number; angle: number; distance: number }) => {
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * distance;
  const ty = -Math.abs(Math.sin(rad) * distance) - 60;

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ top: "40%", left: "50%", originX: "50%", originY: "50%" }}
      initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
      animate={{ x: tx, y: ty, scale: [0, 1.1, 0.95], opacity: [0, 1, 1, 0.6], rotate: angle - 90 }}
      transition={{ delay, duration: 1.1, ease: "easeOut" }}
    >
      <div
        className="w-14 h-7 rounded-md flex items-center justify-center font-playfair font-bold text-xs shadow-lg"
        style={{
          background: "linear-gradient(135deg, hsl(38 60% 30%), hsl(45 72% 45%), hsl(38 60% 30%))",
          border: "1px solid hsl(48 90% 65% / 0.6)",
          color: "hsl(48 90% 78%)",
          boxShadow: "0 2px 12px hsl(45 72% 52% / 0.5)",
        }}
      >
        ₹
      </div>
    </motion.div>
  );
};

// Star sparkle
const SparkleEffect = ({ delay = 0, x = 50, y = 30 }: { delay?: number; x?: number; y?: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top: `${y}%`, left: `${x}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: [0, 180, 360] }}
    transition={{ delay, duration: 1.4, repeat: Infinity, repeatDelay: 1.8 }}
  >
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9 7L16 8L9 9L8 16L7 9L0 8L7 7L8 0Z" fill="hsl(48 90% 68%)" />
    </svg>
  </motion.div>
);

// SVG Envelope component with animated flap
const SvgEnvelope = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
    <svg
      viewBox="0 0 200 160"
      className="w-full h-full drop-shadow-2xl"
      style={{ filter: "drop-shadow(0 8px 32px hsl(45 72% 52% / 0.45))" }}
    >
      {/* Envelope body */}
      <rect x="10" y="50" width="180" height="105" rx="8" ry="8"
        fill="hsl(145 60% 14%)"
        stroke="hsl(45 72% 45%)"
        strokeWidth="1.5"
      />
      {/* Bottom left triangle */}
      <polygon points="10,155 100,100 10,50" fill="hsl(145 55% 11%)" />
      {/* Bottom right triangle */}
      <polygon points="190,155 100,100 190,50" fill="hsl(145 55% 11%)" />
      {/* Bottom center fold */}
      <polygon points="10,155 190,155 100,100" fill="hsl(145 50% 12%)" stroke="hsl(45 72% 40%)" strokeWidth="0.5" />

      {/* Envelope flap - animated open */}
      <motion.polygon
        points="10,50 190,50 100,110"
        fill={isOpen ? "hsl(145 60% 17%)" : "hsl(145 65% 16%)"}
        stroke="hsl(45 72% 45%)"
        strokeWidth="1.2"
        style={{ transformOrigin: "100px 50px" }}
        animate={isOpen ? { rotateX: -160, opacity: 0.3 } : { rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* Gold seal / center decoration when closed */}
      {!isOpen && (
        <>
          <circle cx="100" cy="92" r="10" fill="hsl(45 72% 40%)" stroke="hsl(48 90% 65%)" strokeWidth="1" />
          <text x="100" y="96" textAnchor="middle" fontSize="10" fill="hsl(48 90% 80%)" fontFamily="serif">☽</text>
        </>
      )}

      {/* Gold border decorative lines */}
      <line x1="10" y1="50" x2="190" y2="50" stroke="hsl(45 72% 50%)" strokeWidth="1.5" opacity="0.6" />

      {/* Corner dots */}
      {[[16, 56], [184, 56], [16, 149], [184, 149]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="hsl(45 72% 52%)" opacity="0.6" />
      ))}
    </svg>
  </div>
);

const MONEY_NOTES = [
  { angle: 270, distance: 90, delay: 0.1 },
  { angle: 240, distance: 100, delay: 0.15 },
  { angle: 300, distance: 100, delay: 0.2 },
  { angle: 210, distance: 80, delay: 0.25 },
  { angle: 330, distance: 80, delay: 0.3 },
  { angle: 255, distance: 110, delay: 0.35 },
];

const SPARKLES = [
  { x: 15, y: 20, delay: 0 }, { x: 80, y: 10, delay: 0.4 }, { x: 55, y: 15, delay: 0.8 },
  { x: 20, y: 60, delay: 0.2 }, { x: 75, y: 65, delay: 0.6 }, { x: 88, y: 35, delay: 1.0 },
];

const EnvelopeAnimation = ({ isOpen, onOpen, amount }: EnvelopeAnimationProps) => {
  const formattedAmount = Number(amount).toLocaleString("en-IN");

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ minHeight: "320px" }}>

      {/* Envelope container */}
      <motion.div
        className="relative cursor-pointer select-none"
        whileHover={!isOpen ? { scale: 1.05, y: -6 } : {}}
        whileTap={!isOpen ? { scale: 0.97 } : {}}
        onClick={!isOpen ? onOpen : undefined}
        animate={!isOpen ? { y: [0, -8, 0] } : {}}
        transition={!isOpen ? { y: { duration: 3, repeat: Infinity, ease: "easeInOut" } } : {}}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isOpen
              ? ["0 0 50px hsl(45 72% 52% / 0.9)", "0 0 100px hsl(45 72% 52% / 0.4)", "0 0 50px hsl(45 72% 52% / 0.9)"]
              : ["0 0 20px hsl(45 72% 52% / 0.3)", "0 0 40px hsl(45 72% 52% / 0.5)", "0 0 20px hsl(45 72% 52% / 0.3)"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <SvgEnvelope isOpen={isOpen} />

        {/* Flying money notes */}
        {/* <AnimatePresence>
          {isOpen && MONEY_NOTES.map((note, i) => (
            <MoneyNote key={i} angle={note.angle} distance={note.distance} delay={note.delay} />
          ))}
        </AnimatePresence> */}

        {/* Click hint */}
        {!isOpen && (
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
            animate={{ opacity: [0.5, 1, 0.5], y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              className="text-xs font-poppins tracking-widest uppercase px-4 py-1.5 rounded-full border"
              style={{
                color: "hsl(48 80% 80%)",
                borderColor: "hsl(45 72% 52% / 0.4)",
                background: "hsl(150 40% 5% / 0.8)",
              }}
            >
              ✨ Tap to Open
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Amount reveal card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-14 left-7 -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: 60, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            style={{ minHeight: "320px" }}
          >
            <div
              className="relative px-8 py-4 rounded-2xl border-2 text-center"
              style={{
                background: "linear-gradient(135deg, hsl(38 60% 22%), hsl(45 72% 35%), hsl(38 60% 22%))",
                borderColor: "hsl(45 72% 52%)",
                boxShadow: "0 0 40px hsl(45 72% 52% / 0.7), inset 0 1px 0 hsl(48 90% 70% / 0.3)",
              }}
            >
              <div className="flex items-center justify-between mb-1 opacity-60">
                <span className="text-xs font-poppins" style={{ color: "hsl(48 90% 70%)" }}>₹</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full" style={{ background: "hsl(48 90% 70%)" }} />
                  ))}
                </div>
                <span className="text-xs font-poppins" style={{ color: "hsl(48 90% 70%)" }}>₹</span>
              </div>
              <motion.p
                className="font-playfair font-bold text-3xl md:text-4xl gold-text"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              >
                ₹ {formattedAmount}
              </motion.p>
              <p className="text-xs mt-1 font-poppins opacity-70" style={{ color: "hsl(48 80% 80%)" }}>
                Eidi Mubarak 🎊
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {SPARKLES.map((s, i) => (
            <SparkleEffect key={i} x={s.x} y={s.y} delay={s.delay} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnvelopeAnimation;
