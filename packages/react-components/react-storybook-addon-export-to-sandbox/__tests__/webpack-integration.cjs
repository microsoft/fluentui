const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const webpackCompiler = require('webpack');

const { webpack } = require('../lib-commonjs/webpack.js');

async function main() {
  const outputPath = fs.mkdtempSync(path.join(os.tmpdir(), 'export-to-sandbox-webpack-'));
  const config = webpack(
    {
      mode: 'development',
      devtool: 'source-map',
      context: path.join(__dirname, 'fixtures'),
      entry: './Example.stories.tsx',
      output: { path: outputPath, filename: 'bundle.js' },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: {
              loader: require.resolve('swc-loader'),
              options: {
                jsc: {
                  parser: { syntax: 'typescript', tsx: true },
                  target: 'es2019',
                },
              },
            },
          },
        ],
      },
    },
    {
      presetsList: [
        {
          name: 'node_modules/@fluentui/react-storybook-addon-export-to-sandbox/lib/preset.js',
          preset: {},
          options: { importMappings: {} },
        },
      ],
    },
  );

  try {
    const stats = await compile(config);
    if (stats.hasErrors()) {
      throw new Error(stats.toString({ all: false, errors: true, errorDetails: true }));
    }

    const bundle = fs.readFileSync(path.join(outputPath, 'bundle.js'), 'utf8');
    assert.match(bundle, /Example\.parameters\.fullSource/);
    assert.match(bundle, /label: string/);

    const sourceMap = JSON.parse(fs.readFileSync(path.join(outputPath, 'bundle.js.map'), 'utf8'));
    assert(sourceMap.sources.some(source => source.endsWith('Example.stories.tsx')));
    assert(sourceMap.mappings.length > 0);
  } finally {
    fs.rmSync(outputPath, { recursive: true, force: true });
  }
}

function compile(config) {
  const compiler = webpackCompiler(config);

  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      compiler.close(closeError => {
        if (error || closeError) {
          reject(error || closeError);
        } else if (!stats) {
          reject(new Error('Webpack compilation did not return stats.'));
        } else {
          resolve(stats);
        }
      });
    });
  });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});