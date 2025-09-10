import * as React from 'react';
import { MenuDivider } from './MenuDivider';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('MenuDivider', () => {
  isConformant({
    Component: MenuDivider,
    displayName: 'MenuDivider',
  });

  /**
   * Note: see more visual regression tests for MenuDivider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuDivider>Default MenuDivider</MenuDivider>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
