import * as React from 'react';
import { render } from '@testing-library/react';
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
    const { container } = render(
      <Pivot>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
