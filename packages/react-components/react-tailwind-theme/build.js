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
 * NO `project.json` on purpose. The workspace plugin creates its nodes from `project.json`
 * files and unconditionally infers `clean` / `format` / `type-check` targets (plus a
 * `build` target overriding this one, once the project is tagged `vNext`), none of which a
 * CSS-only package with no `src/`, no tsconfig and no TypeScript can satisfy. nx still sees
 * this package — it is inferred from `package.json` (project name
 * `@fluentui/react-tailwind-theme`, targets `build` / `generate-tokens-css` /
 * `verify-tokens-css` from the scripts above) — it just carries no nx tags.
 *
 * PACKAGING (Phase 3 / D13, settled): the theme reaches consumers as this published package,
 * not as a suite-level convenience stylesheet. Consumers import
 * `@fluentui/react-tailwind-theme/styles.css` exactly once at their document root; see
 * README.md.
 *
 * `dist/` is gitignored, and the release pipeline builds by nx tag (`nx run-many -t build -p
 * tag:vNext`), which does not select an untagged project. So the emission is ALSO wired to
 * the `prepack` script: `npm pack` and `npm publish` run it, which is what guarantees
 * `dist/styles.css` is in the tarball regardless of whether a prior build step ran.
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
