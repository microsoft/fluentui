import fs from 'fs';
import glob from 'glob';
import mockfs from 'mock-fs';
import path from 'path';
import { promisify } from 'util';
import { IMigration } from '../../../migration';

const globAsync = promisify(glob);
const readFileAsync = promisify(fs.readFile);
const fixturesRoot = path.join(__dirname, '..', '..', '..', '..', 'fixtures');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileSystem: any = {};

async function recordFile(filename: string): Promise<void> {
  const contents = await readFileAsync(filename);
  const trimmedName = filename.substring(fixturesRoot.length);
  // Intentionally not using path.sep, as node is giving '/' for separator instead of os-correct version.
  const parts = path.dirname(trimmedName).split('/');
  parts[0] = '_root';
  let current = fileSystem;
  parts.forEach(p => {
    if (!current[p]) {
      current[p] = {};
    }
    current = current[p];
  });
  current[path.basename(trimmedName)] = contents.toString();
}

let initialSetupComplete = false;
async function setup() {
  if (!initialSetupComplete) {
    const files = await globAsync(path.join(fixturesRoot, '**', '*.ts?'));
    const promises = files.map(recordFile);
    await Promise.all(promises);
    initialSetupComplete = true;
  }
  mockfs(fileSystem);
}

function teardown() {
  mockfs.restore();
}

interface IMigrationResult {
  contents: string;
  warnings: string[];
}

export async function runMigration(migration: IMigration, filename: string): Promise<IMigrationResult> {
  await setup();
  const result: IMigrationResult = { contents: '', warnings: [] };
  try {
    migration.step({ dryRun: false, warn: (msg: string) => result.warnings.push(msg) });
    const contents = await readFileAsync(path.join('_root', filename));
    teardown();
    result.contents = contents.toString();
    return result;
  } catch (e) {
    teardown();
    throw e;
  }
}
