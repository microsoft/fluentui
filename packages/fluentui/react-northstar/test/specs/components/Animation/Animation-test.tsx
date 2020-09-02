import * as React from 'react';
import { isConformant } from 'test/specs/commonTests';

import { Animation } from 'src/components/Animation/Animation';
import { mountWithProvider } from 'test/utils';

describe('Animation', () => {
  isConformant(Animation, {
    constructorName: 'Animation',
    hasAccessibilityProp: false,
    requiredProps: { children: <div /> },
    handlesAsProp: false,
  });

  test('does not throw if children is not passed', () => {
    expect(() => mountWithProvider(<Animation />)).not.toThrowError();
  });

  test('does not throw if children function returns undefined', () => {
    expect(() => mountWithProvider(<Animation children={() => undefined} />)).not.toThrowError();
  });
});
