import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { cards } from "../src/data/cards.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "assets", "cards");
const execFileAsync = promisify(execFile);
const userAgent =
  "lenormand-veil-card-art/1.0 (+https://github.com/nanapaknanapak-huemirit/lenormand-veil)";

// Scene crops are measured on 960px-wide reference images. Each anchor is the
// centre of the purple number disc at the top-left of a card; the painted
// scene starts below the playing-card inset.
const sceneBox = { offsetX: -16, offsetY: 100, size: 160 };

const sheets = [
  {
    name: "BM 1896,0501.308",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/75/Print%2C_playing-card_%28BM_1896%2C0501.308%29.jpg",
    fallbackUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Print%2C_playing-card_%28BM_1896%2C0501.308%29.jpg/960px-Print%2C_playing-card_%28BM_1896%2C0501.308%29.jpg",
    sha1: "e7ae9941d347faea976ca455cf1fcaeb3f21914e",
    reference: { width: 960, height: 1207 },
    cards: [
      { slug: "woman", x: 15, y: 45 },
      { slug: "tower", x: 200, y: 32 },
      { slug: "letter", x: 384, y: 34 },
      { slug: "garden", x: 563, y: 40 },
      { slug: "anchor", x: 743, y: 41 },
      { slug: "ship", x: 113, y: 326 },
      { slug: "child", x: 296, y: 329 },
      { slug: "bouquet", x: 477, y: 335 },
      { slug: "lily", x: 660, y: 336 },
      { slug: "sun", x: 30, y: 628 },
      { slug: "clover", x: 218, y: 622 },
      { slug: "birds", x: 398, y: 626 },
      { slug: "key", x: 576, y: 630 },
      { slug: "coffin", x: 755, y: 632 },
      { slug: "book", x: 31, y: 921 },
      { slug: "scythe", x: 214, y: 920 },
      { slug: "crossroads", x: 400, y: 924 },
      { slug: "fish", x: 575, y: 919 }
    ]
  },
  {
    name: "BM 1896,0501.308 1",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Print%2C_playing-card_%28BM_1896%2C0501.308_1%29.jpg",
    fallbackUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Print%2C_playing-card_%28BM_1896%2C0501.308_1%29.jpg/960px-Print%2C_playing-card_%28BM_1896%2C0501.308_1%29.jpg",
    sha1: "2bab6b32bf20f32a63f97db2d9e6ae4773940afb",
    reference: { width: 960, height: 1229 },
    cards: [
      { slug: "man", x: 46, y: 68 },
      { slug: "star", x: 237, y: 66 },
      { slug: "tree", x: 424, y: 61 },
      { slug: "moon", x: 606, y: 61 },
      { slug: "rider", x: 791, y: 55 },
      { slug: "dog", x: 129, y: 367 },
      { slug: "heart", x: 310, y: 367 },
      { slug: "stork", x: 499, y: 366 },
      { slug: "house", x: 684, y: 362 },
      { slug: "ring", x: 28, y: 658 },
      { slug: "cross", x: 218, y: 660 },
      { slug: "mice", x: 397, y: 663 },
      { slug: "mountain", x: 577, y: 660 },
      { slug: "fox", x: 769, y: 657 },
      { slug: "bear", x: 138, y: 960 },
      { slug: "whip", x: 331, y: 961 },
      { slug: "snake", x: 512, y: 964 },
      { slug: "clouds", x: 692, y: 961 }
    ]
  }
];

async function download(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "user-agent": userAgent } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
  throw lastError;
}

async function leaveSource(sheet, tempDir) {
  let buffer;
  let original = true;
  try {
    buffer = await download(sheet.url);
  } catch (error) {
    original = false;
    console.warn(`fallback ${sheet.name}: ${error.message}`);
    buffer = await download(sheet.fallbackUrl);
  }

  if (original) {
    const digest = createHash("sha1").update(buffer).digest("hex");
    if (digest !== sheet.sha1) {
      throw new Error(`SHA-1 mismatch for ${sheet.name}: expected ${sheet.sha1}, got ${digest}`);
    }
  }

  const file = path.join(tempDir, `${sheet.sha1.slice(0, 8)}.jpg`);
  await writeFile(file, buffer);
  const { stdout } = await execFileAsync("magick", ["identify", "-format", "%w %h", file]);
  const [width, height] = stdout.trim().split(/\s+/).map(Number);
  return { file, width, height };
}

async function cropCard(source, sheet, entry) {
  const scaleX = source.width / sheet.reference.width;
  const scaleY = source.height / sheet.reference.height;
  const size = Math.round(sceneBox.size * ((scaleX + scaleY) / 2));
  const x = Math.max(
    0,
    Math.min(source.width - size, Math.round((entry.x + sceneBox.offsetX) * scaleX))
  );
  const y = Math.max(
    0,
    Math.min(source.height - size, Math.round((entry.y + sceneBox.offsetY) * scaleY))
  );
  const output = path.join(outDir, `${entry.slug}.webp`);

  await execFileAsync("magick", [
    source.file,
    "-crop",
    `${size}x${size}+${x}+${y}`,
    "+repage",
    "-resize",
    "384x384",
    "-filter",
    "Lanczos",
    "-modulate",
    "100,104,100",
    "-brightness-contrast",
    "0x4",
    "-unsharp",
    "0x0.65+0.5+0.02",
    "-strip",
    "-quality",
    "86",
    output
  ]);

  return output;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "lenormand-cards-"));
  const written = new Set();
  let total = 0;

  try {
    for (const sheet of sheets) {
      const source = await leaveSource(sheet, tempDir);
      console.log(`sheet ${sheet.name} (${source.width}x${source.height})`);

      for (const entry of sheet.cards) {
        const output = await cropCard(source, sheet, entry);
        const { size } = await stat(output);
        total += size;
        written.add(entry.slug);
        console.log(
          `ok   ${entry.slug.padEnd(10)} -> ${path.basename(output)} (${Math.round(size / 1024)} KB)`
        );
      }
    }

    const missing = cards.filter((card) => !written.has(card.slug));
    if (missing.length) {
      throw new Error(`Missing card art for: ${missing.map((card) => card.slug).join(", ")}`);
    }

    console.log(`\nWrote ${written.size} card images (${Math.round(total / 1024)} KB total).`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
