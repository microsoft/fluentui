import yargs from 'yargs';
import { runSnapshotTests } from './assert';
import { prepareReport } from './report';

main()
  // .then(_ => {
  //   process.exit(0);
  // })
  .catch(reason => {
    console.error(reason);
    process.exit(1);
  });

async function main() {
  const reportFileName = 'visual-regression-assert.json';
  const reportFilesGlob = `**/${reportFileName}`;

  yargs(process.argv.slice(2))
    .usage('$0', 'Run VR tests for Images')
    .command(
      'report',
      'prepare diff report for CI',
      y => {
        return y.option('outputPath', { type: 'string', demandOption: true });
      },
      async argv => {
        const outputPath = argv.outputPath;

        return await prepareReport(reportFilesGlob, outputPath);
      },
    )
    .command(
      'assert',
      'run assertion',
      y => {
        return y
          .option('baselineDir', { type: 'string', demandOption: true })
          .option('actualDir', { type: 'string', demandOption: true })
          .option('diffDir', { type: 'string', demandOption: true })
          .option('reportPath', { type: 'string', demandOption: true })
          .option('updateSnapshots', { type: 'boolean', default: false, alias: 'u' });
      },
      async argv => {
        const { baselineDir, actualDir, diffDir, reportPath, updateSnapshots } = argv;

        const result = await runSnapshotTests(
          baselineDir,
          actualDir,
          diffDir,
          reportPath,
          reportFileName,
          updateSnapshots,
        );
        if (!result.passed) {
          console.error('===============================================');
          console.error('🚨 Snapshots changed! Please Review VR Report 🚨');
          console.error('===============================================');
          process.exit(1);
        }
      },
    )
    // .option('baselineDir', { type: 'string', demandOption: true })
    // .option('actualDir', { type: 'string', demandOption: true })
    // .option('diffDir', { type: 'string', demandOption: true })
    // .option('reportPath', { type: 'string', demandOption: true })
    // .option('updateSnapshots', { type: 'boolean', default: false, alias: 'u' })
    .strict().argv;

  // Example usage:
  // const baselineDir = './snapshots/baseline';
  // const actualDir = './snapshots/actual';
  // const diffDir = './snapshots/diff';
  // const reportPath = './snapshot-report.html';

  // runSnapshotTests(baselineDir, actualDir, diffDir, reportPath);
}
