import { typings } from './typings';

async function performTest() {
  try {
    await typings();
  } catch (e) {
    console.error(e);

    console.log('');
    console.log('@fluentui/ts-minbar-test-react: The test suite failed.');

    process.exit(1);
  }
}

performTest();
