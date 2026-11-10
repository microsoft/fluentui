import fs from 'fs';
import path from 'path';

import { workspaceRoot } from '@fluentui/scripts-monorepo';
import { sh } from '@fluentui/scripts-utils';
import fsExtra from 'fs-extra';
import tmp from 'tmp';

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
tmp.setGracefulCleanup();

export interface TempPaths {
  /** Parent temp directory */
  root: string;
  /** Directory for the test app (under `root`) */
  testApp: string;
  /** Directory for the yarn cache (under `root`) */
  yarnCache: string;
}

/**
 * Prepare a temp directory which contains folders used for the test, and a `.yarnrc.yml` file.
 * The `.yarnrc.yml` contains a custom `cacheFolder` under the parent temp directory to avoid race
 * conditions with multiple tests modifying the global cache, and sets `nodeLinker: node-modules`
 * to ensure compatibility with projects that expect a traditional `node_modules` layout.
 * @param prefix Prefix to use in the directory name
 */
export function prepareTempDirs(prefix: string): TempPaths {
  const root = createTempDir(prefix);

  const testApp = path.join(root, 'test-app');
  fs.mkdirSync(testApp);

  const yarnCache = path.join(root, 'yarn-cache');
  fs.mkdirSync(yarnCache);

  // Putting this in the parent folder ensures that running yarn in any child folder uses it.
  // Yarn Modern (v4+) ignores .yarnrc and only reads .yarnrc.yml.
  fs.writeFileSync(
    path.join(root, '.yarnrc.yml'),
    [`nodeLinker: node-modules`, `cacheFolder: "${yarnCache}"`, `enableGlobalCache: false`, ``].join('\n'),
  );

  // Create a minimal package.json in the test app directory for Yarn Modern compatibility
  // Yarn Modern requires a package.json to exist before running yarn add
  fs.writeFileSync(path.join(testApp, 'package.json'), JSON.stringify({ name: 'test-app', version: '1.0.0' }, null, 2));

  return { root, testApp, yarnCache };
}

export function createTempDir(prefix: string): string {
  // "Unsafe" means delete even if it still has files inside (our desired behavior)
  return tmp.dirSync({ prefix, unsafeCleanup: true }).name;
}

export function log(context: string) {
  return (message: string) => {
    console.log();
    console.log('='.repeat(80));
    console.log(`${context} : ${message}`);
    console.log('='.repeat(80));
  };
}

export async function shEcho(cmd: string, cwd?: string) {
  console.log(`+ cd ${cwd ?? '.'} &&\n    ${cmd}`);
  await sh(cmd, cwd);
}

/**
 * Generates a folder of files based on provided templates.
 * This is similar to nx `@nx/devkit#generateFiles` without templating and ability to run on virtual FS
 *
 * @example
 * ```typescript
 * generateFiles(path.join(__dirname , 'files'), path.join(tempFolderRoot,'./tools/scripts'))
 *
 * @param srcFolder - the source folder of files (absolute path)
 * @param target - the target folder (absolute path)
 */
export function generateFiles(srcFolder: string, target: string) {
  fsExtra.copySync(srcFolder, target, { recursive: true });
}

export { workspaceRoot };
