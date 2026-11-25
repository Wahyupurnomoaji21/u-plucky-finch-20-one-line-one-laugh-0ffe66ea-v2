// One Line, One Laugh — v2 entry program.
//
// Writes one funny line to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output).
//
// The judge is head-to-head and rewards, in order: funny on its own,
// a fast punchline inside the line, a fresh angle, tight wording, and
// repeatability. v1 (password manager, 41.66%, R1 1479/1879) lost on
// angle: the irony was clear but the gag was a familiar tech-support
// shape. v2 changes the concept entirely — a kitchen appliance, not
// software — so the joke is one concrete image plus one absurd twist.
//
// Candidates weighed for v2 (all fresh concepts, none from v1's list):
//   1. "My toaster has two settings: 'bread' and 'evidence of arson'."
//      61 chars. One sentence, punchline in the last three words.
//      Concrete image, instant twist, reads in a single pass.
//   2. "I asked my cat for emotional support. She charged me in tuna
//      and left a one-star review." 88 chars. Two jokes stacked, but
//      the second beat (one-star review) needs the first to set it up.
//   3. "My GPS rerouted me past my ex's house and whispered, 'closure
//      is two minutes away.'" 83 chars. Relatable, but the whisper
//      framing softens the punch and "closure" is a well-worn word.
//   4. "I named my houseplant Kevin so I'd feel guilty neglecting him.
//      Kevin has now filed for emancipation." 100 chars. Good
//      escalation, but two sentences and the joke arrives late.
//   5. "My dog learned to open the fridge. He only steals the good
//      cheese and leaves a note saying 'we need to talk.'" 109 chars.
//      Funny image, but long and the note gag is doing the real work.
//   6. "My smartwatch congratulated me on eight hours of sleep. I was
//      awake the whole time, staring at the ceiling." 107 chars.
//      Solid irony, but "awake all night" is a familiar complaint.
//
// CHOSEN: candidate 1, the toaster. Shortest of the six, fastest
// punchline, tightest wording, easiest to repeat out loud — and the
// kicker ("evidence of arson") is a concrete noun phrase nobody
// expects as a toaster setting.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE = "My toaster has two settings: 'bread' and 'evidence of arson'.";

function checkLine(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 chars, got ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("line must not contain a newline");
  }
  if (text.trim() !== text) {
    throw new Error("line must not start or end with whitespace");
  }
  if (Buffer.byteLength(text, "utf8") > 200) {
    throw new Error("line must be at most 200 bytes");
  }
}

checkLine(LINE);

// Resolve the output directory from the environment, never from the
// process working directory: the grader runs this file from elsewhere.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");
mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LINE, "utf8");

// The module's own directory, derived from this file's URL, never from
// the process working directory: the grader runs this file from
// elsewhere, so no path here may depend on process.cwd().
const selfDir = fileURLToPath(new URL(".", import.meta.url));
console.log(
  `entry: ${LINE.length} chars, ${Buffer.byteLength(LINE, "utf8")} bytes ` +
    `from ${selfDir} -> ${entryPath}`,
);
