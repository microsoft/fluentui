import * as fs from 'fs';
import * as path from 'path';
import { series, resolveCwd, copyTask } from 'just-scripts';

export function expandSourcePath(pattern) {
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
  let tasks = [];
  let configPath = path.resolve(process.cwd(), 'config/pre-copy.json');

  if (!fs.existsSync(configPath)) {
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  if (config && config.copyTo) {
    for (let destination in config.copyTo) {
      const sources = config.copyTo[destination];
      destination = path.resolve(process.cwd(), destination);
      tasks.push(
        copyTask({
          paths: sources.map(src => expandSourcePath(src)),
          dest: destination,
        }),
      );
    }
  }

  return series.apply(null, tasks);
}
