// build.js
const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/index.js"],
  bundle: true,
  platform: "node",
  outfile: "dist/game_engine.bundle.js",
  format: "cjs", // commonjs format for better compatibility
  target: ["es2020"],
}).catch(() => process.exit(1));


// node build.js
