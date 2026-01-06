import * as React from 'react';
import { MenuGrid } from './MenuGrid';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('MenuGrid', () => {
  isConformant({
    Component: MenuGrid,
    displayName: 'MenuGrid',
  });

  /**
   * Note: see more visual regression tests for MenuGrid in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGrid>Default MenuGrid</MenuGrid>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
