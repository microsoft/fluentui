// @ts-check

// Simple script to prevent checkin of new tslint files
// (called from lint-staged, only for tslint.json files--so any file passed in is an error)

const files = process.argv.slice(2);

console.error('\nPlease replace the following new tslint.json files with .eslintrc.json files:');
for (const file of files) {
  console.error('  ' + file);
}
process.exit(1);
