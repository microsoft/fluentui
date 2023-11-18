import * as path from 'path';
import * as fs from 'fs';
import * as yargs from 'yargs';
import { bundleEntries, prepareEntries, bundleSizeCollect, copyBundles } from './bundle-size-collect';
import { mergeBundleSizes } from './merge-bundlesizes';
import { Config } from './types';
import { CONFIG_NAME } from './utils';

export async function cli(rootDir = process.cwd()) {
  const args = processArgs();

  await bundleSizeAuditor({ ...args, rootDir });
}

export async function bundleSizeAuditor(options: { rootDir: string } & Arguments) {
  const { createReport, reportPath, rootDir } = options;

  if (createReport) {
    mergeBundleSizes(reportPath as string, 'bundlesizes.json');
    return;
  }

  const configPath = path.join(rootDir, CONFIG_NAME);
  const pkgJSon = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
  const packageName = pkgJSon.name;

  const config: Config = await import(configPath).then(value => value.default);

  const entries = prepareEntries({ rootDir, packageName, ...config });
  await bundleEntries({ rootDir, packageName, entries });
  bundleSizeCollect({ rootDir, packageName, filename: 'bundlesize.json' });

  if (reportPath) {
    copyBundles(rootDir, reportPath);
  }
}

type Arguments = {
  createReport?: boolean;
  reportPath?: string;
};
function processArgs(): Arguments {
  const args = yargs
    .scriptName('bundle-size-auditor')
    .usage('$0', 'creates fixtures, bundles them and provides stats output via webpack')
    .option('createReport', {
      type: 'boolean',
      description:
        'generate `bundlesizes.json` metadata from all provided bundles within report-path folder. Useful for CI scenarios.',
    })
    .option('reportPath', {
      type: 'string',
      description:
        'path where project bundles output including bundlesize.json should be copied. This is useful for CI scenario which includes creating report via --create-report',
    })
    .version(false)
    .help().argv;

  if (args.createReport && !args.reportPath) {
    throw new Error('--report-path is mandatory when --create-report is used');
  }

  return args;
}
