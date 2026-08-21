// @ts-check
/**
 * Emits `theme-values.json` — a committed snapshot of the 7 shipped theme objects'
 * token values.
 *
 * WHY A SNAPSHOT: this package's generator
 * (`scripts/generate-tokens-css.js`) deliberately has no dependency edge on this
 * package's BUILD output — a fresh clone must be able to regenerate/verify its CSS
 * without building anything. The theme VALUES, however, are computed
 * (`createLightTheme(brandWeb)`, …), so they cannot be text-scraped from source the way
 * `tokens.ts` is. This committed JSON is the bridge: the CSS generator reads it, and
 * `--check` verifies it against the built tokens package.
 *
 * Regenerating (when a theme value intentionally changes): `yarn nx run tokens:build`,
 * then `node scripts/generate-theme-values.js` from this package.
 *
 * `--check` exits non-zero when the committed file is missing or stale.
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '..', '..', '..');
const OUTPUT = path.join(PACKAGE_ROOT, 'theme-values.json');

/** The shipped themes. Keep in sync with `src/themes/index.ts` and `src/themes/themeClassNames.ts`. */
const THEME_NAMES = [
  'webLightTheme',
  'webDarkTheme',
  'teamsLightTheme',
  'teamsDarkTheme',
  'teamsHighContrastTheme',
  'teamsLightV21Theme',
  'teamsDarkV21Theme',
];

function loadThemes() {
  const libEntry = path.join(REPO_ROOT, 'packages', 'tokens', 'lib-commonjs', 'index.cjs');

  if (!fs.existsSync(libEntry)) {
    throw new Error(
      `Cannot find built output at ${libEntry}. Run \`yarn nx run tokens:build\` first — ` +
        'theme values are computed (createLightTheme etc.), so the snapshot is generated from the built package.',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const tokensPackage = require(libEntry);
  /** @type {Record<string, Record<string, string>>} */
  const themes = {};

  for (const name of THEME_NAMES) {
    const theme = tokensPackage[name];

    if (!theme || typeof theme !== 'object') {
      throw new Error(`Theme \`${name}\` is missing from the built package — shipped-theme set drifted.`);
    }

    themes[name] = theme;
  }

  return themes;
}

function render() {
  const themes = loadThemes();
  const packageJson = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8'));

  const document = {
    $schema: 'fluent-theme-values',
    description:
      'Committed snapshot of the shipped Fluent theme objects (theme key -> value). ' +
      'Consumed by scripts/generate-tokens-css.js to emit the static theme CSS classes. ' +
      'Regenerate after yarn nx run tokens:build.',
    generatedBy: 'packages/react-components/react-tailwind-theme-preview/scripts/generate-theme-values.js',
    source: `${packageJson.name}@${packageJson.version}`,
    themes,
  };

  return `${JSON.stringify(document, null, 2)}\n`;
}

function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const contents = render();

  if (check) {
    if (!fs.existsSync(OUTPUT)) {
      console.error(`MISSING: ${OUTPUT} — run \`node scripts/generate-theme-values.js\`.`);
      process.exitCode = 1;
      return;
    }

    const existing = fs.readFileSync(OUTPUT, 'utf8').replace(/\r\n/g, '\n');

    if (existing !== contents) {
      console.error(`STALE: ${OUTPUT} — run \`node scripts/generate-theme-values.js\`.`);
      process.exitCode = 1;
      return;
    }

    console.log(`OK: ${OUTPUT} is current.`);
    return;
  }

  fs.writeFileSync(OUTPUT, contents);
  console.log(`Wrote ${OUTPUT}.`);
}

if (require.main === module) {
  main();
}

module.exports = { THEME_NAMES, loadThemes, render, OUTPUT };
