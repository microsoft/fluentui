import * as React from 'react';
import { MenuGridRow } from './MenuGridRow';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridRow', () => {
  isConformant({
    Component: MenuGridRow,
    displayName: 'MenuGridRow',
  });

  /**
   * Note: see more visual regression tests for MenuGridRow in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridRow>Default MenuGridRow</MenuGridRow>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
