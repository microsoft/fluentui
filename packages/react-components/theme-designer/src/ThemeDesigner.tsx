import * as React from 'react';
import { makeStyles } from '@griffel/react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme } from '@fluentui/react-theme';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';
import { brandWeb, brandTeams, brandOffice } from './utils/brandColors';
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

  const [theme, setTheme] = React.useState<string>('Custom');
  const [keyColor, setKeyColor] = React.useState<string>('#006bc7');
  const [hueTorsion, setHueTorsion] = React.useState<number>(0);
  const [darkCp, setDarkCp] = React.useState<number>(2 / 3);
  const [lightCp, setLightCp] = React.useState<number>(1 / 3);

  const debouncedKeyColor = useDebounce(keyColor, 400);

  const customTheme = React.useMemo(() => {
    const brand = getBrandTokensFromPalette(debouncedKeyColor, {
      hueTorsion: hueTorsion,
      darkCp: darkCp,
      lightCp: lightCp,
    });
    return {
      brand: brand,
      lightTheme: createLightTheme(brand),
      darkTheme: createDarkTheme(brand),
    };
  }, [hueTorsion, darkCp, lightCp, debouncedKeyColor]);

  const themes = React.useMemo(() => {
    if (theme === 'Teams') {
      return {
        brand: brandTeams,
        lightTheme: createLightTheme(brandTeams),
        darkTheme: createDarkTheme(brandTeams),
      };
    } else if (theme === 'Web') {
      return {
        brand: brandWeb,
        lightTheme: createLightTheme(brandWeb),
        darkTheme: createDarkTheme(brandWeb),
      };
    } else if (theme === 'Office') {
      return {
        brand: brandOffice,
        lightTheme: createLightTheme(brandOffice),
        darkTheme: createDarkTheme(brandOffice),
      };
    } else {
      return customTheme;
    }
  }, [customTheme, theme]);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.root}>
        <Nav className={styles.nav} brand={themes.brand} />
        <Sidebar
          className={styles.sidebar}
          keyColor={debouncedKeyColor}
          setKeyColor={setKeyColor}
          hueTorsion={hueTorsion}
          setHueTorsion={setHueTorsion}
          darkCp={darkCp}
          setDarkCp={setDarkCp}
          lightCp={lightCp}
          setLightCp={setLightCp}
          theme={theme}
          setTheme={setTheme}
        />
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
