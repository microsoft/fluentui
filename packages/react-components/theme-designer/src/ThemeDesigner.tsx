import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';

import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  return (
    <>
      <Nav />
      <Sidebar />
      <Content />
    </>
  );
};
