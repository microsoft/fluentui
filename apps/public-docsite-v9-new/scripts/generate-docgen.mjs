import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { withCustomConfig } from 'react-docgen-typescript';

import { normalizeComponent } from './docgen-transforms.mjs';

const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(appRoot, '../..');

/**
 * Components documented by the site.
 *
 * Phase 0/1 covers Button only; later phases extend this list as pages are migrated.
 * Each entry names the file react-docgen-typescript parses, plus any sub-components
 * documented on the same page.
 */
const COMPONENTS = [
  {
    page: 'Button',
    files: ['packages/react-components/react-button/library/src/components/Button/Button.tsx'],
  },
];

const parser = withCustomConfig(join(repoRoot, 'tsconfig.base.all.json'), {
  // Mirrors Storybook's react-docgen-typescript defaults so both surfaces agree.
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  savePropValueAsString: true,
  propFilter: prop => {
    // Drop props declared by third-party type packages; keep everything from the monorepo.
    const declaredIn = prop.parent?.fileName ?? '';
    return declaredIn.length === 0 || !declaredIn.includes('/node_modules/');
  },
});

const manifest = {};

for (const { page, files } of COMPONENTS) {
  const absolute = files.map(file => join(repoRoot, file));
  const docs = parser.parse(absolute);

  if (docs.length === 0) {
    throw new Error(`docgen produced nothing for "${page}". Checked: ${files.join(', ')}`);
  }

  const components = docs.map(normalizeComponent);
  const primary = components.find(component => component.displayName === page) ?? components[0];

  manifest[page] = {
    ...primary,
    subcomponents: components.filter(component => component !== primary),
  };
}

const outFile = join(appRoot, 'app/generated/docgen.json');
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(manifest, null, 2)}\n`);

const summary = Object.entries(manifest)
  .map(([page, entry]) => `  ${page}: ${entry.props.length} props, ${entry.subcomponents.length} subcomponents`)
  .join('\n');

console.log(`docgen manifest written to ${outFile}\n${summary}`);
