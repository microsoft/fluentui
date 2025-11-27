import * as React from 'react';
import { MenuGridItem } from './MenuGridItem';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridItem', () => {
  isConformant({
    Component: MenuGridItem,
    displayName: 'MenuGridItem',
  });

  /**
   * Note: see more visual regression tests for MenuGridItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridItem>Default MenuGridItem</MenuGridItem>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
