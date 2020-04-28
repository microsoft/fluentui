import gutil from 'gulp-util';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import through2 from 'through2';
import Vinyl from 'vinyl';
import { Transform } from 'stream';

import config from '../../config';
import getComponentInfo from './util/getComponentInfo';

const pluginName = 'gulp-component-menu';

type ComponentMenuItem = {
  displayName: string;
  type: string;
};

export default (tsConfigPath: string) => {
  const result: ComponentMenuItem[] = [];

  function bufferContents(this: Transform, file, enc, cb) {
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
      const infoFilePath = config.paths.docsSrc('componentInfo', infoFilename);

      let componentInfo;

      // We will reuse an info file if it exists.
      if (fs.existsSync(infoFilePath)) {
        const jsonInfo = fs.readFileSync(infoFilePath);
        componentInfo = JSON.parse(jsonInfo.toString());
      } else {
        componentInfo = getComponentInfo(tsConfigPath, file.path, []);
      }

      if (componentInfo.isParent) {
        result.push({
          displayName: componentInfo.displayName,
          type: componentInfo.type,
        });
      }
      cb();
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
  }

  function endStream(this: Transform, cb) {
    const file = new Vinyl({
      path: './componentMenu.json',
      contents: Buffer.from(JSON.stringify(_.sortBy(result, 'displayName'), null, 2)),
    });

    this.push(file);
    cb();
  }

  return through2.obj(bufferContents, endStream);
};
