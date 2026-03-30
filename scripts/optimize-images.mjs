import sharp from "sharp";
import { readdir, mkdir, stat } from "fs/promises";
import path from "path";

const PUBLIC = "public/images";
const MAX_WIDTH = 1200; // Cards display at ~600px, 2x for retina

async function optimizeFile(inputPath, outputPath) {
  const info = await sharp(inputPath).metadata();
  const pipeline = sharp(inputPath);

  // Resize if wider than MAX_WIDTH
  if (info.width > MAX_WIDTH) {
    pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
  }

  // Convert to WebP with quality 82 (good balance)
  await pipeline.webp({ quality: 82, effort: 6 }).toFile(outputPath);

  const inputStat = await stat(inputPath);
  const outputStat = await stat(outputPath);
  const savings = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);
  console.log(
    `  ${path.basename(inputPath)}: ${(inputStat.size / 1024).toFixed(0)}KB -> ${(outputStat.size / 1024).toFixed(0)}KB (${savings}% smaller)`
  );
}

async function main() {
  console.log("Optimizing project images...");
  const projectDir = path.join(PUBLIC, "projects");
  const files = await readdir(projectDir);

  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const input = path.join(projectDir, file);
      const output = path.join(projectDir, file.replace(/\.(png|jpg|jpeg)$/i, ".webp"));
      await optimizeFile(input, output);
    }
  }

  // Also optimize profile photo
  console.log("\nOptimizing profile photo...");
  const profileIn = path.join(PUBLIC, "profile.jpg");
  const profileOut = path.join(PUBLIC, "profile.webp");
  await sharp(profileIn).resize(300, 300).webp({ quality: 85 }).toFile(profileOut);
  const pIn = await stat(profileIn);
  const pOut = await stat(profileOut);
  console.log(
    `  profile.jpg: ${(pIn.size / 1024).toFixed(0)}KB -> ${(pOut.size / 1024).toFixed(0)}KB (${((1 - pOut.size / pIn.size) * 100).toFixed(1)}% smaller)`
  );

  // Generate tiny blurred placeholders for LQIP
  console.log("\nGenerating blur placeholders...");
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const input = path.join(projectDir, file);
      const placeholder = await sharp(input)
        .resize(20, null, { withoutEnlargement: true })
        .blur(2)
        .webp({ quality: 20 })
        .toBuffer();
      const base64 = `data:image/webp;base64,${placeholder.toString("base64")}`;
      console.log(`  ${file}: placeholder ${placeholder.length}B`);
    }
  }

  console.log("\nDone! Now update src references to use .webp files.");
}

main().catch(console.error);
