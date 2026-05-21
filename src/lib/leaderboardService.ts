import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface LeaderboardEntry {
  id?: string;
  name: string;
  moves: number;
  time: number; // seconds
  difficulty: "easy" | "medium" | "hard";
  createdAt?: Timestamp | ReturnType<typeof serverTimestamp>;
}

export interface LeaderboardEntryWithId extends LeaderboardEntry {
  id: string;
}

const COLLECTION_NAME = "leaderboard";

/**
 * Submit a new score to the leaderboard.
 */
export async function submitScore(entry: Omit<LeaderboardEntry, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...entry,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Fetch the top N scores from the leaderboard.
 * Sorts by moves ascending (fewer = better), then by time ascending (faster = better).
 */
export async function getTopScores(
  count: number = 10,
  difficulty?: "easy" | "medium" | "hard"
): Promise<LeaderboardEntryWithId[]> {
  // Single orderBy to avoid requiring a composite index in Firestore
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("moves", "asc"),
    limit(50)
  );

  const snapshot = await getDocs(q);
  let entries: LeaderboardEntryWithId[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as LeaderboardEntry),
  }));

  // Filter by difficulty if specified
  if (difficulty) {
    entries = entries.filter((e) => e.difficulty === difficulty);
  }

  // Secondary sort: for same move count, faster time wins
  entries.sort((a, b) => a.moves - b.moves || a.time - b.time);

  return entries.slice(0, count);
}

/**
 * Format time as M:SS
 */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Generate a shareable text for the score.
 */
export function generateShareText(name: string, moves: number, time: number, difficulty: string): string {
  return `🧠 I just scored ${moves} moves in ${formatTime(time)} on the Tech Stack Memory Game (${difficulty} mode) on Vishal Mache's portfolio! Can you beat me? 🎮\n\nhttps://vishalmache.dev`;
}
