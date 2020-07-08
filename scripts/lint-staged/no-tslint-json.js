// @ts-check

// Simple script to prevent checkin of new tslint files

const files = process.argv.slice(2);

console.error('Please replace the following new tslint.json files with .eslintrc.json files:');
for (const file of files) {
  console.error('  ' + file);
}
process.exit(1);
