import { baseConfig } from '@fluentui/scripts-cypress';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Compiler } from 'webpack';

const source = process.env.FLUENT_POSITIONING_ORACLE_SOURCE;
baseConfig.component.excludeSpecPattern = [
  ...(baseConfig.component.excludeSpecPattern ?? []),
  '**/usePositioning.performance.cy.tsx',
];
if (source) {
  const webpackConfig = baseConfig.component.devServer.webpackConfig;
  webpackConfig.resolve = {
    ...webpackConfig.resolve,
    alias: {
      ...webpackConfig.resolve?.alias,
      ...(process.env.FLUENT_POSITIONING_BENCHMARK
        ? { '@positioning-oracle': source }
        : { './usePositioning$': path.join(source, 'usePositioning.ts') }),
    },
  };
  webpackConfig.plugins = [
    ...(webpackConfig.plugins || []),
    {
      apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('PositioningOracle', compilation => {
          compilation.hooks.finishModules.tap('PositioningOracle', modules => {
            const resources = Array.from(modules).filter(module => 'resource' in module);
            const benchmark = !!process.env.FLUENT_POSITIONING_BENCHMARK;
            const specPath = benchmark ? 'usePositioning.performance.cy.tsx' : 'usePositioning.geometry.cy.tsx';
            const includesSpec = resources.some(
              module => module.resource === fileURLToPath(new URL(`./src/${specPath}`, import.meta.url)),
            );
            const loaded = resources.some(module => module.resource === path.join(source, 'usePositioning.ts'));
            if (includesSpec && !loaded) {
              compilation.errors.push(
                new compiler.webpack.WebpackError(
                  benchmark
                    ? 'Performance benchmark did not load the immutable Floating UI oracle'
                    : 'Raster baseline did not load the unchanged oracle usePositioning implementation',
                ),
              );
            }
          });
        });
      },
    },
  ];
}

export default baseConfig;
