/**
 * Generates design token artifacts from @fluentui/tokens:
 *
 * 1. src/theme/design-tokens.ts — TypeScript constants mapping token
 *    names to CSS custom property var() references.
 *
 * 2. public/fluent-tokens.css — A CSS stylesheet that provides all token
 *    values using light-dark() gated by data-theme attributes
 *    (e.g. data-theme="web-light").
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import tokensPackage from '@fluentui/tokens';
import prettier from 'prettier';

const { tokens, webLightTheme, webDarkTheme, teamsLightTheme, teamsDarkTheme } = tokensPackage;
const tokenNames = Object.keys(tokens);
const rootDir = join(import.meta.dirname, '..');

const rgbaPattern = /rgba?\([^)]+\)/g;

// ── 1. design-tokens.ts ─────────────────────────────────────────────────

const tsContent =
  '// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE\n' +
  tokenNames
    .map(
      t =>
        `
/**
 * CSS custom property value for the {@link @fluentui/tokens#${t} | \`${t}\`} design token.
 * @public
 */
export const ${t} = 'var(--${t})';`,
    )
    .join('\n') +
  '\n';

const tsDir = join(rootDir, 'src', 'theme');
mkdirSync(tsDir, { recursive: true });
writeFileSync(join(tsDir, 'design-tokens.ts'), tsContent);
console.log(`✔ ${tokenNames.length} token constants → src/theme/design-tokens.ts`);

// ── 2. fluent-tokens.css ────────────────────────────────────────────────

/**
 * Returns true when a token can safely be used inside `light-dark()`.
 * Per spec, `light-dark()` only accepts `<color>` or `<image>` values.
 * Fluent token names follow a convention where color tokens start with
 * "color", so we use that as the primary check.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark
 */
function isColorToken(name) {
  return name.startsWith('color');
}

const themes = new Map([
  ['web', { light: webLightTheme, dark: webDarkTheme }],
  ['teams', { light: teamsLightTheme, dark: teamsDarkTheme }],
]);

const cssLines = [
  `/* THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE */`,
  ``,
  `:root {`,
  `  color-scheme: light dark;`,
  `}`,
  ``,
  `[data-theme$="-light"] {`,
  `  color-scheme: light;`,
  `}`,
  ``,
  `[data-theme$="-dark"] {`,
  `  color-scheme: dark;`,
  `}`,
];

for (const [prefix, { light, dark }] of themes) {
  const available = tokenNames.filter(t => t in light && t in dark);

  cssLines.push('', `[data-theme^="${prefix}-"] {`);

  for (const t of available) {
    if (light[t] === dark[t]) {
      cssLines.push(`--${t}: ${light[t]};`);
    } else if (isColorToken(t)) {
      cssLines.push(`--${t}: light-dark(${light[t]}, ${dark[t]});`);
    } else {
      const darkColors = [...dark[t].matchAll(rgbaPattern)].map(m => m[0]);
      let colorIndex = 0;
      const merged = light[t].replace(rgbaPattern, match => {
        const darkColor = darkColors[colorIndex++];
        return match === darkColor ? match : `light-dark(${match}, ${darkColor})`;
      });
      cssLines.push(`--${t}: ${merged};`);
    }
  }

  cssLines.push('}');
}

const cssContent = cssLines.join('\n');
const cssDir = join(rootDir, 'public');

const formattedCss = await prettier.format(cssContent, {
  parser: 'css',
  ...(await prettier.resolveConfig(join(cssDir, 'fluent-tokens.css'))),
});

mkdirSync(cssDir, { recursive: true });
writeFileSync(join(cssDir, 'fluent-tokens.css'), formattedCss);
console.log(`✔ ${tokenNames.length} token properties → public/fluent-tokens.css`);
