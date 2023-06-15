import * as fs from 'fs';
import * as path from 'path';

// @ts-ignore - no type defs available
import { run } from 'parallel-webpack';

import {
  buildEntries,
  buildEntry,
  createEntry,
  createWebpackConfigTemplate,
  FIXTURE_PATH,
  FIXTURE_BUILD_PATH,
  writeFileSync,
} from './utils';
import { Config } from './types';

export function bundle(
  options: {
    cwd: string;
    packageName: string;
  } & Config,
): Promise<void> {
  const writeFixture = (entryName: string, content: string) => {
    writeFileSync(path.join(cwd, FIXTURE_PATH, entryName), content, 'utf-8');
  };

  const { cwd, packageName, extraEntries = [], createFixtures } = options;

  createFixtures({ writeFixture });

  extraEntries.forEach(extraEntry => {
    createEntry(cwd, extraEntry);
  });

  const entries = buildEntries(cwd, packageName);

  extraEntries.forEach(extraEntry => {
    const newEntry = buildEntry(cwd, extraEntry);
    Object.assign(entries, newEntry);
  });

  const configPath = createWebpackConfigTemplate(cwd, entries, packageName);

  return run(configPath, {});
}

/**
 *
 * collates bundle size information from minified files in package `temp/fixtures/build/` and writes to `temp/fixtures/build/bundlesizes.json`.
 *
 * It is uploaded as an artifact by the build definition in Azure Dev Ops and used to compare baseline and PR file size information which gets reported by Size Auditor
 */
export function bundleSizeCollect(config: { cwd: string; packageName: string; filename?: string }) {
  const { cwd, filename: outputFilename = 'bundlesize.json' } = config;

  const distRoot = path.join(cwd, FIXTURE_BUILD_PATH);
  const bundlesizeJsonPath = path.join(distRoot, outputFilename);

  const sizes: Record<string, number> = {};

  const items = fs.readdirSync(distRoot);
  items.forEach(item => {
    const file = path.join(distRoot, item);

    const isMinifiedJavascriptFile = item.match(/.min.js$/);
    if (isMinifiedJavascriptFile) {
      sizes[getComponentName(item)] = getFilesizeInBytes(file);
    }
  });

  console.log(`CREATE: ${bundlesizeJsonPath} `);

  fs.writeFileSync(bundlesizeJsonPath, JSON.stringify({ sizes }));

  function getFilesizeInBytes(fileName: string) {
    return fs.statSync(fileName).size;
  }

  function getComponentName(fileName: string) {
    return path.basename(fileName, '.min.js');
  }
}
