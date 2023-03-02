import { spawnSync } from 'child_process';
import { workspaceRoot } from '../../utils';

/**
 * It is necessary to run corresponding Gulp task in a separate process.
 * This task relies on Webpack to crawl the imported modules, but when this is run from DangerJS process,
 * there is no crawling happening. This is because of the way DangerJS handles imports:
 * https://spectrum.chat/danger/javascript/danger-js-actually-runs-your-imports-as-globals~0a005b56-31ec-4919-9a28-ced623949d4d
 */
const getRuntimeDependencies = (packageName: string) => {
  const dependencyRegex = /^dependency:\s+(.*)$/;
  const result = spawnSync(`yarn gulp test:dependencies:list --prefix="dependency: " --package=${packageName}`, {
    shell: true,
    cwd: workspaceRoot,
    stdio: 'pipe',
    encoding: 'utf-8',
  });

  const output = `${result.stdout}`;
  const error = `${result.stderr}`;

  if (error) {
    throw new Error(error);
  }

  return (
    output
      .split('\n')
      .map(line => line.match(dependencyRegex))
      .filter(Boolean) as RegExpMatchArray[]
  ).map(match => match[1]);
};

export default getRuntimeDependencies;
