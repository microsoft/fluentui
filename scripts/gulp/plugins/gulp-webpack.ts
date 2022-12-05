import webpack from 'webpack';
import config from '../config';
import { log, PluginError } from 'gulp-util';

const { __DEV__, __SKIP_ERRORS__ } = config.compiler_globals;

const DEV_SKIP_ERRORS = __DEV__ && __SKIP_ERRORS__;

const webpackPlugin = (webpackConfig: any, cb: (error?: any) => void, onComplete = (err: any, stats: any) => {}) => {
  webpack(webpackConfig).run((err, stats) => {
    const { errors = [], warnings = [] } = stats?.toJson() ?? {};
    onComplete(err, stats);

    log(stats?.toString(config.compiler_stats));

    if (err) {
      log('Webpack compiler encountered a fatal error.');
      throw new PluginError('webpack', err.toString());
    }
    if (!DEV_SKIP_ERRORS && errors.length > 0) {
      log('Webpack compiler encountered errors.');
      throw new PluginError('webpack', errors.toString());
    }
    if (!DEV_SKIP_ERRORS && warnings.length > 0) {
      throw new PluginError('webpack', warnings.toString());
    }

    cb(err);
  });
};

export default webpackPlugin;
