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

  if (fs.existsSync(tempPaths.testApp)) {
    fs.removeSync(tempPaths.testApp);
  }

  fs.mkdirSync(tempUtilProjectPath);
  fs.writeJsonSync(path.join(tempUtilProjectPath, 'package.json'), { private: true });

  try {
    await shEcho(`yarn add create-react-app`, tempUtilProjectPath);
    await shEcho(`yarn create-react-app ${tempPaths.testApp} --template ${templateSpec}`, tempUtilProjectPath);
  } finally {
    fs.removeSync(tempUtilProjectPath);
  }
}
