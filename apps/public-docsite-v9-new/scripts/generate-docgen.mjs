import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { withCustomConfig } from 'react-docgen-typescript';

import { normalizeComponent } from './docgen-transforms.mjs';

const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(appRoot, '../..');

/**
 * Component source files to document.
 *
 * Discovered rather than listed: a hand-maintained list silently went stale, leaving every
 * page but Button without a props table. Each package's `library/src/components/<Name>/<Name>.tsx`
 * is the component entry; hooks, renderers and tests alongside it are not components.
 */
function findComponentFilesByPackage() {
  const byPackage = new Map();
  const packagesRoot = join(repoRoot, 'packages/react-components');

  for (const pkg of readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!pkg.isDirectory()) {
      continue;
    }

    const componentsDir = join(packagesRoot, pkg.name, 'library/src/components');

    if (!existsSync(componentsDir)) {
      continue;
    }

    for (const dir of readdirSync(componentsDir, { withFileTypes: true })) {
      if (!dir.isDirectory()) {
        continue;
      }

      const candidate = join(componentsDir, dir.name, `${dir.name}.tsx`);

      if (existsSync(candidate)) {
        if (!byPackage.has(pkg.name)) {
          byPackage.set(pkg.name, []);
        }

        byPackage.get(pkg.name).push(candidate);
      }
    }
  }

  return byPackage;
}

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

/*
 * Parsed one package at a time. Handing react-docgen-typescript every component file at once
 * yields entries with zero props — the type information does not survive a program that large —
 * which silently produced empty props tables everywhere.
 */
const manifest = {};

for (const [pkg, files] of findComponentFilesByPackage()) {
  for (const doc of parser.parse(files)) {
    if (!doc.displayName || Object.keys(doc.props ?? {}).length === 0) {
      continue;
    }

    manifest[doc.displayName] = { ...normalizeComponent(doc), subcomponents: [] };
  }

  process.stdout.write(`\r  parsed ${pkg}`.padEnd(60));
}

process.stdout.write('\r'.padEnd(62) + '\r');

const outFile = join(appRoot, 'app/generated/docgen.json');
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`docgen manifest written to ${outFile} (${Object.keys(manifest).length} components)`);
