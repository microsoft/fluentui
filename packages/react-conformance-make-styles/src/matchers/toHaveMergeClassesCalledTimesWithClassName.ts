import { mergeClasses } from '@fluentui/react-make-styles';

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
  let callCount: number = 0;

  let pass = true;
  let message = '';

  result.forEach(classesList => {
    const indexInClassList = classesList.indexOf(className);

    if (indexInClassList >= 0) {
      callCount += 1;
    }
  });

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
