const path = require('node:path');

const webpack = require('webpack');

const packageRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(packageRoot, '../../../..');
const fixture = process.argv[2] ?? 'PositioningRuntime.fixture.js';
const outputPath = path.join(packageRoot, 'dist', 'positioning-runtime-bundle', path.parse(fixture).name);
const entry = path.join(packageRoot, 'bundle-size', fixture);

const isFallbackRuntime = resource =>
  resource.includes(`${path.sep}usePositioning${path.sep}fallbackPositioningRuntime.`);

const isFallbackDependency = resource =>
  resource.includes(`${path.sep}react-positioning${path.sep}`) ||
  resource.includes(`${path.sep}@fluentui${path.sep}react-positioning${path.sep}`) ||
  resource.includes(`${path.sep}@floating-ui${path.sep}`);

class VerifyPositioningRuntimeChunksPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('VerifyPositioningRuntimeChunksPlugin', compilation => {
      const fallbackChunks = new Set();
      const initialViolations = new Set();

      for (const module of compilation.modules) {
        const resource = module.resource ?? module.nameForCondition?.();
        if (!resource) {
          continue;
        }

        for (const chunk of compilation.chunkGraph.getModuleChunks(module)) {
          if (isFallbackRuntime(resource)) {
            fallbackChunks.add(chunk);
          }

          if (isFallbackDependency(resource) && chunk.canBeInitial()) {
            initialViolations.add(resource);
          }
        }
      }

      if (fallbackChunks.size !== 1) {
        compilation.errors.push(
          new Error(`Expected one async positioning fallback boundary, found ${fallbackChunks.size}.`),
        );
      } else if ([...fallbackChunks][0].canBeInitial()) {
        compilation.errors.push(new Error('Positioning fallback runtime was retained in an initial chunk.'));
      }

      if (initialViolations.size > 0) {
        compilation.errors.push(
          new Error(
            [
              'Fallback positioning code was retained in an initial chunk:',
              ...[...initialViolations].sort().map(resource => `  ${resource}`),
            ].join('\n'),
          ),
        );
      }
    });
  }
}

const compiler = webpack({
  name: 'positioning-runtime-bundle',
  target: 'web',
  mode: 'production',
  context: workspaceRoot,
  entry,
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
    'react/compiler-runtime': 'react/compiler-runtime',
  },
  output: {
    path: outputPath,
    filename: 'index.js',
    chunkFilename: '[name].js',
  },
  performance: { hints: false },
  optimization: {
    concatenateModules: false,
    minimize: false,
    splitChunks: false,
  },
  module: {
    rules: [{ test: /\.[cm]?js$/, resolve: { fullySpecified: false } }],
  },
  plugins: [new VerifyPositioningRuntimeChunksPlugin()],
});

compiler.run((error, stats) => {
  compiler.close(() => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
      return;
    }

    if (!stats) {
      console.error('webpack finished without producing stats');
      process.exitCode = 1;
      return;
    }

    if (stats.hasErrors()) {
      const errors = stats.toJson({ all: false, errors: true }).errors ?? [];
      console.error(errors.map(item => item.message).join('\n'));
      process.exitCode = 1;
      return;
    }

    console.log(`${fixture}: positioning fallback is isolated in one asynchronous boundary.`);
  });
});
