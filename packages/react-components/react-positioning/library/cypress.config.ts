import { baseConfig } from '@fluentui/scripts-cypress';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Compiler } from 'webpack';

const source = process.env.FLUENT_POSITIONING_ORACLE_SOURCE;
if (source) {
  const webpackConfig = baseConfig.component.devServer.webpackConfig;
  webpackConfig.resolve = {
    ...webpackConfig.resolve,
    alias: { './usePositioning$': path.join(source, 'usePositioning.ts') },
  };
  webpackConfig.plugins = [
    ...(webpackConfig.plugins || []),
    {
      apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('PositioningOracle', compilation => {
          compilation.hooks.finishModules.tap('PositioningOracle', modules => {
            const resources = Array.from(modules).filter(module => 'resource' in module);
            const includesContracts = resources.some(
              module =>
                module.resource === fileURLToPath(new URL('./src/usePositioning.geometry.cy.tsx', import.meta.url)),
            );
            const loaded = resources.some(
              module => 'resource' in module && module.resource === path.join(source, 'usePositioning.ts'),
            );
            if (includesContracts && !loaded) {
              compilation.errors.push(
                new compiler.webpack.WebpackError(
                  'Raster baseline did not load the unchanged oracle usePositioning implementation',
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
