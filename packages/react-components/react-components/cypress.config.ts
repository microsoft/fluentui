import { defineConfig } from 'cypress';
import { baseConfig } from '@fluentui/scripts-cypress';

const webpackConfig = baseConfig.component.devServer.webpackConfig;

export default defineConfig({
  ...baseConfig,
  component: {
    ...baseConfig.component,
    specPattern: 'e2e/**/*.cy.tsx',
    devServer: {
      ...baseConfig.component.devServer,
      webpackConfig: {
        ...webpackConfig,
        // Opt-in for concurrent runs: source edits made elsewhere must not trigger rebuilds mid-run.
        ...(process.env.FUI_CYPRESS_NO_WATCH ? { watchOptions: { ignored: /./ } } : {}),
        resolve: {
          ...webpackConfig.resolve,
          // Components resolve their CSS Modules alternatives; app-level Griffel styles stay untouched.
          extensionAlias: {
            ...webpackConfig.resolve?.extensionAlias,
            '.styles': ['.styles.css.ts', '.styles.ts'],
            '.styles.js': ['.styles.css.js', '.styles.js'],
          },
        },
        module: {
          ...webpackConfig.module,
          rules: [
            ...(webpackConfig.module?.rules ?? []),
            {
              // Original Griffel hooks (used as the parity baseline) keep resolving Griffel base hooks.
              test: /\.styles\.tsx?$/,
              exclude: /\.styles\.css\.tsx?$/,
              resolve: {
                extensionAlias: { '.styles': ['.styles.ts'], '.styles.js': ['.styles.js'] },
              },
            },
            {
              test: /\.css$/,
              sideEffects: true,
              use: ['style-loader', { loader: 'css-loader', options: { modules: { auto: true, namedExport: false } } }],
            },
          ],
        },
      },
    },
  },
});
