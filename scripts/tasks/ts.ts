import fs from 'fs';
import * as path from 'path';
import { tscTask, argv, TscTaskOptions, resolveCwd, logger } from 'just-scripts';
import { Arguments } from 'yargs';
import jju from 'jju';

interface JustArgs extends Arguments {
  production?: boolean;
}

interface TsConfig {
  extends?: string;
  // typescript doesn't provide a correct type for the compiler options file
  // (typescript.CompilerOptions has enum values instead of raw options in some cases)
  compilerOptions: object;
  include?: string[];
  exclude?: string[];
}

const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');
// Temporary hack: only use tsbuildinfo file for things under packages/fluentui
const useTsBuildInfo =
  /[\\/]packages[\\/]fluentui[\\/]/.test(process.cwd()) && path.basename(process.cwd()) !== 'perf-test';

/**
 *
 * Explicitly set `baseUrl` to current package root for packages (converged packages) that use TS path aliases.
 * > - This is a temporary workaround for current way of building packages.
 * > - Without setting baseUrl we would get all aliased packages build within outDir
 */
function backportTsAliasedPackages(options: TscTaskOptions) {
  const tsConfigFilePath = resolveCwd('./tsconfig.json');
  const tsConfig: TsConfig = jju.parse(fs.readFileSync(tsConfigFilePath, 'utf-8'));

  const normalizedOptions = { ...options };

  if (tsConfig.extends) {
    logger.info(`package is using TS path aliases. Overriding baseUrl to package root.`);
    normalizedOptions.baseUrl = '.';
  }

  return normalizedOptions;
}

function getExtraTscParams(args: JustArgs) {
  return {
    pretty: true, // use readable error message formatting (turn off for individual scenarios if needed)
    target: 'es5',
    // sourceMap must be true for inlineSources and sourceRoot to work
    ...(args.production && { inlineSources: true, sourceRoot: path.relative(libPath, srcPath), sourceMap: true }),
  };
}

function getJustArgv(): JustArgs {
  return argv();
}

export const ts = {
  commonjs: () => {
    const extraOptions = getExtraTscParams(getJustArgv());
    const options = backportTsAliasedPackages({
      ...extraOptions,
      outDir: 'lib-commonjs',
      module: 'commonjs',
      ...(useTsBuildInfo && { tsBuildInfoFile: '.commonjs.tsbuildinfo' }),
    });

    return tscTask(options);
  },
  esm: () => {
    const extraOptions = getExtraTscParams(getJustArgv());
    const options = backportTsAliasedPackages({
      ...extraOptions,
      outDir: 'lib',
      module: 'esnext',
    });

    // Use default tsbuildinfo for this variant
    return tscTask(options);
  },
  amd: () => {
    const extraOptions = getExtraTscParams(getJustArgv());
    const options = backportTsAliasedPackages({
      ...extraOptions,
      outDir: 'lib-amd',
      module: 'amd',
      ...(useTsBuildInfo && { tsBuildInfoFile: '.amd.tsbuildinfo' }),
    });

    return tscTask(options);
  },
  commonjsOnly: () => {
    const extraOptions = getExtraTscParams(getJustArgv());
    // Use default tsbuildinfo for this variant (since it's the only variant)
    const options = backportTsAliasedPackages({ ...extraOptions, outDir: 'lib', module: 'commonjs' });

    return tscTask(options);
  },
};
