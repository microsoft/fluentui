import type { CommandHandler } from '../../utils/types';
import type { ReportArgs } from './impl/types';

export const handler: CommandHandler<ReportArgs> = async argv => {
  const { type, path } = argv;

  if (type === 'long') {
    const { runLongReport } = await import('./impl/long-report');
    return runLongReport(path, argv.reporter, argv.include, argv.exclude);
  }

  const { runShortReport } = await import('./impl/short-report');
  return runShortReport();
};
