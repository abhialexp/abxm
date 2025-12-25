import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ChevronRight, 
  Mail, 
  Gift,
  Star,
  Smile,
  Zap,
  Sparkles,
  Snowflake
} from 'lucide-react';

// --- CONFIGURATION DATA ---
const D = {
  landing: {
    welcome: "Merry Christmas, My Love 🎄✨",
    title: "Hey Kuchhu",
    subtitle: "This isn't just a website. It's a little piece of my heart, wrapped in snow and code, just for you.",
    badge: "For My Shonu Only ❤️",
    button: "Unwrap Your Gift",
    footer: "Made with all my love & Christmas magic 🎄❤️"
  },
  app: { introText: "Flying to my Shonu... ❤️" },
  letter: {
    headerTitle: "A Note for Kuchhu 🎅💌",
    headerSubtitle: "Read with your heart",
    letterHeaderTitle: "My Dearest Shonu ❄️",
    letterMessage: `Hey Love,\n\nChristmas is magical, but you? You are the real magic in my life.\n\nEvery moment with you feels like a warm hug on a cold winter night. You bring so much light into my world.`,
    letterSignature: "Forever yours",
    envelopeClickHint: "Tap to open, Shonu 🎁",
    continueButton: "Keep Going ❄️✨"
  },
  activity: {
    initialBoard: ["🍫", "🍬", "🍭", "🍩", null, "🧁", "🍫", "🍬", "🍭"],
    cookieEmoji: "🍪",
    placeInstruction: "Feed the cookie to continue",
    badgeLabel: "Kucchu's Prize"
  },
  treePage: {
    switchLabel: "Turn on the Magic ✨",
    wishTitle: "Happy Christmas my Shonu! ❤️",
    wishText: "Aapki saari wish puri hoo meri Santa se ye hee wish hai <3",
    nextButton: "See What's Next 🎁"
  },
  cards: [
    { 
      front: "You are my absolute favorite person 🤍", 
      backTitle: "Fact #1:", 
      backText: "Life is just boring without your drama and your smile.", 
      color: "bg-rose-100", 
      emoji: "💑" 
    },
    { 
      front: "I love the way you laugh 😌", 
      backTitle: "Fact #2:", 
      backText: "It is literally the best sound in the world. Never stop.", 
      color: "bg-emerald-100", 
      emoji: "✨" 
    },
    { 
      front: "Christmas Coupon: Infinite Cuddles 🫂", 
      backTitle: "Valid Forever", 
      backText: "Redeemable anytime, anywhere. No expiration for Shonu.", 
      color: "bg-amber-100", 
      stamp: "VIP ONLY" 
    }
  ],
  finalLetter: {
    title: "One Last Thing",
    letterGreeting: "My beloved Shonu,",
    letterParagraphs: [
      "I don't need a Christmas tree to find gifts, because I already have you.",
      "Thank you for being my happiness, my calm, and my love. I adore you more than words can say.",
      "Merry Christmas, my Kucchu."
    ],
    sealingNote: "Loving you, always and forever 🎄❤️",
    sealButton: "Seal With A Kiss 💋",
    sealedTitle: "Sent With Love 💌",
    sealedSubtitle: "You are my world",
    experienceAgain: "Read Again ✨"
  }
};

// --- HELPER COMPONENTS ---

