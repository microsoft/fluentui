import path from 'path';

import gutil from 'gulp-util';
import through2 from 'through2';
import Vinyl from 'vinyl';

import config from '../config';

import getComponentInfo, { GetComponentInfoOptions } from './util/getComponentInfo';

const { paths } = config;

const pluginName = 'gulp-react-docgen';

type DocGenPluginOptions = Pick<GetComponentInfoOptions, 'tsconfigPath' | 'ignoredParentInterfaces'>;

export default function reactDocGen(options: DocGenPluginOptions) {
  return through2.obj(function bufferContents(file, enc, cb) {
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
      const contents = getComponentInfo({ ...options, filePath: file.path });

      // Forcing the base & cwd to be paths.docsSrc('componentInfo') to make sure this is cached & restored at the
      // right location. While abs path is important for the first write, the relative calculation is important to
      // gulp-cache
      //
      // vinyl uses these cwd + path to calculate a relative path:
      // https://github.com/gulpjs/vinyl/blob/2e5d7af4ea79f6330b457eb505903c45b4e2365b/index.js#L230
      //
      // Then the vinyl write contents uses relative path to resolve to the output path
      // https://github.com/gulpjs/vinyl-fs/blob/bbfb50c0311a489fd8238a2cbf9524eac0f6bb04/lib/dest/prepare.js#L30

      const infoFile = new Vinyl({
        base: paths.docsSrc('componentInfo'),
        cwd: paths.docsSrc('componentInfo'),
        path: paths.docsSrc(`componentInfo/${infoFilename}`),
        contents: Buffer.from(JSON.stringify(contents, null, 2)),
      });
      // `gulp-cache` relies on this private entry
      infoFile._cachedKey = file._cachedKey;

      cb(null, infoFile);
    } catch (err) {
      if (!(err instanceof Error)) {
        return;
      }

      const pluginError = new gutil.PluginError(pluginName, err);
      const relativePath = path.relative(process.cwd(), file.path);
      pluginError.message = [
        gutil.colors.magenta(`Error in file: ${relativePath}`),
        gutil.colors.red(err.message),
        gutil.colors.gray(err.stack ?? 'error stack is empty'),
      ].join('\n\n');
      this.emit('error', pluginError);
    }
  });
}
