import fs from 'fs-extra';
import { shEcho, TempPaths } from './utils';

/**
 * Install create-react-app in a temporary utility project to avoid polluting global state
 * (or the test project), then use it to create an app from the specified template.
 * @param tempPaths Temporary directories for this test
 * @param templateSpec Template name or `file:...` path
 */
export async function prepareCreateReactApp(tempPaths: TempPaths, templateSpec: string): Promise<void> {
  if (fs.existsSync(tempPaths.testApp)) {
    fs.removeSync(tempPaths.testApp);
  }

  const npmUserAgent = `npm/${process.version} node/${process.version}`;
  await shEcho(
    `npm_config_user_agent="${npmUserAgent}" npx create-react-app ${tempPaths.testApp} --template ${templateSpec}`,
    tempPaths.root,
  );
}
