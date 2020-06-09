import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { applyRegisteredMigrations, registerMigration, warn } from './migration';
import { CliParser, displayHelp } from './cli/cli';

const args = new CliParser().parse(process.argv.slice(2));

if (args.help) {
  displayHelp();
  process.exit(1);
}

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
  const range = new semver.Range(args.version);
  const latestVersion = modsPaths.find(version => range.test(version));
  const target = latestVersion || args.version;

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

      applyRegisteredMigrations({ dryRun: !args.writeResults, warn: warn });
    }
  } catch (e) {
    console.error(e);
  }
}

applyMigrations();
