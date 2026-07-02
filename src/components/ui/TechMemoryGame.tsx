"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  submitScore,
  getTopScores,
  formatTime,
  generateShareText,
  type LeaderboardEntryWithId,
} from "@/lib/leaderboardService";

/* ──────────────────────────────────────────
   Types & Constants
   ────────────────────────────────────────── */

interface TechCard {
  id: number;
  name: string;
  icon: string;
  pairId: number;
}

const TECH_ICONS = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
];

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_CONFIG: Record<Difficulty, { pairs: number; cols: string }> = {
  easy:   { pairs: 4,  cols: "grid-cols-4" },
  medium: { pairs: 6,  cols: "grid-cols-4" },
  hard:   { pairs: 8,  cols: "grid-cols-4" },
};

/* ──────────────────────────────────────────
   Helpers
   ────────────────────────────────────────── */

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(difficulty: Difficulty): TechCard[] {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];
  const selected = shuffleArray(TECH_ICONS).slice(0, pairs);
  const cards: TechCard[] = [];
  selected.forEach((tech, idx) => {
    cards.push({ id: idx * 2,     name: tech.name, icon: tech.icon, pairId: idx });
    cards.push({ id: idx * 2 + 1, name: tech.name, icon: tech.icon, pairId: idx });
  });
  return shuffleArray(cards);
}

function getStarCount(moves: number, difficulty: Difficulty): number {
  const thresholds: Record<Difficulty, [number, number, number]> = {
    easy:   [6, 10, 16],
    medium: [8, 14, 22],
    hard:   [12, 20, 30],
  };
  const t = thresholds[difficulty];
  if (moves <= t[0]) return 3;
  if (moves <= t[1]) return 2;
  if (moves <= t[2]) return 1;
  return 0;
}

/* ──────────────────────────────────────────
   Component
   ────────────────────────────────────────── */

interface TechMemoryGameProps {
  onClose: () => void;
}

type GamePhase = "playing" | "won" | "submitting" | "leaderboard";

