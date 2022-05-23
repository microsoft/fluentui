import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';

import { Nav } from './components/Nav';
import { Sidebar } from './components/Sidebar';
import { Body } from './components/Body';

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  return (
    <>
      <Nav />
      <Sidebar />
      <Body />
    </>
  );
};
