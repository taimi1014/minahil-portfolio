import sharp from "sharp";
import { stat } from "fs/promises";
import path from "path";

const SRC = path.join(process.env.HOME, "Downloads/minahil portfolio");
const DEST = "public/images/projects";
const MAX_WIDTH = 1200;

const files = [
  { src: "CredibleX.png", dest: "crediblex.webp" },
  { src: "TMC.png", dest: "tmc.webp" },
  { src: "Fams.png", dest: "fams.webp" },
  { src: "JettClass.png", dest: "jetclass.webp" },
  { src: "QATAR.png", dest: "qatar-mme.webp" },
];

async function main() {
  for (const f of files) {
    const input = path.join(SRC, f.src);
    const output = path.join(DEST, f.dest);

    await sharp(input)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(output);

    const inStat = await stat(input);
    const outStat = await stat(output);
    const savings = ((1 - outStat.size / inStat.size) * 100).toFixed(1);
    console.log(`${f.src} (${(inStat.size/1024).toFixed(0)}KB) -> ${f.dest} (${(outStat.size/1024).toFixed(0)}KB) — ${savings}% smaller`);
  }

  // Update blur placeholders
  console.log("\nBlur placeholders:");
  for (const f of files) {
    const input = path.join(DEST, f.dest);
    const placeholder = await sharp(input)
      .resize(20, null, { withoutEnlargement: true })
      .blur(2)
      .webp({ quality: 20 })
      .toBuffer();
    const slug = f.dest.replace(".webp", "");
    console.log(`  "${slug}": "data:image/webp;base64,${placeholder.toString("base64")}",`);
  }
}

main().catch(console.error);
