import * as fs from 'fs-extra';
import * as path from 'path';
import { series, resolveCwd, copyTask, copyInstructionsTask } from 'just-scripts';

export function expandSourcePath(pattern: string): string {
  if (!pattern) {
    return null;
  }

  // just returns the relative paths
  if (pattern.startsWith('.')) {
    return pattern;
  }

  // tries to resolve the packages, handling scoped packages
  const splitPattern = pattern.split('/');
  const packageName = pattern[0] == '@' ? `${splitPattern[0]}/${splitPattern[1]}` : splitPattern[0];

  try {
    const resolvedPackageJson = resolveCwd(`${packageName}/package.json`);

    if (!resolvedPackageJson) {
      // returns pattern if the packageName didn't contain a package.json (not really a package)
      return pattern;
    }

    return pattern.replace(packageName, path.dirname(resolvedPackageJson));
  } catch (e) {
    console.error(e);
  }
}

export function copy() {
  const configPath = path.resolve(process.cwd(), 'config/pre-copy.json');

  if (!fs.existsSync(configPath)) {
    return;
  }

  const config: { copyTo?: { [destination: string]: string | string[] } } = fs.readJSONSync(configPath);
  const errorText =
    'config/pre-copy.json must have this structure: { copyTo: { [destination: string]: string | string[] } }';

  if (!config.copyTo) {
    throw new Error(errorText);
  }

  const tasks = Object.entries(config.copyTo).map(([destination, sources]) => {
    const destinationPath = path.resolve(process.cwd(), destination);

    if (Array.isArray(sources)) {
      return copyTask({
        paths: sources.map(src => expandSourcePath(src)),
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

  return series.apply(null, tasks);
}
