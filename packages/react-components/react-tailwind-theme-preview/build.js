/**
 * Emits `css/emit.css` → `dist/styles.css` (plain CSS): everything a component sheet
 * references, nothing a component sheet duplicates. The artifact must contain zero
 * `@property` rules — a non-empty registry puts Blink's transition-start on a
 * page-global slow path.
 *
 * No `project.json` on purpose: the workspace plugin would infer type-check/format/build
 * targets a CSS-only package cannot satisfy; nx infers this project from package.json.
 * The release pipeline selects by nx tag and skips untagged projects, so the emission is
 * also wired to `prepack` to guarantee dist/styles.css lands in the tarball.
 */
const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const postcss = require('postcss');
// Plugin CREATOR — must be invoked (see tools/workspace-plugin/.../lib/css-modules.ts).
const tailwindcss = require('@tailwindcss/postcss');

const packageRoot = __dirname;
const entry = join(packageRoot, 'css', 'emit.css');
const outputDir = join(packageRoot, 'dist');
const output = join(outputDir, 'styles.css');

async function main() {
  const result = await postcss([tailwindcss()]).process(readFileSync(entry, 'utf8'), {
    from: entry,
    to: output,
    map: false,
  });

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(output, result.css);

  console.log(
    `🎨 @fluentui/react-tailwind-theme-preview: emitted dist/styles.css (${Buffer.byteLength(result.css)} bytes)`,
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
