import gutil from 'gulp-util';
import path from 'path';
import through2 from 'through2';
import Vinyl from 'vinyl';
import _ from 'lodash';
import fs from 'fs';
import doctrine from 'doctrine';
import { Transform } from 'stream';
import config from '../../config';

const { paths } = config;

const pluginName = 'gulp-component-menu-behaviors';
const extract = require('extract-comments');

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

      // generate behavior description from 'behavior definition' file if no was found in behavior file
      if (!variation.specification) {
        const variationName = variation.name.replace('.ts', '');
        const definitionName = `${variationName}Definition`;

        const absPathToBehaviorDefinition = path.normalize(
          `${paths.posix.allPackages('a11y-testing')}/src/definitions/${behaviorName}/${definitionName}.ts`,
        );
        // delete require cache only works for absolute file path. This is required to get latest changes in behaviors for watch process
        delete require.cache[absPathToBehaviorDefinition];
        let definition;
        try {
          // behavior definition file may not exist for components that haven't migrate to using a11y-testing
          definition = require(absPathToBehaviorDefinition)?.[definitionName];
        } catch (e) {
          // require throws error when file is not found
        }

        // in some cases specification doesn't exists as well not definition for the behavior (alertBaseBehavior.ts)
        if (definition) {
          const specificationFromDefinition = definition
            .map(definition => {
              return definition.getData().hidden ? undefined : definition.stringify();
            })
            .filter(Boolean);

          variation.specification = specificationFromDefinition.join('\r\n');
        }

        result.push({
          displayName: behaviorName,
          type: componentType,
          variations: variation,
        });
        cb();
      } else {
        result.push({
          displayName: behaviorName,
          type: componentType,
          variations: variation,
        });
        cb();
      }
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
