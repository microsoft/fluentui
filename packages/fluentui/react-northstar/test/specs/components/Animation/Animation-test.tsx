import * as React from 'react';
import { isConformant } from 'test/specs/commonTests';

import { Animation } from 'src/components/Animation/Animation';
import { mountWithProvider } from 'test/utils';

describe('Animation', () => {
  isConformant(Animation, {
    testPath: __filename,
    constructorName: 'Animation',
    hasAccessibilityProp: false,
    disabledTests: ['as-renders-fc', 'as-passes-as-value', 'as-renders-html', 'as-renders-react-class'],
    requiredProps: { children: <div /> },
  });

  test('does not throw if children is not passed', () => {
    expect(() => mountWithProvider(<Animation />)).not.toThrowError();
  });

  test('does not throw if children function returns undefined', () => {
    expect(() => mountWithProvider(<Animation children={() => undefined} />)).not.toThrowError();
  });
});
