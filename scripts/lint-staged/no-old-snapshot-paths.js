// Simple script to prevent checkin of example snapshot files under old per-package paths
// (called from lint-staged, and any file passed in is an error)

const files = process.argv.slice(2);

console.error(
  '\nComponent example snapshot tests have moved. Please delete the following files and re-generate them ' +
    +'by running `yarn update-snapshots` from within `packages/react-examples`:',
);
for (const file of files) {
  console.error('  ' + file);
}
process.exit(1);
