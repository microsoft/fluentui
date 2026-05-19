/**
 * Generates design token artifacts from @fluentui/tokens:
 *
 * 1. src/theme/design-tokens.ts — TypeScript constants mapping token
 *    names to CSS custom property var() references.
 *
 * 2. public/fluent-tokens.css — A plain CSS stylesheet with all token
 *    values under :root, for SSR/DSD testing where JS setTheme() isn't
 *    available.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import tokensPackage from '@fluentui/tokens';

const { tokens, webLightTheme } = tokensPackage;
const tokenNames = Object.keys(tokens);
const rootDir = join(import.meta.dirname, '..');

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

const cssContent =
  '/* THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE */\n:root {\n' +
  tokenNames
    .filter(t => t in webLightTheme)
    .map(t => `  --${t}: ${webLightTheme[t]};`)
    .join('\n') +
  '\n}\n';

const cssDir = join(rootDir, 'public');
mkdirSync(cssDir, { recursive: true });
writeFileSync(join(cssDir, 'fluent-tokens.css'), cssContent);
console.log(`✔ ${tokenNames.length} token properties → public/fluent-tokens.css`);
