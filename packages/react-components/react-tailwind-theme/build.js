/**
 * Emits the theme root artifact: `css/emit.css` → `dist/styles.css`, plain CSS.
 *
 * DECISIONS.md D13 — the document imports the theme stylesheet EXACTLY ONCE; component
 * packages' `dist/styles.css` contain component rules only and never embed this emission.
 * The output holds the `@layer` order statement, the `@theme` custom properties
 * (`--base-scale`, `--spacing`), the 4 stroke widths (`--spacing-thin` … `--spacing-thickest`,
 * the only token registrations that emit a variable — border/outline widths do not consume
 * the `--spacing-*` namespace, so modules reference them directly) and the focus-knob
 * `@property` registrations. Everything a component sheet references, nothing a component
 * sheet duplicates.
 *
 * NOT wired into nx on purpose (Phase 1.5). The workspace plugin creates its nodes from
 * `project.json` files, so adding one here would newly infer lint / format / type-check /
 * verify-packaging targets that a CSS-only package cannot satisfy. This package is also
 * still `"private": true` at version 0.0.0 — how the theme reaches real consumers
 * (published package vs. a suite-level convenience stylesheet, both sanctioned by D13) is
 * an open packaging decision, not something to settle by side effect here.
 *
 * Usage: node packages/react-components/react-tailwind-theme/build.js
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

  console.log(`🎨 @fluentui/react-tailwind-theme: emitted dist/styles.css (${Buffer.byteLength(result.css)} bytes)`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
