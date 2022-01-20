import { mergeClasses } from '@griffel/react';
import './index';

type MergeClassesParams = Parameters<typeof mergeClasses>;

describe('toContainClassNameLastInCalls', () => {
  it('passes when requirements are met', () => {
    const callA: MergeClassesParams = ['a', 'className'];
    const callB: MergeClassesParams = ['b', 'className'];

    expect(() => {
      expect([callA, callB]).toHaveMergeClassesCalledTimesWithClassName('className', 2);
    }).not.toThrow();
  });

  it('fails on multiple occurrences of a class in multiple calls', () => {
    const callA: MergeClassesParams = ['a', 'className'];
    const callB: MergeClassesParams = ['b', 'className'];

    expect(() => {
      expect([callA, callB]).toHaveMergeClassesCalledTimesWithClassName('className', 4);
    }).toThrowErrorMatchingInlineSnapshot(`
"There were 2 call(s) of mergeClasses() that contain \\"className\\".
Expected: 4
Got: 2
Last call: b className"
`);
  });
});
