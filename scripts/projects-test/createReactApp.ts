import fs from 'fs-extra';
import path from 'path';
import { shEcho } from './utils';

/**
 * Install create-react-app in a temporary utility project to avoid polluting global state
 * (or the test project), then use it to create an app from the specified template.
 * @param tmpDirectory Temporary directory for this test
 * @param templateSpec Template name or `file:...` path
 * @param appName Name of the app to create
 * @returns Path to the app
 */
export async function prepareCreateReactApp(
  tmpDirectory: string,
  templateSpec: string,
  appName: string,
): Promise<string> {
  const tempUtilProjectPath = path.join(tmpDirectory, 'util');
  const appProjectPath = path.join(tmpDirectory, appName);

  fs.mkdirSync(tempUtilProjectPath);

  try {
    // restoring bits of create-react-app inside util project
    await shEcho('yarn add create-react-app', tempUtilProjectPath);

    // create test project with util's create-react-app
    fs.mkdirSync(appProjectPath);
    await shEcho(`yarn create-react-app ${appProjectPath} --template ${templateSpec}`, tempUtilProjectPath);
  } finally {
    // remove temp util directory
    fs.removeSync(tempUtilProjectPath);
  }

  return appProjectPath;
}
