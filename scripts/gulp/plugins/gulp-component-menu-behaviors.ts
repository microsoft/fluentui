import gutil from 'gulp-util';
import path from 'path';
import through2 from 'through2';
import Vinyl from 'vinyl';
import _ from 'lodash';
import fs from 'fs';
import { Transform } from 'stream';

const pluginName = 'gulp-component-menu-behaviors';
const extract = require('extract-comments');
const doctrine = require('doctrine');

type BehaviorMenuItem = {
  displayName: string;
  type: string;
  variations: {
    name: string;
    description: string;
    specification: string;
  };
};

const getTextFromCommentToken = (commentTokens, tokenTitle): string => {
  const resultToken = commentTokens.find(token => token.title === tokenTitle);
  return resultToken ? resultToken.description : '';
};

export default () => {
  const result: BehaviorMenuItem[] = [];
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
      const absPath = path.resolve(process.cwd(), file.path);
      const dir = path.dirname(absPath);
      const componentType = _.lowerFirst(path.basename(path.dirname(dir)).replace(/s$/, ''));
      const behaviorVariantName = file.basename;
      const behaviorName = path.basename(dir);
      const fileContent = fs.readFileSync(file.path).toString();
      const blockComments = extract(fileContent).filter(comment => comment.type === 'BlockComment'); // filtering only block comments
      const variation = {
        name: behaviorVariantName,
        description: '',
        specification: '',
      };

      // getting description and specification of the comment's text
      if (!_.isEmpty(blockComments)) {
        const commentTokens = doctrine.parse(blockComments[0].raw, { unwrap: true }).tags;
        variation.description = getTextFromCommentToken(commentTokens, 'description');
        variation.specification = getTextFromCommentToken(commentTokens, 'specification');
      }

      result.push({
        displayName: behaviorName,
        type: componentType,
        variations: variation,
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

  function getParsedResults() {
    return _.chain(result)
      .groupBy('displayName')
      .map((behaviors, displayName) => ({
        displayName,
        type: behaviors[0].type,
        variations: _.map(behaviors, 'variations'),
      }))
      .value();
  }

  function endStream(this: Transform, cb) {
    const file = new Vinyl({
      path: './behaviorMenu.json',
      contents: Buffer.from(JSON.stringify(getParsedResults(), null, 2)),
    });

    this.push(file);
    cb();
  }

  return through2.obj(bufferContents, endStream);
};
