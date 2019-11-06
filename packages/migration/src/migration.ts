import { ModResult } from 'riceburn/lib/interfaces';

export interface IMigrationOptions {
  dryRun: boolean;
  warn: (message: string) => void;
}

export interface IMigration {
  note: string;
  step: (opts: IMigrationOptions) => ModResult[];
}

const allMigrations: IMigration[] = [];

export function migration(note: string, step: (opts: IMigrationOptions) => ModResult[]): IMigration {
  return {
    note,
    step
  };
}

export function registerMigration(theMigration: IMigration) {
  allMigrations.push(theMigration);
}

export function applyRegisteredMigrations(options: IMigrationOptions) {
  console.error(`Migration steps in ${options.dryRun ? 'dry run' : 'write'} mode:`);
  allMigrations.forEach(theMigration => {
    console.error(`- ${theMigration.note}`);
    const results = theMigration.step(options);
    if (!results.length) {
      console.log('  No files found by this migration step so no changes required.');
    } else {
      console.log(
        results
          .filter(r => r.state === 'modified')
          .map(r => `  ${!options.dryRun ? '[Modified]: ' : ''}${r.fileName}`)
          .join('\n')
      );
    }
  });
}

export function warn(message: string) {
  console.error(`  ${message}`);
}
