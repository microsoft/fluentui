import * as React from 'react';
import { makeStyles } from '@griffel/react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme } from '@fluentui/react-theme';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';
import { useDebounce } from './utils/useDebounce';

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
  const debouncedKeyColor = useDebounce(keyColor, 400);

  const themes = React.useMemo(() => {
    const brand = getBrandTokensFromPalette(debouncedKeyColor);
    return {
      brand: brand,
      lightTheme: createLightTheme(brand),
      darkTheme: createDarkTheme(brand),
    };
  }, [debouncedKeyColor]);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={themes.brand} />
        <Sidebar className={styles.sidebar} keyColor={debouncedKeyColor} setKeyColor={setKeyColor} />
        <Content
          className={styles.content}
          brand={themes.brand}
          darkTheme={themes.darkTheme}
          lightTheme={themes.lightTheme}
        />
      </div>
    </FluentProvider>
  );
};
