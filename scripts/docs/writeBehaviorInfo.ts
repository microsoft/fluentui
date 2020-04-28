import * as glob from 'glob';
import * as fs from 'fs-extra';
import { behaviorSrc, behaviorInfoFile } from './constants';
import { getAllFluentBehaviorInfo } from '@fluentui/react-docgen';

export function writeBehaviorInfo() {
  const behaviorInfo = getAllFluentBehaviorInfo(glob.sync(behaviorSrc));
  fs.writeJSONSync(behaviorInfoFile, behaviorInfo);
}
