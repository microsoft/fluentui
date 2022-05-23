import * as React from 'react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { makeStyles } from "@griffel/react";

import { Nav } from './components/Nav'
import { Sidebar } from './components/Sidebar'
import { Body } from './components/Body'

const borderColor: string = "#D1D1D1";

const useLayouts = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "300px auto",
    gridTemplateRows: "40px auto",
    height: "100vh"
  },
  nav: {
    // backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    gridColumnStart: 1,
    gridColumnEnd: 3,
    borderBottomWidth: "1px",
    borderBottomColor: borderColor,
    borderBottomStyle: "solid"
  },
  sidebar: {
    // backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: "1px",
    borderRightColor: borderColor,
    borderRightStyle: "solid"
  },
  body: {
    // backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const layouts = useLayouts();
  return (
    <div className={layouts.root}>
      <div className={layouts.nav}><Nav /></div>
      <div className={layouts.sidebar}><Sidebar /></div>
      <div className={layouts.body}><Body /></div>
    </div>
  );
};
