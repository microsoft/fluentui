import * as React from 'react';
import { makeStyles } from '@griffel/react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme, BrandVariants } from '@fluentui/react-theme';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';

import { Nav } from './components/Nav/Nav';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '250px auto',
    gridTemplateRows: '40px auto',
  },
  nav: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
  sidebar: {
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 1,
    gridColumnEnd: 2,
  },
  content: {
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
  },
});

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();

  const [keyColor, setKeyColor] = React.useState<string>('#006bc7');

  const brand: BrandVariants = getBrandTokensFromPalette(keyColor);

  const lightTheme = createLightTheme(brand);
  const darkTheme = createDarkTheme(brand);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={brand} darkTheme={darkTheme} lightTheme={lightTheme} />
        <Sidebar className={styles.sidebar} keyColor={keyColor} setKeyColor={setKeyColor} />
        <Content className={styles.content} brand={brand} darkTheme={darkTheme} lightTheme={lightTheme} />
      </div>
    </FluentProvider>
  );
};
