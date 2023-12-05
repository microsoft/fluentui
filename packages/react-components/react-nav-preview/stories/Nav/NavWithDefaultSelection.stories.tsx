import * as React from 'react';
import { Nav, NavProps, NavGroup } from '@fluentui/react-nav-preview';

export const WithDefaultSelection = (props: Partial<NavProps>) => {
  return (
    <Nav defaultSelectedValue={'2'}>
      <NavGroup value="1">First</NavGroup>
      <NavGroup value="2">Second</NavGroup>
      <NavGroup value="3">Third</NavGroup>
    </Nav>
  );
};
