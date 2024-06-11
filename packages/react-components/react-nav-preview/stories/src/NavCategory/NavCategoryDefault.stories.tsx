import * as React from 'react';
import { Nav, NavCategory, NavCategoryItem, NavSubItemGroup } from '@fluentui/react-nav-preview';

export const Default = () => (
  <Nav>
    <NavCategory value="1">
      <NavCategoryItem>NavCategoryItem 1</NavCategoryItem>
      <NavSubItemGroup>
        <div>Some div inside SubItemGroup</div>
      </NavSubItemGroup>
    </NavCategory>
    <NavCategory value="2">
      <NavCategoryItem>NavCategoryItem2</NavCategoryItem>
      <NavSubItemGroup>
        <div>Some other div inside SubItemGroup</div>
      </NavSubItemGroup>
    </NavCategory>
  </Nav>
);
