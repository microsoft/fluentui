import fs from 'fs-extra';
import path from 'path';
import { shEcho, TempPaths } from './utils';

/**
 * Install create-react-app in a temporary utility project to avoid polluting global state
 * (or the test project), then use it to create an app from the specified template.
 * @param tempPaths Temporary directories for this test
 * @param templateSpec Template name or `file:...` path
 */
export async function prepareCreateReactApp(tempPaths: TempPaths, templateSpec: string): Promise<void> {
  const tempUtilProjectPath = path.join(tempPaths.root, 'util');
  fs.mkdirSync(tempUtilProjectPath);

  try {
    // restoring bits of create-react-app inside util project
    await shEcho(`yarn add create-react-app`, tempUtilProjectPath);

    // create test project with util's create-react-app
    await shEcho(`yarn create-react-app ${tempPaths.testApp} --template ${templateSpec}`, tempUtilProjectPath);
  } finally {
    // remove temp util directory
    fs.removeSync(tempUtilProjectPath);
  }
}
