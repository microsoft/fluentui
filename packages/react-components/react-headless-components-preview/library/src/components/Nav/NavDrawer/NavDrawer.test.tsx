import * as React from 'react';
import { render } from '@testing-library/react';
import { NavDrawer } from './NavDrawer';
import { NavItem } from '../NavItem';

describe('NavDrawer', () => {
  it('exposes data-type="overlay" by default', () => {
    const result = render(
      <NavDrawer open>
        <NavItem value="item1">Item 1</NavItem>
      </NavDrawer>,
    );

    expect(result.getByRole('dialog')).toHaveAttribute('data-type', 'overlay');
  });

  it('exposes data-type="overlay" when type="overlay" is set explicitly', () => {
    const result = render(
      <NavDrawer type="overlay" open>
        <NavItem value="item1">Item 1</NavItem>
      </NavDrawer>,
    );

    expect(result.getByRole('dialog')).toHaveAttribute('data-type', 'overlay');
  });

  it('exposes data-type="inline" when type="inline" is set', () => {
    const result = render(
      <NavDrawer type="inline" open>
        <NavItem value="item1">Item 1</NavItem>
      </NavDrawer>,
    );

    expect(result.getByText('Item 1').closest('[data-type]')).toHaveAttribute('data-type', 'inline');
  });
});
