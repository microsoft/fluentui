import * as path from 'path';
import * as fs from 'fs';
import * as yargs from 'yargs';
import { bundle, bundleSizeCollect, copyBundles } from './bundle-size-collect';
import { mergeBundleSizes } from './merge-bundlesizes';
import { Config } from './types';

export async function cli() {
  const args = processArgs();

  if (args.createReport) {
    mergeBundleSizes(args.reportPath as string, 'bundlesizes.json');
    return;
  }

  const cwd = process.cwd();
  const configPath = path.join(cwd, 'bundle-size-auditor.config.js');
  const pkgJSon = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
  const packageName = pkgJSon.name;

  const config: Config = await import(configPath).then(value => value.default);

  await bundle({ cwd, packageName, ...config });
  bundleSizeCollect({ cwd, packageName, ...args });

  if (args.reportPath) {
    copyBundles(cwd, args.reportPath);
  }
}

function processArgs() {
  const args = yargs
    .scriptName('bundle-size-auditor')
    .usage('$0', 'creates fixtures, bundles them and provides stats output via webpack')
    .option('createReport', {
      type: 'boolean',
    })
    .option('reportPath', {
      type: 'string',
    })
    .version(false)
    .help().argv;

  if (args.createReport && !args.reportPath) {
    throw new Error('--report-path is mandatory when --create-report is used');
  }

  return args;
}
