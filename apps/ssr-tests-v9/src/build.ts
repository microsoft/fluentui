import { getPackageStoriesGlob } from '@fluentui/scripts-storybook';
import { isCI } from 'ci-info';
import * as fs from 'fs';
import * as path from 'path';

import { buildAssets } from './utils/buildAssets';
import { generateEntryPoints } from './utils/generateEntryPoints';
import { hrToSeconds } from './utils/helpers';
import { renderToHTML } from './utils/renderToHTML';
import { getChromeVersion } from './utils/getChromeVersion';

async function build() {
  const distDirectory = path.resolve(__dirname, '..', 'dist');

  if (!fs.existsSync(distDirectory)) {
    await fs.promises.mkdir(distDirectory);
  }

  const esmEntryPoint = path.resolve(distDirectory, 'App.tsx');
  const cjsEntryPoint = path.resolve(distDirectory, 'stories.tsx');

  const cjsOutfile = path.resolve(distDirectory, 'out-cjs.js');
  const esmOutfile = path.resolve(distDirectory, 'out-esm.js');
  const htmlOutfile = path.resolve(__dirname, '..', 'dist', 'index.html');

  const generateStartTime = process.hrtime();

  // Portals currently do not support hydration
  // https://github.com/facebook/react/issues/13097
  const skippedPaths = ['react-portal'];

  const rawStoriesGlobs = getPackageStoriesGlob({
    packageName: '@fluentui/react-components',
    callerPath: __dirname,
  }).filter(
    (storyPath: string) =>
      // only return entries that don't match any of the skippedPaths
      !skippedPaths.find(skippedPath => {
        if (storyPath.includes(skippedPath)) {
          return true;
        }
        return false;
      }),
  ) as string[];

  rawStoriesGlobs.push(path.resolve(path.join(__dirname, './stories/**/index.stories.tsx')));
  const storiesGlobs = rawStoriesGlobs
    // TODO: Find a better way for this. Pass the path via params? 👇
    .map(pattern => path.resolve(__dirname, pattern));

  await generateEntryPoints({
    esmEntryPoint,
    cjsEntryPoint,
    storiesGlobs,
  });

  console.log(`Entry points were generated in ${hrToSeconds(process.hrtime(generateStartTime))}`);

  // ---

  const chromeVersion = await getChromeVersion();
  const buildStartTime = process.hrtime();

  await buildAssets({
    chromeVersion,

    esmEntryPoint,
    cjsEntryPoint,

    cjsOutfile,
    esmOutfile,
  });

  console.log(`Assets were built in ${hrToSeconds(process.hrtime(buildStartTime))}`);

  // ---

  const renderStartTime = process.hrtime();

  await renderToHTML({
    cjsOutfile,
    esmOutfile,
    htmlOutfile,
  });

  console.log(`Render done in ${hrToSeconds(process.hrtime(renderStartTime))}`);

  if (!isCI) {
    console.log('');
    console.log(
      'You can use `$ npx serve dist` or `$ open dist/index.html` to load produced artifacts in your browser',
    );
    console.log('');
  }
}

build().catch(err => {
  console.log(err);
  process.exit(1);
});
