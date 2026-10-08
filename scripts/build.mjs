import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const dist = resolve(root, "dist");

const [html, css, js, runtime, hosting] = await Promise.all([
  readFile(resolve(root, "client/index.html"), "utf8"),
  readFile(resolve(root, "client/style.css"), "utf8"),
  readFile(resolve(root, "client/game.js"), "utf8"),
  readFile(resolve(root, "worker/runtime.js"), "utf8"),
  readFile(resolve(root, ".openai/hosting.json"), "utf8"),
]);

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await mkdir(resolve(dist, ".openai"), { recursive: true });

const workerSource = `const ASSETS = ${JSON.stringify({ html, css, js })};\n${runtime}`;
await writeFile(resolve(dist, "server/index.js"), workerSource, "utf8");
await writeFile(resolve(dist, ".openai/hosting.json"), hosting, "utf8");

console.log("Built online Worker site");
