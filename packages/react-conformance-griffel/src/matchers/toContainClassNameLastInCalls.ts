import { mergeClasses } from '@griffel/react';

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainClassNameLastInCalls(className: string): R;
    }
  }
}

type MergeClassesParams = Parameters<typeof mergeClasses>;

/**
 * Custom Jest matcher that implements a check to ensure that passed classes is properly declared in mergeClasses()
 * calls.
 */
export const toContainClassNameLastInCalls: jest.CustomMatcher = (
  result: jest.Mock<{}, MergeClassesParams>['mock']['calls'],
  className: string,
) => {
  let pass = true;
  let message = '';

  result.forEach(classesList => {
    const indexInClassList = classesList.indexOf(className);

    if (indexInClassList >= 0) {
      if (classesList.indexOf(className, indexInClassList + 1) !== -1) {
        pass = false;
        message = [
          `A call to mergeClasses() contains "${className}" more than once.`,
          `Got: ${classesList.join(' ')}`,
        ].join(' ');

        return;
      }

      if (indexInClassList !== classesList.length - 1) {
        pass = false;
        message = [
          `A call to mergeClasses() does not "${className}" as a last param.`,
          `Got: ${classesList.join(' ')}`,
        ].join(' ');

        return;
      }
    }
  });

  return { pass, message: () => message };
};
