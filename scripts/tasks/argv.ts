import { argv } from 'just-scripts';
import { Arguments } from 'yargs-parser';

/** Custom command line arguments for the preset in scripts/just.config.ts */
export interface JustArgs extends Arguments {
  babel: boolean;
  production: boolean;
  webpackConfig: string;
  commonjs: boolean;
  cached: boolean;
  registry: string;
  push: boolean;
  package: string;
  min: boolean;
}

export function getJustArgv() {
  return argv() as Partial<JustArgs>;
}
