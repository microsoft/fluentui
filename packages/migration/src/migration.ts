export interface IMigration {
  note: string;
  step: () => void;
}

const allMigrations: IMigration[] = [];

export function migration(note: string, step: () => void) {
  return {
    note,
    step
  };
}

export function registerMigration(theMigration: IMigration) {
  allMigrations.push(theMigration);
}

export function applyRegisteredMigrations() {
  console.log('Apply migration steps:');
  allMigrations.forEach(theMigration => {
    console.log(`- ${theMigration.note}`);
    theMigration.step();
  });
  console.log('Finished!');
}
