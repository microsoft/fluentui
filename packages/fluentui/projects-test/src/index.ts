import { createReactApp } from './createReactApp';
import { nextjs } from './nextjs';
import { rollup } from './rollup';
import { typings } from './typings';

async function performTest() {
  try {
    // Rollup and typings tests are simply faster, if there is an issue they will throw faster
    // than other tests
    await rollup();
    await typings();

    await createReactApp();
    await nextjs();
  } catch (e) {
    console.log(e);

    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log(
      '@fluentui/projects-test: The test suite failed, please check FAQ in "packages/fluentui/projects-test/README.md" for more details',
    );
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');

    process.exit(1);
  }
}

performTest();
