import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { setWarningCallback, resetIds } from '@fluentui/utilities';

import { Pivot, PivotItem } from './index';

describe('Pivot', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  it('renders link Pivot correctly', () => {
    const component = create(
      <Pivot>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
