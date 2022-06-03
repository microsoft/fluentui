import * as React from 'react';
import { makeStyles } from '@griffel/react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme, BrandVariants } from '@fluentui/react-theme';

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

// this data is temporary and will eventually be pulled from current theme
const brand: BrandVariants = {
  10: `#061724`,
  20: `#082338`,
  30: `#0a2e4a`,
  40: `#0c3b5e`,
  50: `#0e4775`,
  60: `#0f548c`,
  70: `#115ea3`,
  80: `#0f6cbd`,
  90: `#2886de`,
  100: `#479ef5`,
  110: `#62abf5`,
  120: `#77b7f7`,
  130: `#96c6fa`,
  140: `#b4d6fa`,
  150: `#cfe4fa`,
  160: `#ebf3fc`,
};

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();

  const [keyColor, setKeyColor] = React.useState<string>('#006BC7');
  const changeKeyColor = React.useCallback(e => setKeyColor(e.target.value), [setKeyColor]);

  const lightTheme = createLightTheme(brand);
  const darkTheme = createDarkTheme(brand);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={brand} darkTheme={darkTheme} lightTheme={lightTheme} />
        <Sidebar className={styles.sidebar} keyColor={keyColor} changeKeyColor={changeKeyColor} />
        <Content className={styles.content} brand={brand} darkTheme={darkTheme} lightTheme={lightTheme} />
      </div>
    </FluentProvider>
  );
};
