/* eslint-disable no-console */
import sh from '@fluentui/scripts/gulp/sh'; // eslint-disable-line
import tmp from 'tmp'; // eslint-disable-line
import path from 'path';

// TODO this should ideally be merged with `packages/fluetui/project-tests/src/createReactApp.ts`

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
tmp.setGracefulCleanup();

async function shEcho(cmd: string, cwd?: string) {
  console.log(`+ cd ${cwd ?? '.'} && ${cmd}`);
  await sh(cmd, cwd);
}

async function runE2ETest() {
  try {
    const tmpDir = tmp.dirSync({ prefix: 'cra-test-', unsafeCleanup: true });
    const craPath = path.resolve(tmpDir.name, 'cra-app');
    await shEcho(`npx create-react-app ${craPath} --template file:.`);
    await shEcho('CI=true yarn build', craPath);
    await shEcho('CI=true yarn test', craPath);
  } catch (e) {
    console.log('@fluentui/cra-template: tests failed with error:');
    console.log(e);
    process.exit(1);
  }
}

runE2ETest();
