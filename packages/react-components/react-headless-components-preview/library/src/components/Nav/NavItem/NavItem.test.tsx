import * as React from 'react';
import { render } from '@testing-library/react';
import { Nav } from '../Nav';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  it('does not set data-disabled by default', () => {
    const result = render(
      <Nav>
        <NavItem value="item1">Item 1</NavItem>
      </Nav>,
    );

    expect(result.getByText('Item 1')).not.toHaveAttribute('data-disabled');
  });

  it('sets data-disabled when disabled', () => {
    const result = render(
      <Nav>
        <NavItem value="item1" disabled>
          Item 1
        </NavItem>
      </Nav>,
    );

    expect(result.getByText('Item 1')).toHaveAttribute('data-disabled');
  });

  it('does not set data-disabled when explicitly disabled={false}', () => {
    const result = render(
      <Nav>
        <NavItem value="item1" disabled={false}>
          Item 1
        </NavItem>
      </Nav>,
    );

    expect(result.getByText('Item 1')).not.toHaveAttribute('data-disabled');
  });
});