const Snowfall = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      update() {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 150 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init();
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

const FloatingDecorations = () => {
  const icons = ["❤️", "✨", "❄️", "🎁", "💖"];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-4xl opacity-30"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            y: [0, -30, 0], 
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 4 + Math.random() * 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
};

// --- CUSTOM SVG RABBIT COMPONENT ---

const RabbitSVG = ({ variant = 1, className, onClick }) => {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div 
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        <defs>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.g 
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          originX="100" originY="100"
        >
          <path d="M70 40 Q60 10 90 40 L95 80 Z" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
          <path d="M75 45 Q70 30 85 50" fill="#ffe4e6" />
          <path d="M130 40 Q140 10 110 40 L105 80 Z" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
          <path d="M125 45 Q130 30 115 50" fill="#ffe4e6" />
        </motion.g>

        <circle cx="100" cy="110" r="50" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />

        <g transform="translate(0, 10)">
          {blink ? (
            <>
              <path d="M85 95 Q90 100 95 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M105 95 Q110 100 115 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="90" cy="95" r="5" fill="#333" />
              <circle cx="110" cy="95" r="5" fill="#333" />
              <circle cx="92" cy="93" r="2" fill="#fff" />
              <circle cx="112" cy="93" r="2" fill="#fff" />
            </>
          )}
          <path d="M96 105 Q100 108 104 105" fill="#fda4af" />
          <circle cx="80" cy="108" r="7" fill="#fda4af" opacity="0.4" />
          <circle cx="120" cy="108" r="7" fill="#fda4af" opacity="0.4" />
        </g>

        {variant === 1 && (
          <motion.g
            animate={{ rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
            originX="140" originY="120"
          >
            <circle cx="140" cy="120" r="12" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
            <path d="M136 116 Q140 112 144 116" stroke="#fda4af" strokeWidth="2" fill="none" />
          </motion.g>
        )}

        {variant === 2 && (
          <g>
            <circle cx="80" cy="150" r="12" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="120" cy="150" r="12" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
          </g>
        )}

        {variant === 4 && (
          <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <path d="M100 170 L 85 150 A 10 10 0 0 1 115 150 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" transform="scale(1.5) translate(-33, -10)" />
            <circle cx="85" cy="140" r="10" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="115" cy="140" r="10" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
          </motion.g>
        )}

        <g transform="translate(10, -25) rotate(10 100 100)">
          <path d="M70 85 L 130 85 L 100 20 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="100" cy="20" r="12" fill="#fff" />
          <rect x="65" y="82" width="70" height="18" rx="8" fill="#fff" />
        </g>
      </svg>
    </motion.div>
  );
};

// --- PAGE COMPONENTS ---

const IntroOverlay = ({ onComplete }) => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden"
  >
    <motion.div
      initial={{ x: "120vw", y: 20, rotate: 5 }}
      animate={{ x: "-120vw", y: -20, rotate: -5 }}
      transition={{ duration: 5, ease: "linear" }}
      onAnimationComplete={onComplete}
      className="relative"
    >
      {/* Sled and Deer facing Left by default, so moving Right to Left makes them run forward */}
      <div className="text-6xl md:text-8xl drop-shadow-lg filter brightness-110">🦌🛷</div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 text-center">
        <p className="text-rose-200 font-serif italic text-xl animate-pulse">Coming to you, Shonu...</p>
      </div>
    </motion.div>
    
    <div className="absolute bottom-10 text-slate-400 text-sm animate-pulse flex flex-col items-center gap-2">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
      {D.app.introText}
    </div>
  </motion.div>
);

const LandingPage = ({ onNext }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10">
      
      {/* Romantic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="mb-6 bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full border border-rose-100"
      >
        <span className="text-rose-500 font-bold text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
          <Sparkles size={12} /> {D.landing.badge} <Sparkles size={12} />
        </span>
      </motion.div>

      <div className="relative w-full max-w-xl mx-auto mt-8">
        {/* Rabbit on Top of Card */}
        <motion.div 
          className="absolute -top-28 left-1/2 -translate-x-1/2 w-40 h-40 z-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <RabbitSVG variant={1} className="w-40 h-40" />
        </motion.div>

        {/* Main Glass Card */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white/80 backdrop-blur-xl p-8 pt-16 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(255,0,0,0.15)] border-4 border-white/50 relative z-10"
        >
          <div className="absolute -top-4 -right-4 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>🎁</div>
          <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">✨</div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 font-serif leading-tight bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent"
          >
            {D.landing.title}
          </motion.h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 font-medium leading-relaxed">
            {D.landing.subtitle}
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="w-full md:w-auto bg-gradient-to-r from-rose-500 to-rose-600 text-white px-10 py-5 rounded-full font-bold shadow-xl hover:shadow-rose-300/50 transition-all flex items-center justify-center gap-3 text-lg mx-auto group"
          >
            {D.landing.button} <Heart size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
      
      <footer className="absolute bottom-8 text-slate-400 text-sm font-medium opacity-80 flex items-center gap-2">
        {D.landing.footer}
      </footer>
    </div>
  );
};

