import * as fs from 'fs';
import * as path from 'path';

import { run } from 'parallel-webpack';

import {
  buildEntries,
  buildEntry,
  createEntry,
  createWebpackConfigTemplate,
  FIXTURE_PATH,
  FIXTURE_BUILD_PATH,
  writeFileSync,
  Entries,
} from './utils';
import type { Config } from './types';

export async function copyBundles(rootDir: string, reportPath: string) {
  const reportFullPath = path.isAbsolute(reportPath) ? reportPath : path.join(rootDir, reportPath);

  return fs.cpSync(path.join(rootDir, FIXTURE_BUILD_PATH), reportFullPath, { recursive: true });
}

export function prepareEntries(
  options: {
    rootDir: string;
    packageName: string;
  } & Config,
) {
  const writeFixture = (entryName: string, content: string) => {
    writeFileSync(path.join(rootDir, FIXTURE_PATH, entryName), content, 'utf-8');
  };

  const { rootDir, packageName, extraEntries = [], createFixtures } = options;

  createFixtures({ writeFixture });

  extraEntries.forEach(extraEntry => {
    createEntry(rootDir, extraEntry);
  });

  const entries = buildEntries(rootDir, packageName);

  extraEntries.forEach(extraEntry => {
    const newEntry = buildEntry(rootDir, extraEntry);
    Object.assign(entries, newEntry);
  });

  return entries;
}

export async function bundleEntries(options: { rootDir: string; packageName: string; entries: Entries }) {
  const configPath = createWebpackConfigTemplate(options);

  return await run(configPath, {});
}

/**
 *
 * collates bundle size information from minified files in package `temp/fixtures/build/` and writes to `temp/fixtures/build/bundlesizes.json`.
 *
 * It is uploaded as an artifact by the build definition in Azure Dev Ops and used to compare baseline and PR file size information which gets reported by Size Auditor
 */
export function bundleSizeCollect(config: { rootDir: string; packageName: string; filename: string }) {
  const { rootDir, filename: outputFilename } = config;

  const distRoot = path.join(rootDir, FIXTURE_BUILD_PATH);
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
