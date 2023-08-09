import path from 'path';

import gutil from 'gulp-util';
import _ from 'lodash';
import through2, { FlushCallback, TransformFunction } from 'through2';
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

const getSectionOrder = (sectionName: string) =>
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

  const bufferContents: TransformFunction = function (file, enc, cb) {
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
  };

  const endStream: FlushCallback = function (cb) {
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
  };

  return through2.obj(bufferContents, endStream);
};
