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

  it('does not forward Nav props to the overlay dialog', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const { getByRole } = render(
        <NavDrawer open selectedValue="item1" openCategories={['category1']} onNavItemSelect={jest.fn()}>
          <NavItem value="item1">Item 1</NavItem>
        </NavDrawer>,
      );

      const dialog = getByRole('dialog');
      expect(dialog).not.toHaveAttribute('selectedvalue');
      expect(dialog).not.toHaveAttribute('opencategories');
      expect(dialog).not.toHaveAttribute('onnavitemselect');
      expect(error).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
    }
  });
});
