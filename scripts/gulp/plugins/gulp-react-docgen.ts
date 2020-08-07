import gutil from 'gulp-util';
import path from 'path';
import through2 from 'through2';
import Vinyl from 'vinyl';

import { getComponentInfo } from './util';

import config from '../../config';

const { paths } = config;

const pluginName = 'gulp-react-docgen';

export default (tsConfigPath: string, ignoredInterfaces: string[] = []) =>
  through2.obj(function bufferContents(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(pluginName, 'Streaming is not supported'));
      return;
    }

    try {
      const infoFilename = file.basename.replace(/\.tsx$/, '.info.json');
      const contents = getComponentInfo(tsConfigPath, file.path, ignoredInterfaces);
      // Forcing the base & cwd to be paths.base() to make sure this is cached & restored at the right location
      const infoFile = new Vinyl({
        base: paths.docs(),
        cwd: paths.docsSrc('./componentInfo'),
        path: paths.docsSrc(`./componentInfo/${infoFilename}`),
        contents: Buffer.from(JSON.stringify(contents, null, 2)),
      });
      // `gulp-cache` relies on this private entry
      infoFile._cachedKey = file._cachedKey;

      cb(null, infoFile);
    } catch (err) {
      const pluginError = new gutil.PluginError(pluginName, err);
      const relativePath = path.relative(process.cwd(), file.path);
      pluginError.message = [
        gutil.colors.magenta(`Error in file: ${relativePath}`),
        gutil.colors.red(err.message),
        gutil.colors.gray(err.stack),
      ].join('\n\n');
      this.emit('error', pluginError);
    }
  });
