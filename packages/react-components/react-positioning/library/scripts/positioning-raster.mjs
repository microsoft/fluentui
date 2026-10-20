import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cypress from 'cypress';

const project = fileURLToPath(new URL('..', import.meta.url));
const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: project, encoding: 'utf8' }).trim();
// Reuse the PNG decoder already owned by the repository's visual-regression tooling.
const { PNG } = createRequire(path.join(root, 'tools/visual-regression-assert/package.json'))('pngjs');
const baseline = '788e3b739fe79246a2f8850d1c575cf4018fd744';
const sourcePath = 'packages/react-components/react-positioning/library/src';
const output = path.join(project, 'dist/positioning-raster');
await mkdir(path.join(root, 'node_modules/.cache'), { recursive: true });
const source = await mkdtemp(path.join(root, 'node_modules/.cache/positioning-oracle-'));

try {
  const archive = execFileSync('git', ['archive', baseline, sourcePath], { cwd: root });
  execFileSync('tar', ['-x', '--strip-components=5', '-C', source], { input: archive });
  for (const engine of ['master', 'replacement']) {
    process.env.FLUENT_POSITIONING_ORACLE_SOURCE = engine === 'master' ? source : '';
    console.log(
      `Capturing ${engine}; oracle source: ${process.env.FLUENT_POSITIONING_ORACLE_SOURCE || '(current source)'}`,
    );
    const result = await cypress.run({
      project,
      component: true,
      browser: 'electron',
      spec: 'src/usePositioning.raster.tsx',
      config: {
        component: { specPattern: 'src/usePositioning.raster.tsx' },
        retries: 0,
        screenshotsFolder: path.join(output, engine),
      },
    });
    assert('totalFailed' in result, `${engine}: Cypress did not finish`);
    assert.equal(result.totalFailed, 0, `${engine}: geometry/lifecycle contracts failed during capture`);
    assert.equal(result.totalTests, 143, `${engine}: expected the complete lower-PR contract suite`);
  }
  const screenshots = async engine => {
    const directory = path.join(output, engine, 'usePositioning.raster.tsx');
    const files = (await readdir(directory)).filter(file => file.endsWith('.png')).sort();
    return { directory, files };
  };
  const master = await screenshots('master');
  const replacement = await screenshots('replacement');
  assert.deepEqual(replacement.files, master.files, 'Both engines must render every captured case');
  assert.equal(master.files.length, 142, 'Expected every rasterized case except baseline integrity');
  const results = [];
  for (const file of master.files) {
    const expected = PNG.sync.read(await readFile(path.join(master.directory, file)));
    const actual = PNG.sync.read(await readFile(path.join(replacement.directory, file)));
    assert.equal(actual.width, expected.width, `${file}: width`);
    assert.equal(actual.height, expected.height, `${file}: height`);
    let differentPixels = 0;
    for (let i = 0; i < expected.data.length; i += 4) {
      if (!expected.data.subarray(i, i + 4).equals(actual.data.subarray(i, i + 4))) {
        differentPixels++;
      }
    }
    results.push({ file, width: actual.width, height: actual.height, differentPixels });
  }
  await writeFile(path.join(output, 'comparison.json'), JSON.stringify({ baseline, results }, null, 2));
  const failed = results.filter(result => result.differentPixels !== 0);
  assert.deepEqual(failed, [], 'Raster parity requires zero changed RGBA pixels, including antialiasing');
  console.log(`${results.length} raster comparisons passed with zero differing pixels; baseline ${baseline}`);
} finally {
  await rm(source, { recursive: true, force: true });
}
