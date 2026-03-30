import sharp from "sharp";
import { readdir } from "fs/promises";
import path from "path";

const projectDir = "public/images/projects";

async function main() {
  const files = await readdir(projectDir);
  const results = {};

  for (const file of files) {
    if (file.match(/\.png$/i)) {
      const input = path.join(projectDir, file);
      const placeholder = await sharp(input)
        .resize(20, null, { withoutEnlargement: true })
        .blur(2)
        .webp({ quality: 20 })
        .toBuffer();
      const slug = file.replace(/\.png$/i, "");
      results[slug] = `data:image/webp;base64,${placeholder.toString("base64")}`;
    }
  }

  // Also profile
  const profilePlaceholder = await sharp("public/images/profile.jpg")
    .resize(16, 16)
    .blur(2)
    .webp({ quality: 20 })
    .toBuffer();
  results["profile"] = `data:image/webp;base64,${profilePlaceholder.toString("base64")}`;

  console.log("export const blurPlaceholders: Record<string, string> = {");
  for (const [key, val] of Object.entries(results)) {
    console.log(`  "${key}": "${val}",`);
  }
  console.log("};");
}

main().catch(console.error);
