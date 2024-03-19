import * as React from 'react';
import { Nav, NavItem } from '@fluentui/react-nav-preview';

export const WithDefaultSelection = () => {
  return (
    <Nav defaultSelectedValue={'2'}>
      <NavItem value="1">First</NavItem>
      <NavItem value="2">Second</NavItem>
      <NavItem value="3">Third</NavItem>
    </Nav>
  );
};
