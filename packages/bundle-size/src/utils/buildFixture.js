const chalk = require('chalk');
const gzipSize = require('gzip-size');
const fs = require('fs').promises;
const path = require('path');
const { minify } = require('terser');
const webpack = require('webpack');

const { hrToSeconds } = require('./helpers');

/**
 * @param {string} fixturePath
 * @param {string} outputPath
 *
 * @return {import("webpack").Configuration}
 */
function createWebpackConfig(fixturePath, outputPath) {
  return {
    name: 'client',
    target: 'web',
    mode: 'production',

    cache: {
      type: 'memory',
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },

    entry: fixturePath,
    output: {
      filename: path.basename(outputPath),
      path: path.dirname(outputPath),

      pathinfo: true,
    },
    performance: {
      hints: false,
    },
    optimization: {
      minimize: false,
    },
    stats: {
      optimizationBailout: true,
    },
  };
}

/**
 * @param {import("webpack").Configuration} webpackConfig
 * @return {Promise<null>}
 */
function webpackAsync(webpackConfig) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.run(err => {
      if (err) {
        reject(err);
      }

      resolve(null);
    });
  });
}

// ---

/** @typedef {{ name: string, path: string, minifiedSize: number, gzippedSize: number }} BuildResult */

/**
 * Builds a fixture with Webpack and then minifies it with Terser. Produces two files as artifacts:
 * - partially minified file (.output.js) for debugging
 * - fully minified file (.min.js)
 *
 * @param {import('./prepareFixture').PreparedFixture} preparedFixture
 * @param {boolean} quiet
 *
 * @return {Promise<BuildResult>}
 */
module.exports = async function buildFixture(preparedFixture, quiet) {
  const webpackStartTime = process.hrtime();

  const webpackOutputPath = preparedFixture.absolutePath.replace(/.fixture.js$/, '.output.js');
  const config = createWebpackConfig(preparedFixture.absolutePath, webpackOutputPath);

  await webpackAsync(config);

  if (!quiet) {
    console.log(
      [
        chalk.blue('[i]'),
        `"${path.basename(preparedFixture.relativePath)}": Webpack in ${hrToSeconds(process.hrtime(webpackStartTime))}`,
      ].join(' '),
    );
  }

  // ---

  const terserStartTime = process.hrtime();
  const terserOutputPath = preparedFixture.absolutePath.replace(/.fixture.js$/, '.min.js');

  const webpackOutput = (await fs.readFile(webpackOutputPath)).toString();

  const [terserOutput, terserOutputMinified] = await Promise.all([
    // Performs only dead-code elimination
    /* eslint-disable @typescript-eslint/naming-convention */
    minify(webpackOutput, {
      mangle: false,
      output: {
        beautify: true,
        comments: true,
        preserve_annotations: true,
      },
    }),
    minify(webpackOutput, {
      output: {
        comments: false,
      },
    }),
    /* eslint-enable @typescript-eslint/naming-convention */
  ]);

  await fs.writeFile(webpackOutputPath, terserOutput.code);
  await fs.writeFile(terserOutputPath, terserOutputMinified.code);

  if (!quiet) {
    console.log(
      [
        chalk.blue('[i]'),
        `"${path.basename(preparedFixture.relativePath)}": Terser in ${hrToSeconds(process.hrtime(terserStartTime))}`,
      ].join(' '),
    );
  }

  const minifiedSize = (await fs.stat(terserOutputPath)).size;
  const gzippedSize = await gzipSize.file(terserOutputPath);

  return {
    name: preparedFixture.name,
    path: preparedFixture.relativePath,

    minifiedSize,
    gzippedSize,
  };
};
