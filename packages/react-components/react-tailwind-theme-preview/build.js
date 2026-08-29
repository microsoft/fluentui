/**
 * Emits the package's published CSS: everything a component sheet references, nothing a
 * component sheet duplicates. Every artifact must contain zero `@property` rules — a
 * non-empty registry puts Blink's transition-start on a page-global slow path.
 *
 *   css/emit.css           → dist/base.css              the THEME-LESS base sheet
 *   css/themes/<name>.css  → dist/themes/<name>.css     one file per shipped theme
 *   css/emit-monolith.css  → dist/styles.css            base + all seven, zero-config
 *
 * THE CONTRACT (operator ruling 2026-08-28, "Theme delivery"): import the base, import the
 * theme file(s) you use, apply the class — the exact shape of Griffel's
 * `import { webLightTheme }` + `<FluentProvider theme={webLightTheme}>`. No default theme is
 * baked into any artifact, so a consumer who ships only dark never pays for light.
 *
 * The theme files run through the same PostCSS/Tailwind pass as the base rather than being
 * copied, so a theme's bytes are identical whether they arrive via `dist/themes/*.css` or
 * inlined in `dist/styles.css` — asserted below, because a divergence there would mean the
 * two delivery routes could render differently.
 *
 * No `project.json` on purpose: the workspace plugin would infer type-check/format/build
 * targets a CSS-only package cannot satisfy; nx infers this project from package.json.
 * The release pipeline selects by nx tag and skips untagged projects, so the emission is
 * also wired to `prepack` to guarantee the artifacts land in the tarball.
 */
const { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const { basename, join } = require('node:path');

const postcss = require('postcss');
// Plugin CREATOR — must be invoked (see tools/workspace-plugin/.../lib/css-modules.ts).
const tailwindcss = require('@tailwindcss/postcss');

const packageRoot = __dirname;
const cssDir = join(packageRoot, 'css');
const themesSourceDir = join(cssDir, 'themes');
const outputDir = join(packageRoot, 'dist');
const themesOutputDir = join(outputDir, 'themes');

/**
 * @param {string} entry absolute path of the CSS entry to compile
 * @param {string} output absolute path to write
 * @returns {Promise<string>} the compiled CSS
 */
async function compile(entry, output) {
  const result = await postcss([tailwindcss()]).process(readFileSync(entry, 'utf8'), {
    from: entry,
    to: output,
    map: false,
  });

  // Checkout line endings must not leak into published artifacts: `core.autocrlf` gives
  // Windows working copies CRLF sources, PostCSS preserves whatever it is fed, and the
  // route-equivalence matching below is LF-exact. Normalizing here keeps the shipped bytes
  // identical on every platform — the same normalization the generator's `--check` applies.
  const css = result.css.replace(/\r\n/g, '\n');

  writeFileSync(output, css);
  return css;
}

/**
 * `@property` in a published artifact is a measured perf regression — fail the build.
 *
 * @param {string} name
 * @param {string} css
 */
function assertNoRegisteredProperties(name, css) {
  if (/@property\b/.test(css)) {
    throw new Error(`${name} contains an @property rule; a non-empty registry slows transition-start page-wide.`);
  }
}

/**
 * The declarations of the `.fui-theme-*` rule in a compiled theme sheet, as
 * `--name: value;` lines with internal whitespace collapsed.
 *
 * Whitespace is normalized rather than compared, because it legitimately differs between
 * the two routes: a long value prettier wrapped across lines in the source (`--font-base`'s
 * font stack) survives verbatim when Tailwind compiles that file directly, and is
 * re-serialized onto one line when the same file arrives through `@import`. What must match
 * is the declaration set, which is what this returns. Custom-property values never contain a
 * brace, so scanning to the rule's closing brace is exact without a CSS parser.
 *
 * @param {string} css
 * @returns {string[] | null}
 */
function themeDeclarations(css) {
  const start = css.search(/^\s*\.fui-theme-[a-z0-9-]+ \{$/m);

  if (start < 0) {
    return null;
  }

  const end = css.indexOf('\n  }\n', start);

  if (end < 0) {
    return null;
  }

  const body = css.slice(css.indexOf('{', start) + 1, end);

  return Array.from(
    body.matchAll(/(--[a-z0-9-]+):([^;]*);/g),
    ([, name, value]) => `${name}: ${value.trim().replace(/\s+/g, ' ')};`,
  );
}

async function main() {
  mkdirSync(themesOutputDir, { recursive: true });

  // Stale output must not survive a theme being dropped upstream — the export map would keep
  // resolving a file the contract no longer contains.
  for (const stale of readdirSync(themesOutputDir)) {
    rmSync(join(themesOutputDir, stale), { force: true });
  }

  const base = await compile(join(cssDir, 'emit.css'), join(outputDir, 'base.css'));
  assertNoRegisteredProperties('dist/base.css', base);

  /** @type {{ name: string, bytes: number }[]} */
  const themes = [];

  for (const file of readdirSync(themesSourceDir).sort()) {
    if (!file.endsWith('.css')) {
      continue;
    }

    const css = await compile(join(themesSourceDir, file), join(themesOutputDir, file));
    assertNoRegisteredProperties(`dist/themes/${file}`, css);
    themes.push({ name: basename(file, '.css'), bytes: Buffer.byteLength(css) });
  }

  const monolith = await compile(join(cssDir, 'emit-monolith.css'), join(outputDir, 'styles.css'));
  assertNoRegisteredProperties('dist/styles.css', monolith);

  // Both delivery routes must ship the same declarations for a theme. The comparison is the
  // CLASS RULE, not the whole file: standalone files carry a provenance header the monolith
  // drops, and the monolith merges all seven into a single `@layer fui.theme` block.
  const monolithDeclarations = new Set(
    Array.from(monolith.matchAll(/\.fui-theme-[a-z0-9-]+ \{[\s\S]*?\n {2}\}/g), ([rule]) =>
      (themeDeclarations(rule + '\n') ?? []).join('\n'),
    ),
  );

  for (const { name } of themes) {
    const declarations = themeDeclarations(readFileSync(join(themesOutputDir, `${name}.css`), 'utf8'));

    if (!declarations?.length) {
      throw new Error(`dist/themes/${name}.css contains no theme class declarations.`);
    }

    if (!monolithDeclarations.has(declarations.join('\n'))) {
      throw new Error(
        `dist/styles.css does not carry the declarations from dist/themes/${name}.css — the monolith ` +
          `and the per-theme file would render differently.`,
      );
    }
  }

  const themeSummary = themes.map(({ name, bytes }) => `${name} ${bytes}`).join(', ');

  console.log(
    `🎨 @fluentui/react-tailwind-theme-preview: emitted dist/base.css (${Buffer.byteLength(base)} bytes), ` +
      `${themes.length} themes (${themeSummary}), dist/styles.css (${Buffer.byteLength(monolith)} bytes)`,
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
