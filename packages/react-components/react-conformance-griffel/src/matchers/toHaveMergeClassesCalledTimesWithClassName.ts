import { mergeClasses } from '@griffel/react';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveMergeClassesCalledTimesWithClassName(className: string, times: number): R;
    }
  }
}

type MergeClassesParams = Parameters<typeof mergeClasses>;

/**
 * Custom Jest matcher that implements a check to ensure that mergeClasses() function with a passes class got called
 * exact number of times.
 */
export const toHaveMergeClassesCalledTimesWithClassName: jest.CustomMatcher = (
  result: jest.Mock<{}, MergeClassesParams>['mock']['calls'],
  className: string,
  expectedTimes: number,
) => {
  let pass = true;
  let message = '';

  const callCount = result.reduce((acc, classesList) => {
    if (classesList.includes(className)) {
      return acc + 1;
    }

    return acc;
  }, 0);

  if (callCount !== expectedTimes) {
    pass = false;
    message = [
      `There were ${callCount} call(s) of mergeClasses() that contain "${className}".`,
      `Expected: ${expectedTimes}`,
      `Got: ${callCount}`,
      `Last call: ${result[result.length - 1].join(' ')}`,
    ].join('\n');
  }

  return { pass, message: () => message };
};
