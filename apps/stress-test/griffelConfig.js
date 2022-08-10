const { GriffelCSSExtractionPlugin } = require('@griffel/webpack-extraction-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const griffelModes = ['runtime', 'buildtime', 'extraction'];
const mode = process.env.STRESS_TEST_GRIFFEL_MODE;

const griffelMode = griffelModes.includes(mode) ? mode : 'runtime';

const extractionRules = [
  {
    test: /\.(js|ts|tsx)$/,
    // Apply "exclude" only if your dependencies **do not use** Griffel
    // exclude: /node_modules/,
    exclude: [/\.wc\.(ts|tsx)?$/, /v9\/simple\-stress/],
    use: {
      loader: GriffelCSSExtractionPlugin.loader,
    },
  },
  // Add "@griffel/webpack-loader" if you use Griffel directly in your project
  {
    test: /\.(ts|tsx)$/,
    exclude: [/node_modules/, /\.wc\.(ts|tsx)?$/],
    use: {
      loader: '@griffel/webpack-loader',
      options: {
        babelOptions: {
          presets: ['@babel/preset-typescript'],
        },
      },
    },
  },
  // "css-loader" is required to handle produced CSS assets by Griffel
  // you can use "style-loader" or "MiniCssExtractPlugin.loader" to handle CSS insertion
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },
];

const configureGriffel = config => {
  console.log(`Griffel running in ${griffelMode} mode.`);
  if (griffelMode === 'extraction') {
    if (config.module.rules) {
      config.module.rules = [...extractionRules, ...config.module.rules];
    } else {
      config.modules.rules = extractionRules;
    }

    if (config.plugins) {
      config.plugins = [...config.plugins, new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin()];
    } else {
      config.plugins = [new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin()];
    }
  }

  return config;
};

module.exports = {
  configureGriffel,
};
