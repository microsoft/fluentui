import { Tree, stripIndents, getProjects, formatFiles } from '@nrwl/devkit';
import * as os from 'os';
import { getProjectConfig, isPackageConverged, printUserLogs, UserLog } from '../../utils';

const npmIgnore =
  stripIndents`
    .storybook/
    .vscode/
    bundle-size/
    config/
    coverage/
    e2e/
    etc/
    node_modules/
    src/
    temp/
    __fixtures__
    __mocks__
    __tests__

    *.api.json
    *.log
    *.spec.*
    *.stories.*
    *.test.*
    *.yml

    # config files
    *config.*
    *rc.*
    .editorconfig
    .eslint*
    .git*
    .prettierignore
  ` + os.EOL;

const userLog: UserLog = [];

export default async function (tree: Tree) {
  const projects = getProjects(tree);

  projects.forEach((project, packageName) => {
    const projectConfig = getProjectConfig(tree, { packageName });
    if (isPackageConverged(tree, projectConfig.projectConfig)) {
      userLog.push({ type: 'info', message: `Updating npmignore in ${packageName}` });
      tree.write(projectConfig.paths.npmConfig, npmIgnore);
    }
  });

  await formatFiles(tree);

  return () => {
    printUserLogs(userLog);
  };
}
