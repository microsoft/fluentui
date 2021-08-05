// Manually run this script to generate a version of homepage.htm which includes the compiled and
// minified bootstrap JS for the actual public site.
// (This script is only meant to be used within master, not in the other branches.)

// @ts-check
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dest = process.argv[2];
if (!dest) {
  console.error('Must pass destination directory as an argument to the script');
  process.exit(1);
}

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

const rollupCommand = 'yarn --silent rollup';

// first rollup run: resolve imports relative to the original file
// (--silent prevents yarn headers from being printed with output)
const loadSitePath = path.resolve(__dirname, '../lib/loadSite.js');
const prelimJsPath = path.join(dest, 'homepage.prelim.js');
execSync(`${rollupCommand} ${loadSitePath} -o ${prelimJsPath}`, { stdio: 'pipe' });

// replace process.env.LOCAL with false so rollup will shake out code that isn't needed for the real site
const prelimJs = fs.readFileSync(prelimJsPath, 'utf8').replace(/process\.env\.LOCAL\b/g, 'false');
fs.writeFileSync(prelimJsPath, prelimJs);

// write debug version of JS (with rollup but without terser) to make it easier to ensure it's reasonable
const rollupArgs = `-f iife -i ${prelimJsPath}`;
const debugDest = path.join(dest, 'homepage.debug.js');
execSync(`${rollupCommand} ${rollupArgs} -o ${debugDest}`, { stdio: 'pipe' });
console.log(`\nWrote non-minified version of JS to ${debugDest} (please verify that it looks correct)\n`);

// run rollup with terser to shake out unused code and minify
const finalJs = execSync(`${rollupCommand} ${rollupArgs} -p rollup-plugin-terser`, { stdio: 'pipe' });
// delete the preliminary file
fs.unlinkSync(prelimJsPath);

// copy homepage.htm to temp directory and add rollup'd output
let homepageContent = fs.readFileSync(path.resolve(__dirname, '../homepage.htm'), 'utf8');
homepageContent += `
<script type="text/javascript">
${finalJs}
</script>
`;
// remove comments and extra newlines
homepageContent = homepageContent
  .replace(/^\s*\/\/.*(\r?\n)+/gm, '')
  .replace(/<!--[\s\S]+?-->(\r?\n?)*/g, '')
  .replace(/\n{2,}/g, '\n');

const homepageDest = path.join(dest, 'homepage.htm');
fs.writeFileSync(homepageDest, homepageContent);
console.log(`Wrote ${homepageDest} (commit this file to the internal repo to make the changes live)\n`);
