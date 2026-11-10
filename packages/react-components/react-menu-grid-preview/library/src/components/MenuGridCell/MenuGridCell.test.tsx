import * as React from 'react';
import { MenuGridCell } from './MenuGridCell';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridCell', () => {
  isConformant({
    Component: MenuGridCell,
    displayName: 'MenuGridCell',
  });

  /**
   * Note: see more visual regression tests for MenuGridCell in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridCell>Default MenuGridCell</MenuGridCell>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
