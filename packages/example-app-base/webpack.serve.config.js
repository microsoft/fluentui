const path = require('path');

module.exports = {
  entry: './src/index.demo.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js',
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  devtool: 'source-map',

  devServer: {
    inline: true,
    port: 4322
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
}
