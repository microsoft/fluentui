import { argv } from 'just-scripts';
import { Arguments } from 'yargs-parser';

/** Custom command line arguments for the preset in scripts/just.config.ts */
export interface JustArgs extends Arguments {
  babel: boolean;
  production: boolean;
  webpackConfig: string;
  cached: boolean;
  registry: string;
  push: boolean;
  package: string;
  module: typeof moduleDefaults;
}

export function getJustArgv() {
  return parseModule(argv()) as Partial<JustArgs>;
}

const moduleDefaults = { esm: false, cjs: false, amd: false };
function parseModule(args: Arguments & { module?: string | string[] }) {
  const { module, ...rest } = args;

  if (!module) {
    return rest;
  }

  const normalizedModule = Array.isArray(module) ? module : module.split(',').map(value => value.trim());
  const parsedModule = normalizedModule.reduce(
    (acc, outputType) => {
      if (!Object.prototype.hasOwnProperty.call(acc, outputType)) {
        throw new Error(
          `--module supports only following values: ${Object.keys(
            moduleDefaults,
          )}. You provided ${outputType} is invalid`,
        );
      }

      acc[outputType as keyof JustArgs['module']] = true;

      return acc;
    },
    { ...moduleDefaults },
  );

  return {
    module: parsedModule,
    ...rest,
  };
}
