// Simple script to prevent checkin of example or doc files under old per-package paths
// (called from lint-staged, and any file passed in is an error)

const files = process.argv.slice(2);

console.error('\nPlease move the following files to the appropriate locations under packages/examples:');
for (const file of files) {
  console.error('  ' + file);
}
process.exit(1);
