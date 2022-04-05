import { toContainClassNameLastInCalls } from './toContainClassNameLastInCalls';
import { toHaveMergeClassesCalledTimesWithClassName } from './toHaveMergeClassesCalledTimesWithClassName';

expect.extend({
  toContainClassNameLastInCalls,
  toHaveMergeClassesCalledTimesWithClassName,
});
