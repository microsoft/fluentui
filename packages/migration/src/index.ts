import semver from 'semver';
import fs from 'fs';
import path from 'path';
import { applyRegisteredMigrations, registerMigration } from './migration';

if (process.argv.length <= 2) {
  console.error('Please specify a target version (e.g. 7)');
  process.exit(1);
}

let target = process.argv.slice(2).join();

const modsBasePath = path.join(__dirname, 'mods');

function findMigrationPaths(): string[] | null {
  if (!fs.existsSync(modsBasePath)) {
    console.log('No mods available');
    return null;
  }

  const modsPaths = fs
    .readdirSync(path.join(modsBasePath))
    .sort(semver.compare)
    .reverse();

  // let's find the biggest one that fits the range passed in from argv[2]
  const range = new semver.Range(target);
  const latestVersion = modsPaths.find(version => range.test(version));
  target = latestVersion || target;

  return fs
    .readdirSync(path.join(modsBasePath, target))
    .filter(name => name.endsWith('.js'))
    .sort()
    .map((modPath: string) => path.join(modsBasePath, target, modPath));
}

function applyMigrations(): void {
  try {
    const modPaths = findMigrationPaths();

    if (modPaths) {
      modPaths.forEach(modPath => {
        registerMigration(require(modPath).default);
      });

      applyRegisteredMigrations();
    }
  } catch (e) {
    console.error(e);
  }
}

applyMigrations();