export default function TechMemoryGame({ onClose }: TechMemoryGameProps) {
  // Game state
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [cards, setCards] = useState<TechCard[]>(() => buildDeck("medium"));
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Post-game state
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryWithId[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardFilter, setLeaderboardFilter] = useState<Difficulty | "all">("hard");

  // Timer
  useEffect(() => {
    if (gameStarted && phase === "playing") {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, phase]);

  // Check for game completion
  useEffect(() => {
    if (matched.size > 0 && matched.size === cards.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeout(() => setPhase("won"), 600);
    }
  }, [matched, cards.length]);

  // Fetch leaderboard on mount and when filter changes
  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardLoading(true);
    try {
      const diffFilter = leaderboardFilter === "all" ? undefined : leaderboardFilter;
      const scores = await getTopScores(10, diffFilter);
      setLeaderboard(scores);
    } catch (err) {
      console.warn("Leaderboard fetch failed:", err instanceof Error ? err.message : err);
      setLeaderboard([]);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [leaderboardFilter]);

  // Auto-fetch on mount and filter change
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  /* ── Card click handler ── */
  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isChecking || phase !== "playing") return;
      if (flipped.has(cardId) || matched.has(cardId)) return;
      if (selected.length >= 2) return;

      if (!gameStarted) setGameStarted(true);

      const newFlipped = new Set(flipped);
      newFlipped.add(cardId);
      setFlipped(newFlipped);

      const newSelected = [...selected, cardId];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setMoves((m) => m + 1);
        setIsChecking(true);

        const card1 = cards.find((c) => c.id === newSelected[0])!;
        const card2 = cards.find((c) => c.id === newSelected[1])!;

        if (card1.pairId === card2.pairId) {
          setTimeout(() => {
            setMatched((prev) => {
              const next = new Set(prev);
              next.add(newSelected[0]);
              next.add(newSelected[1]);
              return next;
            });
            setSelected([]);
            setIsChecking(false);
          }, 500);
        } else {
          setTimeout(() => {
            setFlipped((prev) => {
              const next = new Set(prev);
              next.delete(newSelected[0]);
              next.delete(newSelected[1]);
              return next;
            });
            setSelected([]);
            setIsChecking(false);
          }, 900);
        }
      }
    },
    [cards, flipped, matched, selected, isChecking, gameStarted, phase]
  );

  /* ── Score submission ── */
  const handleSubmitScore = async () => {
    if (!playerName.trim()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitScore({
        name: playerName.trim(),
        moves,
        time: timer,
        difficulty,
      });
      setPhase("leaderboard");
      // Refresh leaderboard to show new score
      fetchLeaderboard();
    } catch (err) {
      setSubmitError("Failed to submit score. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Share score ── */
  const handleShare = () => {
    const text = generateShareText(playerName || "A player", moves, timer, difficulty);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  /* ── Reset game ── */
  const resetGame = useCallback(
    (diff?: Difficulty) => {
      const d = diff ?? difficulty;
      setDifficulty(d);
      setCards(buildDeck(d));
      setFlipped(new Set());
      setMatched(new Set());
      setSelected([]);
      setMoves(0);
      setTimer(0);
      setGameStarted(false);
      setIsChecking(false);
      setPhase("playing");
      setPlayerName("");
      setSubmitError(null);
      setCopied(false);
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [difficulty]
  );

  const { cols } = DIFFICULTY_CONFIG[difficulty];
  const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
  const stars = getStarCount(moves, difficulty);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 select-none">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* ──────── LEFT: Game Grid Area ──────── */}
        <div className="flex-1 w-full">
          {/* Header Controls & Flat Minimal Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex gap-1.5">
              {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => resetGame(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-full font-display text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-zinc-400/40 dark:border-zinc-800/60",
                    difficulty === d
                      ? "bg-text text-bg border-text shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-700"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Flat text counters */}
            <div className="flex items-center gap-4 text-xs font-display text-zinc-600 dark:text-zinc-400">
              <span>Moves: <strong className="text-zinc-900 dark:text-zinc-100 font-bold tabular-nums">{moves}</strong></span>
              <span>Time: <strong className="text-zinc-900 dark:text-zinc-100 font-bold tabular-nums">{formatTime(timer)}</strong></span>
              <span>Matched: <strong className="text-zinc-900 dark:text-zinc-100 font-bold tabular-nums">{matched.size / 2}/{totalPairs}</strong></span>
            </div>
          </div>

          {/* Simple Cards Grid */}
          <div className={cn("grid gap-3", cols)}>
            {cards.map((card) => {
              const isFlipped = flipped.has(card.id) || matched.has(card.id);
              const isMatched = matched.has(card.id);

              return (
                <div
                  key={card.id}
                  className="cursor-pointer"
                  style={{ perspective: "600px" }}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div
                    className="relative w-full aspect-square"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {/* Simple Card Back */}
                    <div
                      className="absolute inset-0 rounded-xl border border-zinc-400/40 dark:border-zinc-800/50 bg-zinc-200/90 dark:bg-zinc-900/40 flex items-center justify-center hover:border-zinc-400 dark:hover:border-zinc-700 hover:scale-[1.02] transition-all duration-200"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold opacity-80">?</span>
                    </div>

                    {/* Simple Card Front */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-xl border flex flex-col items-center justify-center gap-1.5",
                        isMatched
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold"
                          : "bg-white dark:bg-zinc-950 border-zinc-400/30 dark:border-zinc-800/65",
                        "transition-all duration-300"
                      )}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <img src={card.icon} alt={card.name} className="w-8 h-8 object-contain" />
                      <span className="font-display text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 truncate max-w-full px-1">
                        {card.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple Bottom actions */}
          <div className="flex gap-2.5 mt-6">
            <button
              onClick={() => resetGame()}
              className="px-4 py-2 rounded-full border border-zinc-400/40 dark:border-zinc-800/65 text-xs font-display font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200"
            >
              Restart
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-zinc-400/40 dark:border-zinc-800/65 text-xs font-display font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* ──────── RIGHT: Leaderboard Panel ──────── */}
        <div className="w-full lg:w-[280px] shrink-0 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Rankings
            </h4>
            <button
              onClick={fetchLeaderboard}
              className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:text-zinc-100 transition-colors duration-200"
              title="Refresh rankings"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </button>
          </div>

          <LeaderboardPanel
            entries={leaderboard}
            loading={leaderboardLoading}
            filter={leaderboardFilter}
            onFilterChange={(f) => setLeaderboardFilter(f)}
          />
        </div>

      </div>

      {/* ═══════════════════════════════════
          WIN MODAL
         ═══════════════════════════════════ */}
      {(phase === "won" || phase === "submitting" || phase === "leaderboard") && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md dark:bg-zinc-950/70"
            onClick={() => {
              if (phase === "leaderboard") {
                setPhase("playing");
                resetGame();
              }
            }}
          />
          <div className="relative bg-zinc-100 dark:bg-zinc-900 w-full max-w-sm rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-2xl z-10 overflow-hidden">
            
            {phase === "won" || phase === "submitting" ? (
              /* ── Name Entry Phase ── */
              <div className="p-6 relative z-10">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🎉</div>
                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 tracking-tight uppercase">
                    Level Cleared!
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Completed in <span className="font-semibold text-zinc-900 dark:text-zinc-100">{moves} moves</span> & <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatTime(timer)}</span>
                  </p>
                </div>

                {/* Star rating */}
                <div className="flex items-center justify-center gap-1.5 mb-5 bg-zinc-200/60 dark:bg-zinc-950/40 p-2 rounded-xl border border-zinc-300/60 dark:border-zinc-800/40 w-fit mx-auto">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={i < stars ? "rgb(250,204,21)" : "none"}
                      stroke={i < stars ? "rgb(250,204,21)" : "currentColor"}
                      strokeWidth="1.5"
                      className={cn("transition-all duration-300", i < stars ? "scale-110" : "opacity-20")}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Submit Form */}
                <div className="space-y-3">
                  <label className="font-display text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                    Submit Score
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitScore()}
                    placeholder="Enter name..."
                    maxLength={20}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 font-body text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-text/30 focus:border-text transition-all duration-200"
                    autoFocus
                  />

                  {submitError && (
                    <p className="text-[10px] text-red-500">{submitError}</p>
                  )}

                  <div className="flex gap-2.5 pt-1">
                    <button
                      onClick={handleSubmitScore}
                      disabled={!playerName.trim() || isSubmitting}
                      className={cn(
                        "flex-1 px-4 py-2 rounded-full font-display text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 border",
                        playerName.trim() && !isSubmitting
                          ? "bg-text text-bg border-text hover:opacity-90"
                          : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 border-transparent cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? "Saving..." : "Save Score"}
                    </button>
                    <button
                      onClick={() => { setPhase("playing"); resetGame(); }}
                      className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-800 bg-transparent font-display text-[11px] font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all duration-200"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Success Phase ── */
              <div className="p-6 relative z-10">
                <div className="text-center mb-5">
                  <div className="text-3xl mb-1.5">🏆</div>
                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 uppercase">
                    Score Saved
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Your score has been updated successfully.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleShare}
                    className="flex-1 px-4 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-800 bg-transparent font-display text-[10px] font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    {copied ? "✓ Copied!" : "Share Score"}
                  </button>
                  <button
                    onClick={() => { setPhase("playing"); resetGame(); fetchLeaderboard(); }}
                    className="flex-1 px-4 py-2.5 rounded-full bg-text text-bg font-display text-[10px] font-semibold uppercase tracking-wider hover:opacity-90 transition-all duration-200"
                  >
                    Play Again
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="w-full mt-2.5 px-4 py-2 rounded-full border border-zinc-300/50 dark:border-zinc-800/30 font-display text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 transition-all duration-200 text-center"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────
   Leaderboard Panel Sub-component
   ────────────────────────────────────────── */

function LeaderboardPanel({
  entries,
  loading,
  filter,
  onFilterChange,
  highlightName,
}: {
  entries: LeaderboardEntryWithId[];
  loading: boolean;
  filter: "easy" | "medium" | "hard" | "all";
  onFilterChange: (f: "easy" | "medium" | "hard" | "all") => void;
  highlightName?: string;
}) {
  const medals = ["🥇", "🥈", "🥉"];
  const filters: ("all" | Difficulty)[] = ["all", "easy", "medium", "hard"];

  return (
    <div className="w-full">
      {/* Simple Filter tabs */}
      <div className="flex border-b border-zinc-300 dark:border-zinc-800/60">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={cn(
              "flex-1 py-2 font-display text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border-b-2 -mb-[2px]",
              filter === f
                ? "text-zinc-900 dark:text-zinc-100 border-text"
                : "text-zinc-500 dark:text-zinc-500 border-transparent hover:text-zinc-600 dark:text-zinc-400"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-[360px]">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <svg className="animate-spin h-5 w-5 text-zinc-500 dark:text-zinc-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-10 px-4">
            <p className="font-display text-xs font-semibold text-zinc-600 dark:text-zinc-400">No records</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-300 dark:border-zinc-800/60">
                <th className="py-2 px-2 text-left font-display text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 w-7">#</th>
                <th className="py-2 px-2 text-left font-display text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Player</th>
                <th className="py-2 px-2 text-center font-display text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Moves</th>
                <th className="py-2 px-2 text-center font-display text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Time</th>
                <th className="py-2 px-2 text-right font-display text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Lvl</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => {
                const isHighlighted = highlightName && entry.name === highlightName;
                return (
                  <tr
                    key={entry.id}
                    className={cn(
                      "border-b border-zinc-200/50 dark:border-zinc-800/30 transition-colors duration-150",
                      isHighlighted
                        ? "bg-zinc-400/10 dark:bg-zinc-800/30 font-semibold"
                        : "hover:bg-zinc-300/20 dark:hover:bg-zinc-900/30"
                    )}
                  >
                    <td className="py-2 px-2 font-body text-xs">
                      {i < 3 ? medals[i] : (
                        <span className="text-zinc-500 dark:text-zinc-500 text-[10px] tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
                      )}
                    </td>
                    <td className="py-2 px-2 font-display text-[11px] font-semibold tracking-tight truncate max-w-[90px] text-zinc-900 dark:text-zinc-100">
                      <span className="flex items-center gap-1">
                        {entry.name}
                        {isHighlighted && <span className="text-[8px] text-zinc-500 dark:text-zinc-500 opacity-70">(you)</span>}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center font-body text-[11px] text-zinc-600 dark:text-zinc-400 tabular-nums">
                      {entry.moves}
                    </td>
                    <td className="py-2 px-2 text-center font-body text-[11px] text-zinc-600 dark:text-zinc-400 tabular-nums">
                      {formatTime(entry.time)}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <span className={cn(
                        "font-display text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border",
                        entry.difficulty === "easy" && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                        entry.difficulty === "medium" && "bg-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-500/20",
                        entry.difficulty === "hard" && "bg-red-500/5 text-red-600 dark:text-red-400 border-red-500/20",
                      )}>
                        {entry.difficulty}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
