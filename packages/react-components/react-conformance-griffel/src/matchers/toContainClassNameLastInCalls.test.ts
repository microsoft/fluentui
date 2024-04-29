import { mergeClasses } from '@griffel/react';
import './index';

type MergeClassesParams = Parameters<typeof mergeClasses>;

describe('toContainClassNameLastInCalls', () => {
  it('passes when requirements are met', () => {
    const call: MergeClassesParams = ['foo', 'bar', 'className'];

    expect(() => {
      expect([call]).toContainClassNameLastInCalls('className');
    }).not.toThrow();
  });

  it('fails on multiple occurrences of a class in a single call', () => {
    const call: MergeClassesParams = ['foo', 'className', 'className'];

    expect(() => {
      expect([call]).toContainClassNameLastInCalls('className');
    }).toThrowErrorMatchingInlineSnapshot(
      `"A call to mergeClasses() contains \\"className\\" more than once. Got: foo className className"`,
    );
  });

  it('fails on when a class is not last', () => {
    const call: MergeClassesParams = ['className', 'foo'];

    expect(() => {
      expect([call]).toContainClassNameLastInCalls('className');
    }).toThrowErrorMatchingInlineSnapshot(
      `"A call to mergeClasses() does not \\"className\\" as a last param. Got: className foo"`,
    );
  });
});
