import gutil from 'gulp-util';
import _ from 'lodash';
import path from 'path';
import { Transform } from 'stream';
import through2 from 'through2';
import Vinyl from 'vinyl';

import { parseDocSection } from './util';

const SECTION_ORDER = {
  Types: 1,
  States: 2,
  Content: 3,
  Variations: 4,
  Groups: 5,
  DEFAULT_ORDER: 6,
  Usage: 9,
  Rtl: 10,
  Performance: 11,
};

const getSectionOrder = sectionName =>
  _.find(SECTION_ORDER, (val, key) => _.includes(sectionName, key)) || SECTION_ORDER.DEFAULT_ORDER;

const pluginName = 'gulp-example-menu';

export default () => {
  const exampleFilesByDisplayName: Record<
    string,
    Record<
      string,
      {
        sectionName: string;
        examples: Record<string, any>;
        order: number;
      }
    >
  > = {};

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
      const pathParts = _.split(file.path, path.sep).slice(-4);
      const displayName = pathParts[1];
      const sectionName = pathParts[2];
      const { examples } = parseDocSection(file.contents);

      _.merge(exampleFilesByDisplayName, {
        [displayName]: {
          [sectionName]: {
            sectionName,
            examples,
            order: getSectionOrder(sectionName),
          },
        },
      });

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
    _.forEach(exampleFilesByDisplayName, (contents, displayName) => {
      const sortedContents = _.sortBy(contents, ['order', 'sectionName']).map(({ sectionName, examples }) => ({
        sectionName,
        examples,
      }));

      const file = new Vinyl({
        path: `./${displayName}.examples.json`,
        contents: Buffer.from(JSON.stringify(sortedContents, null, 2)),
      });

      this.push(file);
    });

    cb();
  }

  return through2.obj(bufferContents, endStream);
};
