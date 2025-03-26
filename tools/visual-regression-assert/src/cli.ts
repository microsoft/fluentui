import yargs from 'yargs';
import { runSnapshotTests } from './assert';
import { prepareReport } from './report';
import { reporterFileNames } from './shared';
import { updateBaseline } from './update-baseline';

main().catch(reason => {
  console.error(reason);
  process.exit(1);
});

async function main() {
  const reportFileName = reporterFileNames.json;
  const reportFilesGlob = `**/${reportFileName}`;

  yargs(process.argv.slice(2))
    .command(
      'report',
      'prepare diff report for CI',
      y => {
        return y
          .option('outputPath', {
            type: 'string',
            demandOption: true,
            description: 'relative path all projects report output should be created',
          })
          .strict(true);
      },
      async argv => {
        const outputPath = argv.outputPath;

        return prepareReport(reportFilesGlob, outputPath);
      },
    )
    .command(
      'update-baseline',
      'update baseline to actual from assert report',
      y => {
        return y
          .option('reportPath', {
            type: 'string',
            demandOption: true,
            description: 'relative/absolute path to report file generated on CI',
          })
          .strict(true);
      },
      async argv => {
        const reportPath = argv.reportPath;

        const result = await updateBaseline(reportPath);
        if (result.success === false) {
          console.error('============================');
          console.error('🚨 Baseline Update failed! 🚨');
          console.error('============================');
          process.exit(1);
        }
      },
    )
    .command(
      'assert',
      'run assertion',
      y => {
        return y
          .option('baselineDir', {
            type: 'string',
            demandOption: true,
            description: 'relative path to baseline folder',
          })
          .option('outputPath', {
            type: 'string',
            demandOption: true,
            description: 'relative path where report output should be created',
          })
          .option('updateSnapshots', {
            type: 'boolean',
            default: false,
            alias: 'u',
            description:
              'NOTE: updating snapshots during test execution is suggested only if you can guarantee that all users and CI are using same OS environment',
          })
          .strict(true);
      },
      async argv => {
        const { baselineDir, outputPath, updateSnapshots } = argv;

        const result = await runSnapshotTests({
          baselineDir,
          outputPath,
          reportFileName,
          updateSnapshots,
        });
        if (!result.success) {
          console.error('===============================================');
          console.error('🚨 Snapshots changed! Please Review VR Report 🚨');
          console.error('===============================================');
          process.exit(1);
        }
      },
    )
    // Custom error handling
    .fail((message, error, _yargs) => {
      console.error('Error:', message || error.message);
      process.exit(1);
    })
    .strict().argv;
}
