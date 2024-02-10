import * as React from 'react';
import { Nav } from '../../src/components/Nav/Nav';
import { NavCategory } from '../../src/components/NavCategory/NavCategory';
import { NavCategoryItem } from '../../src/components/NavCategoryItem/NavCategoryItem';
import { NavSubItemGroup } from '../../src/components/NavSubItemGroup/NavSubItemGroup';

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
