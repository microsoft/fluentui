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

  const rawStoriesGlobs: string[] = getPackageStoriesGlob({
    packageName: '@fluentui/react-components',
    callerPath: __dirname,
  });

  // Add stories defined in the package
  rawStoriesGlobs.push(path.resolve(path.join(__dirname, './stories/**/index.stories.tsx')));

  const storiesGlobs = rawStoriesGlobs
    // TODO: Find a better way for this. Pass the path via params? 👇
    .map(pattern => path.resolve(__dirname, pattern));

  const { ignoredStories } = await generateEntryPoints({
    esmEntryPoint,
    cjsEntryPoint,
    storiesGlobs,
    ignore: [
      // Portals currently do not support hydration
      // https://github.com/facebook/react/issues/13097
      '**/react-portal/**',
      // https://github.com/microsoft/fluentui/issues/27338
      '**/react-table/stories/DataGrid/Virtualization.stories',
      '**/react-table/stories/Table/Virtualization.stories',
    ],
  });

  if (ignoredStories.length > 0) {
    console.log('Following stories were excluded by config:');
    console.log(ignoredStories.map(filepath => `- ${filepath}`).join('\n'));
  }

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
