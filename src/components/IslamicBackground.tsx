import { motion } from "framer-motion";
import islamicPattern from "@/assets/islamic-pattern.png";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

const stars: Star[] = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}));

const IslamicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url(${islamicPattern})`,
          backgroundSize: "300px 300px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Deep gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep via-background to-emerald-deep opacity-90" />

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(145_60%_12%/0.4),transparent)]" />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            background: `hsl(48 90% ${60 + Math.random() * 20}%)`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Crescent moon top right */}
      <motion.div
        className="absolute top-8 right-8 md:top-12 md:right-16"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 16px hsl(45 72% 52% / 0.7))" }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <path
            d="M55 35C55 47.15 45.15 57 33 57C26.4 57 20.5 54.1 16.5 49.5C18.8 50.2 21.3 50.6 23.9 50.6C38.2 50.6 49.8 39 49.8 24.7C49.8 19.1 48 13.9 44.9 9.7C51.2 14.8 55 22.4 55 31C55 32.3 54.95 33.65 54.85 34.95C54.95 34.97 55 35 55 35Z"
            fill="hsl(45 72% 52%)"
          />
          <circle cx="58" cy="14" r="3" fill="hsl(48 90% 70%)" opacity="0.8" />
          <circle cx="62" cy="22" r="1.5" fill="hsl(48 90% 70%)" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Decorative lantern left */}
      <motion.div
        className="absolute top-20 left-6 opacity-30 hidden md:block"
        animate={{
          y: [0, -10, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 10px hsl(45 72% 52% / 0.5))" }}
      >
        <svg width="30" height="60" viewBox="0 0 30 60" fill="none">
          <line x1="15" y1="0" x2="15" y2="8" stroke="hsl(45 72% 52%)" strokeWidth="1.5" />
          <ellipse cx="15" cy="10" rx="5" ry="2" fill="hsl(45 72% 52%)" />
          <path d="M5 12 Q3 30 5 48 Q15 55 25 48 Q27 30 25 12 Z" fill="hsl(45 60% 45% / 0.7)" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <ellipse cx="15" cy="50" rx="5" ry="2" fill="hsl(45 72% 52%)" />
          <line x1="15" y1="52" x2="15" y2="60" stroke="hsl(45 72% 52%)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Decorative lantern right */}
      <motion.div
        className="absolute top-32 right-6 opacity-25 hidden md:block"
        animate={{
          y: [0, -12, 0],
          rotate: [3, -3, 3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ filter: "drop-shadow(0 0 10px hsl(45 72% 52% / 0.5))" }}
      >
        <svg width="24" height="48" viewBox="0 0 30 60" fill="none">
          <line x1="15" y1="0" x2="15" y2="8" stroke="hsl(45 72% 52%)" strokeWidth="1.5" />
          <ellipse cx="15" cy="10" rx="5" ry="2" fill="hsl(45 72% 52%)" />
          <path d="M5 12 Q3 30 5 48 Q15 55 25 48 Q27 30 25 12 Z" fill="hsl(38 55% 40% / 0.7)" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <ellipse cx="15" cy="50" rx="5" ry="2" fill="hsl(45 72% 52%)" />
          <line x1="15" y1="52" x2="15" y2="60" stroke="hsl(45 72% 52%)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Corner ornaments */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M0 200 Q100 100 200 0" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <path d="M0 160 Q80 80 160 0" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <path d="M0 120 Q60 60 120 0" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <circle cx="20" cy="180" r="4" fill="hsl(45 72% 52%)" />
          <circle cx="60" cy="140" r="3" fill="hsl(45 72% 52%)" />
          <circle cx="100" cy="100" r="5" fill="hsl(45 72% 52%)" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 transform scale-x-[-1]">
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M0 200 Q100 100 200 0" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <path d="M0 160 Q80 80 160 0" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <path d="M0 120 Q60 60 120 0" stroke="hsl(45 72% 52%)" strokeWidth="1" />
          <circle cx="20" cy="180" r="4" fill="hsl(45 72% 52%)" />
          <circle cx="60" cy="140" r="3" fill="hsl(45 72% 52%)" />
          <circle cx="100" cy="100" r="5" fill="hsl(45 72% 52%)" />
        </svg>
      </div>
    </div>
  );
};

export default IslamicBackground;
