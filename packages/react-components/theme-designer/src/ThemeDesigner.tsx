import * as React from 'react';
import { makeStyles } from '@griffel/react';
import type { ThemeDesignerProps } from './ThemeDesigner.types';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme, BrandVariants } from '@fluentui/react-theme';
import { Palette, PaletteConfig, hexColorsFromPalette, hex_to_LCH } from '@fluent-blocks/colors';

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

export const defaultPaletteConfig: PaletteConfig = {
  // The nShades and range values are based on a brand color audit
  nShades: 16,
  range: [1.42, 83.57],
  linearity: 0.77,
};

function getBrandTokensFromPalette(palette: Palette) {
  const hexColors = hexColorsFromPalette(
    palette,
    defaultPaletteConfig.nShades,
    defaultPaletteConfig.range,
    defaultPaletteConfig.linearity,
  );
  return hexColors.reduce((acc: Record<string, string>, hexColor, h) => {
    acc[`${(h + 1) * 10}`] = hexColor;
    return acc;
  }, {}) as BrandVariants;
}

/**
 * ThemeDesigner component - TODO: add more docs
 */
export const ThemeDesigner: React.FC<ThemeDesignerProps> = props => {
  const styles = useStyles();

  const [keyColor, setKeyColor] = React.useState<string>('#006BC7');
  const changeKeyColor = React.useCallback(e => setKeyColor(e.target.value), [setKeyColor]);

  const brandPalette: Palette = {
    keyColor: hex_to_LCH(keyColor),
    darkCp: 2 / 3,
    lightCp: 1 / 3,
    hueTorsion: 0,
  };

  const brand: BrandVariants = getBrandTokensFromPalette(brandPalette);

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
