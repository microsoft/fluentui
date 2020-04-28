import * as glob from 'glob';
import * as path from 'path';
import * as accessibility from '@fluentui/accessibility';
import { getAllFluentBehaviorInfo } from '@fluentui/react-docgen';
import { TestHelper } from './testHelper';
import definitions from './testDefinitions';

const behaviorFiles = glob.sync(path.resolve(__dirname, '../../src/behaviors/*/[a-z]*Behavior.ts'));
const behaviorMenuItems = getAllFluentBehaviorInfo(behaviorFiles);

const testHelper = new TestHelper();
testHelper.addTests(definitions);

// Add generic tests for all behaviors except ones on the exclude list
const excludedBehaviors = ['alertBehavior', 'gridRowBehavior', 'listBehavior', 'listItemBehavior'];
behaviorFiles
  .map(filePath => path.basename(filePath).replace('.ts', ''))
  .filter(behavior => !excludedBehaviors.includes(behavior))
  .forEach(behavior => testHelper.addBehavior(behavior, accessibility[behavior]));

testHelper.run(behaviorMenuItems);
