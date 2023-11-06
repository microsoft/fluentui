import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function verifyPackaging() {
  const cwd = process.cwd();
  const projectJSON: import('@nx/devkit').ProjectConfiguration = JSON.parse(
    readFileSync(path.join(cwd, 'project.json'), 'utf-8'),
  );
  const tags = projectJSON.tags ?? [];

  const result = spawnSync('npm', ['pack', '--dry-run']);

  const processedResult = result.output
    .toString()
    .replace(/\bnpm notice\b\s+[\d.]+[kB]+\s+/gi, '')
    .replace(/[ ]+/g, '');

  const isV8package = tags.indexOf('v8') !== -1;
  const isV9package = tags.indexOf('vNext') !== -1;

  if (isV9package) {
    assert.doesNotMatch(processedResult, /src\/[.a-z0-9/-_]+/i, `wont ship source code from "/src"`);
    assert.doesNotMatch(processedResult, /config\/[.a-z0-9/-_]+/i, `wont ship config folder`);
    assert.doesNotMatch(processedResult, /etc\/[.a-z0-9/-_]+/i, `wont ship etc folder`);
    assert.doesNotMatch(processedResult, /just\.config\.[jt]s/i, `wont ship configuration files`);
  }

  if (isV8package) {
    assert.match(processedResult, /lib\/[.a-z0-9/-_]+(.d.ts)/i, 'ships dts');
  }

  assert.match(processedResult, /package\.json/, 'ships package.json');
  assert.match(processedResult, /README\.md/, 'ships README.md');
  assert.match(processedResult, /CHANGELOG\.md/, 'ships CHANGELOG.md');
  assert.match(processedResult, /dist\/[a-z-]+\.d\.ts/, 'ships rolluped dts');
  assert.match(processedResult, /lib-commonjs\/[.a-z0-9/-_]+(.js|.map)/i, 'ships cjs');
  assert.match(processedResult, /lib\/[.a-z0-9/-_]+(.js|.map)/i, 'ships esm');

  assert.doesNotMatch(processedResult, /docs\/[.a-z0-9/-_]+/i, `wont ship docs folder`);
  assert.doesNotMatch(processedResult, /temp\/[.a-z0-9/-_]+/i, `wont ship temp folder`);
  assert.doesNotMatch(processedResult, /bundle-size\/[.a-z0-9/-_]+/i, `wont ship bundle-size fixtures`);
  assert.doesNotMatch(processedResult, /.storybook\/[.a-z0-9/-_]+/i, `wont ship .storybook config`);
  assert.doesNotMatch(processedResult, /stories\/[.a-z0-9/-_]+/i, `wont ship stories`);
  assert.doesNotMatch(processedResult, /jest\.config\.js/i, `wont ship configuration files`);
  assert.doesNotMatch(processedResult, /tsconfig[.a-z]*\.json/i, `wont ship configuration files`);
  assert.doesNotMatch(processedResult, /project\.json/i, `wont ship configuration files`);
  assert.doesNotMatch(processedResult, /\.eslintrc\.(json|js)/i, `wont ship configuration files`);
  assert.doesNotMatch(processedResult, /\.babelrc\.json/i, `wont ship configuration files`);
  assert.doesNotMatch(processedResult, /\.swcrc/i, `wont ship configuration files`);

  // @FIXME `amd` is created only on release pipeline where `--production` flag is used on build commands which triggers it
  // we should enable this also on PR pipelines - need to verify time execution impact
  // if (isV8package || tags.indexOf('ships-amd') !== -1) {
  //   assert.match(processedResult, /lib-amd\/[.a-z0-9/-_]+(.js|.map)/i, 'ships amd');
  // }
}
