import * as React from 'react';
import { Nav, NavCategoryItem } from '@fluentui/react-nav-preview';

export const WithDefaultSelection = () => {
  return (
    <Nav defaultSelectedValue={'2'}>
      <NavCategoryItem value="1">First</NavCategoryItem>
      <NavCategoryItem value="2">Second</NavCategoryItem>
      <NavCategoryItem value="3">Third</NavCategoryItem>
    </Nav>
  );
};
