import * as React from 'react';
import { render } from '@testing-library/react';
import { Nav } from '../Nav';
import { NavCategory } from '../NavCategory';
import { NavCategoryItem } from '../NavCategoryItem';
import { NavSubItemGroup } from '../NavSubItemGroup';
import { NavSubItem } from './NavSubItem';

describe('NavSubItem', () => {
  it('does not set data-disabled by default', () => {
    const result = render(
      <Nav defaultOpenCategories={['cat1']}>
        <NavCategory value="cat1">
          <NavCategoryItem>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1">Sub Item 1</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(result.getByText('Sub Item 1')).not.toHaveAttribute('data-disabled');
  });

  it('sets data-disabled when disabled', () => {
    const result = render(
      <Nav defaultOpenCategories={['cat1']}>
        <NavCategory value="cat1">
          <NavCategoryItem>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1" disabled>
              Sub Item 1
            </NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(result.getByText('Sub Item 1')).toHaveAttribute('data-disabled');
  });

  it('does not set data-disabled when explicitly disabled={false}', () => {
    const result = render(
      <Nav defaultOpenCategories={['cat1']}>
        <NavCategory value="cat1">
          <NavCategoryItem>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1" disabled={false}>
              Sub Item 1
            </NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(result.getByText('Sub Item 1')).not.toHaveAttribute('data-disabled');
  });
});
