import * as React from 'react';
import { Nav, NavCategory, NavCategoryItem, NavItem, NavSubItem, NavSubItemGroup } from '@fluentui/react-nav-preview';

export const WithNestedSubItems = () => {
  return (
    <Nav defaultSelectedValue={'2'}>
      <NavItem value="1">First</NavItem>
      <NavItem value="2">Second</NavItem>
      <NavItem value="3">Third</NavItem>
      <NavCategory value="4">
        <NavCategoryItem>NavCategoryItem 1</NavCategoryItem>
        <NavSubItemGroup>
          <NavSubItem value="5">Five</NavSubItem>
          <NavSubItem value="6">Six</NavSubItem>
          <NavSubItem value="7">Seven</NavSubItem>
        </NavSubItemGroup>
      </NavCategory>
      <NavCategory value="8">
        <NavCategoryItem>NavCategoryItem2</NavCategoryItem>
        <NavSubItemGroup>
          <NavSubItem value="9">Nine</NavSubItem>
          <NavSubItem value="10">Ten</NavSubItem>
          <NavSubItem value="11">Eleven</NavSubItem>
        </NavSubItemGroup>
      </NavCategory>
    </Nav>
  );
};
