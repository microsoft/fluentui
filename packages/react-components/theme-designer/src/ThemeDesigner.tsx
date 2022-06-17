import * as React from 'react';
import { makeStyles } from '@griffel/react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { FluentProvider } from '@fluentui/react-components';
import {
  createLightTheme,
  createDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  webLightTheme,
  webDarkTheme,
  BrandVariants,
  Theme,
} from '@fluentui/react-theme';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';
import { brandTeams, brandWeb } from './utils/brandColors';
import type { CustomAttributes } from './utils/themes';
// import { useDebounce } from './utils/useDebounce';

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

  const createCustomTheme = ({
    keyColor,
    hueTorsion,
    lightCp,
    darkCp,
    isDark,
  }: CustomAttributes): { brand: BrandVariants; theme: Theme } => {
    // const debouncedKeyColor = useDebounce(keyColor, 400);
    const debouncedKeyColor = keyColor;
    const brand = getBrandTokensFromPalette(debouncedKeyColor, {
      hueTorsion: hueTorsion,
      darkCp: darkCp,
      lightCp: lightCp,
    });
    return {
      brand: brand,
      theme: isDark ? createDarkTheme(brand) : createLightTheme(brand),
    };
  };

  const initialTheme = {
    themeLabel: 'Teams Light',
    brand: brandTeams,
    theme: teamsLightTheme,
  };

  const themeReducer = (
    state: { themeLabel: string; brand: BrandVariants; theme: Theme },
    action: {
      type: string;
      customAttributes: CustomAttributes;
    },
  ) => {
    switch (action.type) {
      case 'Teams Light':
        return {
          themeLabel: 'Teams Light',
          brand: brandTeams,
          theme: teamsLightTheme,
        };
      case 'Teams Dark':
        return {
          themeLabel: 'Teams Dark',
          brand: brandTeams,
          theme: teamsDarkTheme,
        };
      case 'Web Light':
        return {
          themeLabel: 'Web Light',
          brand: brandWeb,
          theme: webLightTheme,
        };
      case 'Web Dark':
        return {
          themeLabel: 'Web Dark',
          brand: brandWeb,
          theme: webDarkTheme,
        };
      case 'Custom':
        const custom = createCustomTheme(action.customAttributes);
        return {
          themeLabel: 'Custom',
          brand: custom.brand,
          theme: custom.theme,
        };
      default:
        return state;
    }
  };

  const [theme, dispatchThemes] = React.useReducer(themeReducer, initialTheme);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={theme.brand} />
        <Sidebar className={styles.sidebar} dispatchThemes={dispatchThemes} />
        <Content className={styles.content} brand={theme.brand} theme={theme.theme} />
      </div>
    </FluentProvider>
  );
};
