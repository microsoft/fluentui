import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavSubItem } from './NavSubItem';

describe('NavSubItem', () => {
  isConformant({
    Component: NavSubItem,
    displayName: 'NavSubItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavSubItem>Default NavSubItem</NavSubItem>);
    expect(result.container).toMatchSnapshot();
  });
});
