import * as React from 'react';
import { Nav, NavProps, NavGroup } from '@fluentui/react-nav-preview';

export const Default = (props: Partial<NavProps>) => {
  return (
    <Nav>
      <NavGroup value="1">First</NavGroup>
      <NavGroup value="2">Second</NavGroup>
      <NavGroup value="3">Third</NavGroup>
    </Nav>
  );
};
