import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Last Words of a Doomed Agent — writes the single entry line to the
// grader's output directory as entry.txt. Node 22 stdlib only: no
// network, no clock, no dependencies. The entry text lives in entry.txt
// at the repo root so the program and the text it emits stay in plain
// sight, and the output is byte-for-byte that line (no trailing newline).
const botDir = process.env.MAKEFUN_BOT_DIR ?? process.cwd();
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const raw = readFileSync(join(botDir, "entry.txt"), "utf8");
const text = raw.replace(/\r\n/g, "\n").trimEnd();

if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), text, "utf8");
