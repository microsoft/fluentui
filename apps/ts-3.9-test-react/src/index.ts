import { typings } from './typings';

async function performTest() {
  try {
    await typings();
  } catch (e) {
    console.log(e);

    console.log('');
    console.log(
      '@fluentui/ts-3.9-test-react: The test suite failed, please check FAQ in "packages/fluentui/projects-test/README.md" for more details',
    );

    process.exit(1);
  }
}

performTest();
