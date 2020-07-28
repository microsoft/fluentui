import webpack from 'webpack';
import config from '../config';
import webpackConfig from './webpack.config';

const { paths } = config;

const webpackUMDConfig = (packageName: string): webpack.Configuration => {
  const pkg = require(`../../packages/fluentui/${packageName}/package.json`);

  return {
    target: 'web',
    mode: 'production',
    devtool: false,
    entry: {
      [pkg.name]: paths.packageSrc(packageName, 'umd.ts'),
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    output: {
      filename: `fluent-ui-${packageName}.min.js`,
      libraryTarget: 'umd',
      library: 'FluentUI',
      path: paths.packageDist(packageName, 'umd'),
      publicPath: '/',
      pathinfo: true,
    },
    resolve: webpackConfig.resolve,
    module: {
      noParse: webpackConfig.module.noParse,
      rules: webpackConfig.module.rules,
    },
    performance: {
      hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
    },
  };
};

export default webpackUMDConfig;
