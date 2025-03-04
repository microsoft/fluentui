import yargs from 'yargs';
import { runSnapshotTests } from './assert';

main();

async function main() {
  const argv = yargs(process.argv.slice(2))
    .usage('$0', 'Run VR tests for Images')
    .option('baselineDir', { type: 'string', demandOption: true })
    .option('actualDir', { type: 'string', demandOption: true })
    .option('diffDir', { type: 'string', demandOption: true })
    .option('reportPath', { type: 'string', demandOption: true })
    .option('updateSnapshots', { type: 'boolean', default: false, alias: 'u' })
    .strict().argv;

  // Example usage:
  // const baselineDir = './snapshots/baseline';
  // const actualDir = './snapshots/actual';
  // const diffDir = './snapshots/diff';
  // const reportPath = './snapshot-report.html';

  // runSnapshotTests(baselineDir, actualDir, diffDir, reportPath);

  const { baselineDir, actualDir, diffDir, reportPath, updateSnapshots } = argv;

  return runSnapshotTests(baselineDir, actualDir, diffDir, reportPath, updateSnapshots)
    .then(_ => {
      process.exit(0);
    })
    .catch(reason => {
      console.error(reason);
      process.exit(1);
    });
}
