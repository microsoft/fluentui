import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Nav } from '../Nav';
import { NavCategory } from '../NavCategory';
import { NavCategoryItem } from './NavCategoryItem';
import { NavSubItemGroup } from '../NavSubItemGroup';
import { NavSubItem } from '../NavSubItem';

describe('NavCategoryItem', () => {
  it('does not set data-expanded, data-selected, or data-disabled by default', () => {
    const result = render(
      <Nav>
        <NavCategory value="cat1">
          <NavCategoryItem>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1">Sub Item 1</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    const categoryItem = result.getByText('Category 1');
    expect(categoryItem).not.toHaveAttribute('data-expanded');
    expect(categoryItem).not.toHaveAttribute('data-selected');
    expect(categoryItem).not.toHaveAttribute('data-disabled');
  });

  it('sets data-expanded when the category is open', () => {
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

    expect(result.getByText('Category 1')).toHaveAttribute('data-expanded');
  });

  it('removes data-expanded when the category is toggled closed', () => {
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

    fireEvent.click(result.getByText('Category 1'));
    expect(result.getByText('Category 1')).not.toHaveAttribute('data-expanded');
  });

  it('sets data-selected when the category is the selected category and closed', () => {
    const result = render(
      <Nav defaultSelectedCategoryValue="cat1">
        <NavCategory value="cat1">
          <NavCategoryItem>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1">Sub Item 1</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(result.getByText('Category 1')).toHaveAttribute('data-selected');
  });

  it('sets data-disabled when the category item is disabled', () => {
    const result = render(
      <Nav>
        <NavCategory value="cat1">
          <NavCategoryItem disabled>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1">Sub Item 1</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    expect(result.getByText('Category 1')).toHaveAttribute('data-disabled');
  });
});
