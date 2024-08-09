import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SplitNavItem } from './SplitNavItem';

describe('SplitNavItem', () => {
  isConformant({
    Component: SplitNavItem,
    displayName: 'SplitNavItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SplitNavItem>Default SplitNavItem</SplitNavItem>);
    expect(result.container).toMatchSnapshot();
  });
});
