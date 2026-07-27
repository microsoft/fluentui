import * as React from 'react';

import {
  CLASSNAME_OVERRIDES_WIN_TEST_NAME,
  assertConsumerClassNameWins,
  classNameOverridesWin,
} from './classNameOverridesWin';
import type { IsConformantOptions } from './types';

const displayName = 'TestComponent';
const consumerClassName = 'consumer-classname';

describe('assertConsumerClassNameWins', () => {
  it('passes when the consumer className is the last class', () => {
    expect(() =>
      assertConsumerClassNameWins({
        displayName,
        consumerClassName,
        classNames: ['fui-TestComponent', 'fuicm-root', consumerClassName],
      }),
    ).not.toThrow();
  });

  it('throws when the consumer className is absent', () => {
    expect(() =>
      assertConsumerClassNameWins({
        displayName,
        consumerClassName,
        classNames: ['fui-TestComponent', 'fuicm-root'],
      }),
    ).toThrow(/does not apply the consumer's "className" to its root slot/);
  });

  it('throws when class names follow the consumer className', () => {
    // The shape an unconverted, Griffel-composed component renders: mergeClasses appends
    // its atomic classes after every non-atomic string, including the consumer's.
    expect(() =>
      assertConsumerClassNameWins({
        displayName,
        consumerClassName,
        classNames: ['fui-Badge', 'r1iycov', consumerClassName, '___g1d9dq0_1moluvk', 'ffp7eso', 'f1phragk'],
      }),
    ).toThrow(/renders class names AFTER the consumer's "className"/);
  });

  it('names the offending trailing class names', () => {
    expect(() =>
      assertConsumerClassNameWins({
        displayName,
        consumerClassName,
        classNames: ['fui-TestComponent', consumerClassName, 'ffp7eso'],
      }),
    ).toThrow(/ffp7eso/);
  });

  it('throws rather than passing vacuously when the component contributed no class names', () => {
    expect(() =>
      assertConsumerClassNameWins({ displayName, consumerClassName, classNames: [consumerClassName] }),
    ).toThrow(/rendered no class names of its own/);
  });
});

describe(CLASSNAME_OVERRIDES_WIN_TEST_NAME, () => {
  // Registers the real conformance test against a component that composes the way a
  // converted component does — static class first, consumer className last.
  const ClsxComponent = (props: { className?: string }) => (
    <div className={['fui-ClsxComponent', 'fuicm-root', props.className].filter(Boolean).join(' ')} />
  );

  classNameOverridesWin({
    Component: ClsxComponent,
    displayName: 'ClsxComponent',
    componentPath: __filename,
  } as IsConformantOptions);
});
