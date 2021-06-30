import sh from '@fluentui/scripts/gulp/sh'; // eslint-disable-line
import fs from 'fs';
import tmp from 'tmp';
import path from 'path';
import semver from 'semver';

// TODO this should ideally be merged with `packages/fluetui/project-tests/src/createReactApp.ts`

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
tmp.setGracefulCleanup();

async function shEcho(cmd: string, cwd?: string) {
  console.log(`+ cd ${cwd ?? '.'} && ${cmd}`);
  await sh(cmd, cwd);
}

function verifyVersion() {
  const templateJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../template.json'), 'utf8'));
  const templateVersion = templateJson.package.dependencies['@fluentui/react'];
  const reactPackageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../react/package.json'), 'utf8'));
  const actualVersion = reactPackageJson.version;
  if (!semver.satisfies(actualVersion, templateVersion)) {
    console.error(
      `@fluentui/react version ${reactPackageJson} does not satisfy template version range ${templateVersion}.`,
    );
    console.error('Please update the @fluentui/react version listed in cra-template/template.json.');
    process.exit(1);
  }
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

verifyVersion();
runE2ETest();
