import * as path from 'path';
import * as _ from 'lodash';

import { FluentBehaviorInfo, FluentBehaviorVariation, DocTag } from '@fluentui/react-docgen-types';
import { getDocBlock } from './utils/index';

function getTextFromCommentToken(commentTokens: DocTag[], tokenTitle: string): string {
  const resultToken = commentTokens.find(token => token.title === tokenTitle);
  return resultToken ? resultToken.description || '' : '';
}

function getBehaviorInfo(file: string): FluentBehaviorInfo {
  const absPath = path.join(process.cwd(), file);
  const dir = path.dirname(absPath);
  const behaviorVariantName = path.basename(file);
  const behaviorName = path.basename(dir);

  const docblock = getDocBlock(absPath);
  const commentTokens = docblock.tags;

  const variation: FluentBehaviorVariation = {
    name: behaviorVariantName,
    // getting description and specification of the comment's text
    description: getTextFromCommentToken(commentTokens, 'description'),
    specification: getTextFromCommentToken(commentTokens, 'specification'),
  };

  return {
    displayName: behaviorName,
    variations: [variation],
  };
}

export function getAllFluentBehaviorInfo(files: string[]): FluentBehaviorInfo[] {
  return _.chain(files)
    .map(file => {
      try {
        return getBehaviorInfo(file);
      } catch (err) {
        err.message = `Error getting behavior info for ${file}:\n\n  ${err.message}`;
        err.stack = `${err.message}\n\n${err.stack || ''}`;
        throw err;
      }
    })
    .groupBy('displayName')
    .map(
      (behaviors, displayName): FluentBehaviorInfo => ({
        displayName,
        variations: _.flatMap(behaviors, 'variations'),
      }),
    )
    .value();
}
