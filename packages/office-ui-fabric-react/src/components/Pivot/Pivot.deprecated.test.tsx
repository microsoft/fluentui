import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { setWarningCallback, resetIds } from '@uifabric/utilities';

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
    const component = renderer.create(
      <Pivot>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
