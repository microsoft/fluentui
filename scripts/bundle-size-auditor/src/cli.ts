import * as path from 'path';
import * as fs from 'fs';
import * as yargs from 'yargs';
import { bundle, bundleSizeCollect } from './bundle-size-collect';
import { Config } from './types';

export async function cli() {
  const args = processArgs();
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'bundle-size-auditor.config.js');
  const pkgJSon = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
  const packageName = pkgJSon.name;

  const config: Config = await import(configPath).then(value => value.default);

  await bundle({ cwd, packageName, ...config });
  bundleSizeCollect({ cwd, packageName });
}

function processArgs() {
  return yargs.scriptName('bundle-size-auditor').usage('$0 <cmd> [args]').version(false).help().argv;
}
