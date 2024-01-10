import * as React from 'react';
import { Nav, NavCategoryItem } from '@fluentui/react-nav-preview';

export const Default = () => {
  return (
    <Nav>
      <NavCategoryItem value="1">First</NavCategoryItem>
      <NavCategoryItem value="2">Second</NavCategoryItem>
      <NavCategoryItem value="3">Third</NavCategoryItem>
    </Nav>
  );
};
