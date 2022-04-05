import * as fs from 'fs';
import * as path from 'path';
import { series, resolveCwd, copyTask, copyInstructionsTask, TaskFunction } from 'just-scripts';

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
  const tasks: TaskFunction[] = [];
  const configPath = path.resolve(process.cwd(), 'config/pre-copy.json');

  if (!fs.existsSync(configPath)) {
    return;
  }

  const config: { copyTo?: Record<string, Array<string> | string> } = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  if (config && config.copyTo) {
    for (const destination in config.copyTo) {
      const sources = config.copyTo[destination];
      const destinationPath = path.resolve(process.cwd(), destination);

      if (Array.isArray(sources)) {
        const sourcePaths = sources.map(src => expandSourcePath(src));

        tasks.push(
          copyTask({
            paths: sourcePaths,
            dest: destinationPath,
          }),
        );

        continue;
      }

      if (typeof sources === 'string') {
        tasks.push(
          copyInstructionsTask({
            copyInstructions: [
              {
                sourceFilePath: sources,
                destinationFilePath: destinationPath,
              },
            ],
          }),
        );

        continue;
      }

      throw new Error('non supported API used. copyTo is a String Dictionary with values being string or string array');
    }
  }

  return series.apply(null, tasks);
}
