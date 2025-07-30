import fs from "fs";
import frontMatter from "front-matter";

const requiredFields = ["title", "description", "author", "date", "readTime"];

const files = fs.readdirSync("./posts").filter((f) => f.endsWith(".md"));

let hasError = false;
for (const file of files) {
  const content = fs.readFileSync(`./posts/${file}`, "utf-8");
  const { attributes } = frontMatter(content);

  const missing = requiredFields.filter((f) => !attributes[f]);
  if (missing.length > 0) {
    console.error(`❌ ${file} missing fields: ${missing.join(", ")}`);
    hasError = true;
  }
}

if (hasError) process.exit(1);
console.log("✅ All posts have valid front-matter.");
