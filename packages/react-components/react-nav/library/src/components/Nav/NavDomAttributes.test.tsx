import * as React from 'react';
import { render } from '@testing-library/react';
import { Nav } from './Nav';
import { NavCategory } from '../NavCategory/NavCategory';
import { NavCategoryItem } from '../NavCategoryItem/NavCategoryItem';
import { NavSubItemGroup } from '../NavSubItemGroup/NavSubItemGroup';
import { NavSubItem } from '../NavSubItem/NavSubItem';
import { NavItem } from '../NavItem/NavItem';
import { AppItem } from '../AppItem/AppItem';
import { AppItemStatic } from '../AppItemStatic/AppItemStatic';
import { NavSectionHeader } from '../NavSectionHeader/NavSectionHeader';
import { SplitNavItem } from '../SplitNavItem/SplitNavItem';

const attributeNames = (element: Element) => element.getAttributeNames().sort();

describe('Nav DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { getByTestId } = render(
      <Nav
        data-testid="nav"
        defaultOpenCategories={['category']}
        defaultSelectedCategoryValue="category"
        defaultSelectedValue="sub-item"
        density="small"
        multiple={false}
        onNavCategoryItemToggle={jest.fn()}
        onNavItemSelect={jest.fn()}
      >
        <AppItem data-testid="app-item" icon="i">
          App
        </AppItem>
        <AppItemStatic data-testid="app-item-static" icon="i">
          Static
        </AppItemStatic>
        <NavSectionHeader data-testid="section-header">Header</NavSectionHeader>
        <NavItem data-testid="nav-item" icon="i" value="item">
          Item
        </NavItem>
        <NavCategory value="category">
          <NavCategoryItem data-testid="category-item" expandIcon="e" expandIconMotion={null} icon="i">
            Category
          </NavCategoryItem>
          <NavSubItemGroup collapseMotion={null} data-testid="sub-item-group">
            <NavSubItem data-testid="sub-item" value="sub-item">
              Sub item
            </NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
        <SplitNavItem
          actionButton={{ 'aria-label': 'action' }}
          data-testid="split-nav-item"
          navItem={{ value: 'split' }}
        >
          Split
        </SplitNavItem>
      </Nav>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect(attributeNames(getByTestId('nav'))).toEqual(['class', 'data-testid']);
    expect(attributeNames(getByTestId('app-item'))).toEqual(['class', 'data-testid', 'type']);
    expect(attributeNames(getByTestId('app-item-static'))).toEqual(['class', 'data-testid']);
    expect(attributeNames(getByTestId('section-header'))).toEqual(['class', 'data-testid']);
    expect(attributeNames(getByTestId('nav-item'))).toEqual(['aria-current', 'class', 'data-testid', 'type']);
    expect(attributeNames(getByTestId('category-item'))).toEqual([
      'aria-current',
      'aria-expanded',
      'class',
      'data-testid',
      'type',
    ]);
    expect(attributeNames(getByTestId('sub-item-group'))).toEqual(['class', 'data-testid']);
    expect(attributeNames(getByTestId('sub-item'))).toEqual(['aria-current', 'class', 'data-testid', 'type']);
    expect(attributeNames(getByTestId('split-nav-item'))).toEqual(['class', 'data-testid']);
  });
});