const ActivityPage = ({ onNext }) => {
  const [board, setBoard] = useState(D.activity.initialBoard);
  const [gameDone, setGameDone] = useState(false);

  const handlePlace = () => {
    const newBoard = [...board];
    newBoard[4] = D.activity.cookieEmoji;
    setBoard(newBoard);
    setTimeout(() => setGameDone(true), 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-rose-500 font-serif italic text-2xl mb-2">Just a sweet game...</h2>
        <h1 className="text-4xl font-bold text-slate-800">Sweet Tic-Tac-Toe</h1>
      </motion.div>
      
      <div className="relative">
        {/* Rabbit Peeking from behind the board */}
        <motion.div 
          className="absolute -right-8 -top-20 z-20 rotate-12"
        >
          <RabbitSVG variant={2} className="w-32 h-32" />
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 bg-white/80 backdrop-blur p-6 rounded-[2.5rem] shadow-2xl border-4 border-white relative z-10">
          {board.map((cell, i) => (
            <div key={i} className="w-20 h-20 md:w-24 md:h-24 bg-rose-50/50 rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-rose-100/50">
              {i === 4 && !cell ? (
                <button onClick={handlePlace} className="w-full h-full animate-pulse opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center">
                  {D.activity.cookieEmoji}
                </button>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>{cell}</motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {gameDone && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={onNext}
            className="mt-12 bg-emerald-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-emerald-600 flex items-center gap-2"
          >
            Good Job Shonu! <ChevronRight size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <p className="mt-6 text-slate-400 text-xs uppercase tracking-widest font-bold">{D.activity.placeInstruction}</p>
    </div>
  );
};

const TreePage = ({ onNext }) => {
  const [lightsOn, setLightsOn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto z-10 text-center">
      <motion.div 
        className="w-32 mb-4 mx-auto"
        animate={lightsOn ? { y: [0, -10, 0] } : {}}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <RabbitSVG variant={2} className="w-32 h-32" />
      </motion.div>

      <div className="relative mb-8 flex flex-col items-center">
        {/* Stylish SVG Tree */}
        <svg width="280" height="340" viewBox="0 0 280 340" className="drop-shadow-2xl">
          <defs>
            <radialGradient id="treeGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Trunk */}
          <rect x="125" y="280" width="30" height="40" fill="#78350f" />

          {/* Tree Layers with curves for style */}
          <path d="M140 40 L40 280 L240 280 Z" fill="url(#treeGrad)" />
          <path d="M140 40 Q40 280 20 290 Q140 310 260 290 Q240 280 140 40" fill="#059669" opacity="0.3" />
          
          {/* Detailed Boughs */}
          <path d="M140 60 L60 160 L220 160 Z" fill="#065f46" />
          <path d="M140 100 L80 220 L200 220 Z" fill="#064e3b" />

          {/* Star */}
          <motion.path 
            d="M140 5 L150 35 L180 35 L155 55 L165 85 L140 65 L115 85 L125 55 L100 35 L130 35 Z" 
            fill={lightsOn ? "#fbbf24" : "#4b5563"}
            filter={lightsOn ? "url(#starGlow)" : ""}
            animate={lightsOn ? { scale: [1, 1.2, 1], filter: "drop-shadow(0 0 15px #fbbf24)" } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          {/* Ornaments/Lights */}
          {[
            {cx:140, cy:90, c:"#ef4444"}, {cx:110, cy:150, c:"#3b82f6"}, 
            {cx:170, cy:150, c:"#eab308"}, {cx:80, cy:230, c:"#a855f7"},
            {cx:140, cy:200, c:"#ec4899"}, {cx:200, cy:230, c:"#f97316"},
            {cx:120, cy:220, c:"#22c55e"}, {cx:160, cy:220, c:"#ef4444"},
            {cx:140, cy:160, c:"#fff"}, {cx:100, cy:190, c:"#facc15"},
            {cx:180, cy:190, c:"#60a5fa"}, {cx:140, cy:260, c:"#fff"}
          ].map((l, i) => (
            <motion.circle 
              key={i} 
              cx={l.cx} cy={l.cy} r={lightsOn ? 7 : 6}
              fill={lightsOn ? l.c : "#374151"}
              animate={lightsOn ? { opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1], filter: `drop-shadow(0 0 5px ${l.c})` } : {}}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.15 }}
            />
          ))}
        </svg>

        {/* Gifts Under Tree */}
        <div className="flex justify-center items-end -mt-8 space-x-2 z-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <Gift size={40} className="text-rose-500 fill-rose-200" strokeWidth={1.5} />
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Gift size={56} className="text-blue-500 fill-blue-200" strokeWidth={1.5} />
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Gift size={48} className="text-amber-500 fill-amber-200" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!lightsOn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <button 
              onClick={() => setLightsOn(true)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-20 h-10 bg-slate-300 rounded-full p-1 transition-all duration-300 group-hover:bg-slate-400 relative border-4 border-slate-200">
                <motion.div 
                  layout
                  className="w-7 h-7 bg-white rounded-full shadow-md"
                />
              </div>
              <span className="text-slate-500 font-bold text-sm tracking-widest uppercase">{D.treePage.switchLabel}</span>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-rose-500 font-serif leading-tight drop-shadow-sm">
              {D.treePage.wishTitle}
            </h2>
            <p className="text-xl md:text-2xl text-slate-700 italic font-medium px-4">
              {D.treePage.wishText}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={onNext} 
              className="mt-8 bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-colors flex items-center gap-2 mx-auto"
            >
              {D.treePage.nextButton} <Gift size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CardPage = ({ onNext }) => {
  const [flipped, setFlipped] = useState({});
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full max-w-6xl mx-auto z-10 relative">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-12 text-center drop-shadow-sm">Little Things I Love</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
        {D.cards.map((card, i) => (
          <div 
            key={i} 
            className="perspective-1000 h-80 cursor-pointer"
            onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))}
          >
            <motion.div
              animate={{ rotateY: flipped[i] ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full h-full preserve-3d transition-all duration-500"
            >
              {/* Front */}
              <div className={`absolute inset-0 backface-hidden ${card.color} rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg border-4 border-white`}>
                <Star className="text-slate-400 mb-4 opacity-30" />
                <p className="text-xl font-bold text-slate-800 text-center leading-snug">{card.front}</p>
                <div className="absolute bottom-6 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400 opacity-30" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 opacity-30" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 opacity-30" />
                </div>
              </div>
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg border-4 border-rose-100 text-center">
                <span className="text-5xl mb-4 filter drop-shadow-sm">{card.emoji}</span>
                <h3 className="font-bold text-rose-500 mb-2 uppercase tracking-wide text-sm">{card.backTitle}</h3>
                <p className="text-slate-700 font-medium">{card.backText}</p>
                {card.stamp && <div className="mt-4 border-2 border-rose-400 text-rose-400 px-3 py-1 rounded text-xs font-black rotate-[-10deg] opacity-80">{card.stamp}</div>}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-center w-full relative">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          onClick={onNext} 
          className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-colors z-20"
        >
          Open Final Letter 💌
        </motion.button>
        
        {/* Variant 4: Love Rabbit */}
        <div className="absolute bottom-0 left-[65%] z-10 hidden md:block">
          <RabbitSVG variant={4} className="w-32 h-32" />
        </div>
      </div>
    </div>
  );
};

const FinalLetter = ({ onRestart }) => {
  const [sealed, setSealed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSeal = () => {
    setProcessing(true);
    setTimeout(() => {
      setSealed(true);
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center z-10">
      <AnimatePresence mode="wait">
        {!sealed ? (
          <motion.div 
            key="reading"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            className="bg-[#FFFDF2] max-w-2xl w-full p-8 md:p-12 rounded-[3rem] shadow-2xl border-8 border-white relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5">
              <Mail size={120} />
            </div>
            <div className="relative text-left space-y-6 font-serif">
              <h2 className="text-3xl md:text-4xl font-bold text-rose-500 italic mb-6">{D.finalLetter.letterGreeting}</h2>
              {D.finalLetter.letterParagraphs.map((p, i) => (
                <p key={i} className="text-lg md:text-xl text-slate-700 leading-relaxed">{p}</p>
              ))}
              <div className="pt-8 border-t border-rose-100 mt-8">
                <p className="text-rose-400 italic font-medium">{D.finalLetter.sealingNote}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-10">
              <div className="w-20">
                <RabbitSVG variant={4} className="w-24 h-24" />
              </div>
              <button 
                onClick={handleSeal}
                disabled={processing}
                className="bg-rose-500 text-white px-12 py-5 rounded-full font-bold shadow-xl flex items-center gap-3 disabled:bg-slate-300 hover:bg-rose-600 transition-colors"
              >
                {processing ? "Sealing..." : D.finalLetter.sealButton} <Heart size={20} fill={processing ? "none" : "currentColor"} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="sealed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(255,0,0,0.15)] mb-8 animate-bounce">
              <Heart size={100} className="text-rose-500 filter drop-shadow-lg" fill="currentColor" />
            </div>
            <h1 className="text-5xl font-bold text-slate-800 mb-4 font-serif">{D.finalLetter.sealedTitle}</h1>
            <p className="text-2xl text-slate-500 italic mb-12">{D.finalLetter.sealedSubtitle}</p>
            
            <div className="flex flex-col gap-4">
               <button onClick={onRestart} className="flex items-center gap-2 text-rose-500 font-bold hover:bg-rose-50 px-8 py-3 rounded-full transition-colors border-2 border-rose-100">
                <RefreshCw size={20} /> {D.finalLetter.experienceAgain}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [step, setStep] = useState('intro');

  return (
    <div className="min-h-screen bg-[#FDF7F9] font-sans overflow-x-hidden selection:bg-rose-200 relative">
      <Snowfall />
      <FloatingDecorations />
      
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <IntroOverlay key="intro" onComplete={() => setStep('landing')} />
        )}
        
        {step === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onNext={() => setStep('game')} />
          </motion.div>
        )}

        {step === 'game' && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ActivityPage onNext={() => setStep('tree')} />
          </motion.div>
        )}

        {step === 'tree' && (
          <motion.div key="tree" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TreePage onNext={() => setStep('cards')} />
          </motion.div>
        )}

        {step === 'cards' && (
          <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardPage onNext={() => setStep('final')} />
          </motion.div>
        )}

        {step === 'final' && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FinalLetter onRestart={() => setStep('intro')} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        body {
          font-family: 'Fredoka', sans-serif;
          background-color: #fdfaf9;
          /* Subtle candy cane stripe pattern background */
          background-image: repeating-linear-gradient(45deg, transparent 0, transparent 20px, rgba(255, 0, 0, 0.01) 20px, rgba(255, 0, 0, 0.01) 40px);
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
