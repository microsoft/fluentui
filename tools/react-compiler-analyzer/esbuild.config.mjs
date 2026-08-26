// @ts-check
import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const outdir = join(projectRoot, 'dist');

/**
 * Only first-party code is bundled. Babel and the compiler are loaded through `require.resolve()`,
 * and bundling yargs makes esbuild pick its `import` condition, whose `cliui/index.mjs` swaps
 * `wrap-ansi` for a char-slicing fallback that mangles `--help`.
 */
const external = ['@babel/core', '@babel/preset-typescript', 'babel-plugin-react-compiler', 'yargs'];

await rm(outdir, { recursive: true, force: true });

const { metafile } = await build({
  absWorkingDir: projectRoot,
  entryPoints: ['src/cli.ts', 'src/index.ts'],
  outdir,
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'cjs',
  sourcemap: true,
  metafile: true,
  logLevel: 'info',
  external,
});

// `src/index.ts` is an empty stub; emitting the declaration by hand avoids a second tsc pass.
await writeFile(join(outdir, 'index.d.ts'), 'export {};\n', 'utf-8');

const bundled = new Set(
  Object.keys(metafile.inputs)
    .map(input => /node_modules\/((?:@[^/]+\/)?[^/]+)\//.exec(input)?.[1])
    .filter(name => name !== undefined),
);

const leaked = external.filter(name => bundled.has(name));
if (leaked.length > 0) {
  throw new Error(`Externals were inlined into the bundle: ${leaked.join(', ')}`);
}

const cli = await readFile(join(outdir, 'cli.js'), 'utf-8');
for (const name of ['babel-plugin-react-compiler', '@babel/preset-typescript']) {
  if (!cli.includes(`require.resolve("${name}")`)) {
    throw new Error(`\`require.resolve("${name}")\` did not survive bundling — the CLI will fail at runtime.`);
  }
}

console.log(`Bundled ${bundled.size} package(s): ${[...bundled].sort().join(', ')}`);
