import * as fs from 'fs';
import { createFsFromVolume, Volume } from 'memfs';
import * as path from 'path';
import * as prettier from 'prettier';
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';

async function compileSourceWithWebpack(entryPath: string, configOverrides: webpack.Configuration): Promise<string> {
  const webpackConfig = merge(
    {
      context: __dirname,
      entry: entryPath,

      mode: 'development',

      output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
      },

      module: {
        rules: [
          {
            test: /\.(js|tsx|ts)$/,
            include: path.dirname(entryPath),
            use: {
              loader: path.resolve(__dirname, './index.ts'),
            },
          },
        ],
      },
    },
    configOverrides,
  );
  const compiler = webpack(webpackConfig);

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (typeof stats === 'undefined') {
        reject(new Error('"stats" from Webpack are not available, unknown error...'));
        return;
      }

      const jsonStats = stats.toJson({ source: true });

      if (stats.hasErrors()) {
        reject(stats.toJson().errors![0]);
        return;
      }

      if (!Array.isArray(jsonStats.modules)) {
        reject(new Error(`"stats.toJson().modules" should be an array, this could be a compilation error...`));
        return;
      }

      const entryModule = jsonStats.modules.find(module => module.nameForCondition === entryPath);

      if (!entryModule) {
        reject(new Error(`Failed to find a fixture in "stats.toJson().modules", this could be a compilation error...`));
        return;
      }

      resolve(entryModule.source as string);
    });
  });
}

function fixLineEndings(value: string) {
  return String(value).replace(/\r?\n/g, '\n').trim();
}

/**
 * Test utility similar to "babel-plugin-tester".
 *
 * See https://webpack.js.org/contribute/writing-a-loader/#testing.
 */
function testFixture(fixtureName: string, configOverrides: webpack.Configuration = {}) {
  it(`"${fixtureName}" fixture`, async () => {
    const fixturePath = path.resolve(__dirname, '..', '__fixtures__', fixtureName);

    const jsCodePath = path.resolve(fixturePath, 'code.js');
    const tsCodePath = path.resolve(fixturePath, 'code.ts');
    const tsxCodePath = path.resolve(fixturePath, 'code.tsx');

    const jsOutputPath = path.resolve(fixturePath, 'output.js');
    const tsOutputPath = path.resolve(fixturePath, 'output.ts');
    const tsxOutputPath = path.resolve(fixturePath, 'output.tsx');

    const inputPath = [
      fs.existsSync(jsCodePath) && jsCodePath,
      fs.existsSync(tsCodePath) && tsCodePath,
      fs.existsSync(tsxCodePath) && tsxCodePath,
    ].find(Boolean);
    const outputPath = [
      fs.existsSync(jsOutputPath) && jsOutputPath,
      fs.existsSync(tsOutputPath) && tsOutputPath,
      fs.existsSync(tsxOutputPath) && tsxOutputPath,
    ].find(Boolean);

    const errorPath = path.resolve(fixturePath, 'error.js');
    const expectedError = fs.existsSync(errorPath) && require(errorPath);

    if (!inputPath) {
      throw new Error(`Failed to find "code.{js,ts,tsx}" in "${fixturePath}"`);
    }

    if (!outputPath && !expectedError) {
      throw new Error(`Failed to find "output.{js,ts,tsx}" or "error.js" in "${fixturePath}"`);
    }

    let result = '';
    let resultError: Error | webpack.StatsError = new Error();

    try {
      result = fixLineEndings(
        prettier.format(await compileSourceWithWebpack(inputPath, configOverrides), {
          ...require('../../../prettier.config.js'),
          parser: 'typescript',
        }),
      );
    } catch (err) {
      if (expectedError) {
        resultError = err;
      } else {
        throw err;
      }
    }

    if (outputPath) {
      const output = fixLineEndings(await fs.promises.readFile(outputPath, 'utf8'));

      expect(result).toBe(output);
      return;
    }

    if (expectedError) {
      expect(resultError.message).toMatch(expectedError);
    }
  });
}

describe('webpackLoader', () => {
  // Integration fixtures for base functionality, all scenarios are tested in "babel-make-styles"
  testFixture('object');
  testFixture('function');

  // Asserts that aliases are resolved properly in Babel plugin
  testFixture('webpack-aliases', {
    resolve: {
      alias: {
        'non-existing-color-module': path.resolve(__dirname, '..', '__fixtures__', 'webpack-aliases', 'color.ts'),
      },
    },
  });

  // Asserts handling errors from Babel plugin
  testFixture('error-argument-count');
  // Asserts errors in loader functionality
  testFixture('error-syntax');
});
