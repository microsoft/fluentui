import webpack from 'webpack';

import { DigestConfig, defaultConfig } from './webpack.config';

// TODO:
// support for addons and decorators (ThemeProvider)
// support for setup (like initializeIcons.) is this an addon?
// use / merge webpack configs (always apply default by default or leave to user?)
// use config function and push rules like storybook?
// bundle react? peer dep? leave up to user? (this package shouldn't even care if react is used)
export async function digestStories(digestConfig: DigestConfig) {
  console.log('Bundling digest..');

  const defaultConfigs = defaultConfig(digestConfig);

  const webpackConfigs = [];

  // TODO: use a real merge. or move this merge into webpack.config.ts and use webpackMerge there.
  // TODO: should also allow user webpack config in DigestConfig that overwrites anything here.
  defaultConfigs.forEach(webpackConfig => {
    const mergedConfig = {
      ...webpackConfig,
      output: {
        ...webpackConfig.output,
        ...{ path: digestConfig.outputDir },
      },
      resolve: {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          ...{ stories: digestConfig.configDir },
        },
      },
    };
    webpackConfigs.push(mergedConfig);
  });

  const webpackTasks = webpackConfigs.map(
    webpackConfig =>
      new Promise((resolve, reject) => {
        webpack(webpackConfig).run((error, stats) => {
          if (error || !stats || stats.hasErrors()) {
            console.error('Failed to create bundle.');

            if (error) {
              console.error(error.message);
            }

            if (stats && (stats.hasErrors() || stats.hasWarnings())) {
              const { warnings, errors } = stats.toJson();

              errors.forEach(e => console.error(e));
              warnings.forEach(e => console.error(e));
            }

            process.exitCode = 1;
            reject(error || stats);
            return;
          }

          stats.toJson().warnings.forEach(e => console.warn(e));

          // TODO: call require.context output and enumerate here? how can it be called within bundle?
          resolve(stats);
        });
      }),
  );

  return Promise.all(webpackTasks);
}

// URL construction based on implementation in index.digest.tsx
export function generateUrl(baseUrl: string, kind: string, story: string, iterations?: number) {
  return `${baseUrl}?selectedKind=${kind}&selectedStory=${story}${iterations ? `&iterations=${iterations}` : ''}`;
}
