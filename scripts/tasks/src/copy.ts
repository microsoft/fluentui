import * as fs from 'node:fs';
import * as path from 'node:path';

import { TaskFunction, copyInstructionsTask, copyTask, logger, resolveCwd, series } from 'just-scripts';

import { getTsPathAliasesConfig } from './utils';

export function expandSourcePath(pattern: string): string | null {
  if (!pattern) {
    return null;
  }

  // just returns the relative paths
  if (pattern.startsWith('.')) {
    return pattern;
  }

  // tries to resolve the packages, handling scoped packages
  const splitPattern = pattern.split('/');
  const packageName = pattern[0] === '@' ? `${splitPattern[0]}/${splitPattern[1]}` : splitPattern[0];

  try {
    const resolvedPackageJson = resolveCwd(`${packageName}/package.json`);

    if (!resolvedPackageJson) {
      // returns pattern if the packageName didn't contain a package.json (not really a package)
      return pattern;
    }

    return pattern.replace(packageName, path.dirname(resolvedPackageJson));
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 *
 * Used solely for packages that use TS solution config files with TS path aliases
 */
export function copyCompiledFactory(metadata: ReturnType<typeof import('./metadata-utils').getRawMetadata>) {
  return () => {
    const { isUsingTsSolutionConfigs, packageJson, tsConfigs } = getTsPathAliasesConfig();

    const packageDir = process.cwd();
    const tsConfig = tsConfigs.lib;

    if (!(isUsingTsSolutionConfigs && tsConfig)) {
      logger.warn(`copy-compiled: works only with packages that use TS solution config files. Skipping...`);
      return;
    }

    // TODO: remove after all v9 is migrated to new build and .d.ts API stripping
    const hasNewCompilationSetup = (tsConfig.compilerOptions.outDir as string).includes('dist/out-tsc');

    if (!hasNewCompilationSetup) {
      logger.info('copy-compiled: noop');

      return;
    }

    if (!metadata.project.sourceRoot) {
      throw new Error(`${packageJson.name} is missing 'sourceRoot' in project.json`);
    }

    const paths = {
      esm: packageJson.module
        ? {
            in: path.join(
              packageDir,
              tsConfig.compilerOptions.outDir as string,
              path.dirname(packageJson.module),
              metadata.project.sourceRoot,
            ),
            out: path.join(packageDir, path.dirname(packageJson.module)),
          }
        : null,
      commonJs: {
        in: path.join(
          packageDir,
          tsConfig.compilerOptions.outDir as string,
          path.dirname(packageJson.main),
          metadata.project.sourceRoot,
        ),
        out: path.join(packageDir, path.dirname(packageJson.main)),
      },
      amd: {
        in: path.join(packageDir, tsConfig.compilerOptions.outDir as string, 'lib-amd', metadata.project.sourceRoot),
        out: path.join(packageDir, 'lib-amd'),
      },
    };

    const tasks = [
      paths.esm
        ? copyTask({
            paths: [paths.esm.in],
            dest: paths.esm.out,
          })
        : null,
      copyTask({
        paths: [paths.commonJs.in],

        dest: paths.commonJs.out,
      }),
      fs.existsSync(paths.amd.in)
        ? copyTask({
            paths: [paths.amd.in],
            dest: paths.amd.out,
          })
        : null,
    ].filter(Boolean) as TaskFunction[];

    return series(...tasks);
  };
}
export function copy() {
  const configPath = path.resolve(process.cwd(), 'config/pre-copy.json');

  if (!fs.existsSync(configPath)) {
    return;
  }

  const config: { copyTo?: { [destination: string]: string | string[] } } = JSON.parse(
    fs.readFileSync(configPath, 'utf-8'),
  );
  const errorText =
    'config/pre-copy.json must have this structure: { copyTo: { [destination: string]: string | string[] } }';

  if (!config.copyTo) {
    throw new Error(errorText);
  }

  const tasks = Object.entries(config.copyTo).map(([destination, sources]) => {
    const destinationPath = path.resolve(process.cwd(), destination);

    if (Array.isArray(sources)) {
      return copyTask({
        paths: sources.map(src => expandSourcePath(src)).filter(Boolean) as string[],
        dest: destinationPath,
      });
    }

    if (typeof sources === 'string') {
      return copyInstructionsTask({
        copyInstructions: [
          {
            sourceFilePath: sources,
            destinationFilePath: destinationPath,
          },
        ],
      });
    }

    throw new Error(errorText);
  });

  // eslint-disable-next-line prefer-spread
  return series.apply(null, tasks);
}
