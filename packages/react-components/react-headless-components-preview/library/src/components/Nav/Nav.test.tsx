import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Nav } from './Nav';
import { NavItem } from './NavItem';
import { NavSubItem } from './NavSubItem';
import { NavCategory } from './NavCategory';
import { NavCategoryItem } from './NavCategoryItem';
import { NavSubItemGroup } from './NavSubItemGroup';
import { NavDivider } from './NavDivider';
import { NavSectionHeader } from './NavSectionHeader';

describe('Nav', () => {
  isConformant({
    Component: Nav,
    displayName: 'Nav',
  });

  it('renders NavItem children', () => {
    const result = render(
      <Nav>
        <NavItem value="item1">Item 1</NavItem>
        <NavItem value="item2">Item 2</NavItem>
      </Nav>,
    );
    expect(result.getByText('Item 1')).toBeInTheDocument();
    expect(result.getByText('Item 2')).toBeInTheDocument();
  });

  it('selects a NavItem on click', () => {
    const onNavItemSelect = jest.fn();
    const result = render(
      <Nav onNavItemSelect={onNavItemSelect}>
        <NavItem value="item1">Item 1</NavItem>
        <NavItem value="item2">Item 2</NavItem>
      </Nav>,
    );

    fireEvent.click(result.getByText('Item 1'));
    expect(onNavItemSelect).toHaveBeenCalledTimes(1);
    expect(onNavItemSelect.mock.calls[0][1]).toEqual(expect.objectContaining({ value: 'item1' }));
  });

  it('marks selected NavItem with aria-current="page"', () => {
    const result = render(
      <Nav defaultSelectedValue="item1">
        <NavItem value="item1">Item 1</NavItem>
        <NavItem value="item2">Item 2</NavItem>
      </Nav>,
    );

    expect(result.getByText('Item 1')).toHaveAttribute('aria-current', 'page');
    expect(result.getByText('Item 2')).not.toHaveAttribute('aria-current', 'page');
  });

  it('supports controlled selectedValue', () => {
    const { getByText, rerender } = render(
      <Nav selectedValue="item1">
        <NavItem value="item1">Item 1</NavItem>
        <NavItem value="item2">Item 2</NavItem>
      </Nav>,
    );

    expect(getByText('Item 1')).toHaveAttribute('aria-current', 'page');

    rerender(
      <Nav selectedValue="item2">
        <NavItem value="item1">Item 1</NavItem>
        <NavItem value="item2">Item 2</NavItem>
      </Nav>,
    );

    expect(getByText('Item 2')).toHaveAttribute('aria-current', 'page');
    expect(getByText('Item 1')).not.toHaveAttribute('aria-current', 'page');
  });

  it('opens categories by default', () => {
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

    expect(result.getByText('Category 1')).toHaveAttribute('aria-expanded', 'true');
    expect(result.getByText('Sub Item 1')).toBeInTheDocument();
  });

  it('toggles category open/close on NavCategoryItem click', () => {
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

    // Initially closed
    expect(result.getByText('Category 1')).toHaveAttribute('aria-expanded', 'false');
    expect(result.queryByText('Sub Item 1')).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(result.getByText('Category 1'));
    expect(result.getByText('Category 1')).toHaveAttribute('aria-expanded', 'true');
    expect(result.getByText('Sub Item 1')).toBeInTheDocument();

    // Click to close
    fireEvent.click(result.getByText('Category 1'));
    expect(result.getByText('Category 1')).toHaveAttribute('aria-expanded', 'false');
    expect(result.queryByText('Sub Item 1')).not.toBeInTheDocument();
  });

  it('supports multiple={false} to close other categories', () => {
    const result = render(
      <Nav multiple={false} defaultOpenCategories={['cat1']}>
        <NavCategory value="cat1">
          <NavCategoryItem>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1">Sub Item 1</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
        <NavCategory value="cat2">
          <NavCategoryItem>Category 2</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub2">Sub Item 2</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    // cat1 is open
    expect(result.getByText('Sub Item 1')).toBeInTheDocument();

    // Open cat2 → cat1 should close
    fireEvent.click(result.getByText('Category 2'));
    expect(result.queryByText('Sub Item 1')).not.toBeInTheDocument();
    expect(result.getByText('Sub Item 2')).toBeInTheDocument();
  });

  it('selects NavSubItem and reports categoryValue', () => {
    const onNavItemSelect = jest.fn();
    const result = render(
      <Nav defaultOpenCategories={['cat1']} onNavItemSelect={onNavItemSelect}>
        <NavCategory value="cat1">
          <NavCategoryItem>Category 1</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem value="sub1">Sub Item 1</NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
      </Nav>,
    );

    fireEvent.click(result.getByText('Sub Item 1'));
    expect(onNavItemSelect).toHaveBeenCalledTimes(1);
    expect(onNavItemSelect.mock.calls[0][1]).toEqual(expect.objectContaining({ value: 'sub1', categoryValue: 'cat1' }));
  });

  it('renders NavDivider with separator role', () => {
    const result = render(
      <Nav>
        <NavItem value="item1">Item 1</NavItem>
        <NavDivider />
        <NavItem value="item2">Item 2</NavItem>
      </Nav>,
    );

    expect(result.getByRole('separator')).toBeInTheDocument();
  });

  it('renders NavSectionHeader as a heading', () => {
    const result = render(
      <Nav>
        <NavSectionHeader>Section</NavSectionHeader>
        <NavItem value="item1">Item 1</NavItem>
      </Nav>,
    );

    expect(result.getByRole('heading')).toHaveTextContent('Section');
  });

  it('renders NavItem with href as an anchor', () => {
    const result = render(
      <Nav>
        <NavItem value="item1" href="https://example.com">
          Link Item
        </NavItem>
      </Nav>,
    );

    const link = result.getByText('Link Item');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
