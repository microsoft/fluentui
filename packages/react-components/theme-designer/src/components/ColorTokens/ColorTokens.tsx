import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { Caption1, createDarkTheme, createLightTheme } from '@fluentui/react-components';
import type { AccentColors } from '../../utils/themes/createCustomLightTheme';

import type { Brands, BrandVariants, Theme } from '@fluentui/react-theme';

export interface ColorTokensProps {
  className?: string;
  isDark: boolean;
  brand: BrandVariants;
}

const useStyles = makeStyles({
  root: {},
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
  },
});

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const styles = useStyles();

  const { isDark, brand } = props;

  let theme: Theme;
  let initialColors: AccentColors;

  if (isDark) {
    theme = createDarkTheme(brand);
    // below is still light theme stuff, needs to be changed
    initialColors = {
      colorNeutralForeground2BrandHover: 80,
      colorNeutralForeground2BrandPressed: 70,
      colorNeutralForeground2BrandSelected: 80,
      colorNeutralForeground3BrandHover: 80,
      colorNeutralForeground3BrandPressed: 70,
      colorNeutralForeground3BrandSelected: 80,
      colorBrandForegroundLink: 70,
      colorBrandForegroundLinkHover: 60,
      colorBrandForegroundLinkPressed: 40,
      colorBrandForegroundLinkSelected: 70,
      colorCompoundBrandForeground1: 80,
      colorCompoundBrandForeground1Hover: 80,
      colorCompoundBrandForeground1Pressed: 80,
      colorBrandForeground1: 80,
      colorBrandForeground2: 70,
      colorBrandForegroundInverted: 100,
      colorBrandForegroundInvertedHover: 110,
      colorBrandForegroundInvertedPressed: 100,
      colorBrandForegroundOnLight: 80,
      colorBrandForegroundOnLightHover: 70,
      colorBrandForegroundOnLightPressed: 50,
      colorBrandForegroundOnLightSelected: 60,
      colorBrandBackground: 80,
      colorBrandBackgroundHover: 70,
      colorBrandBackgroundPressed: 40,
      colorBrandBackgroundSelected: 60,
      colorCompoundBrandBackground: 80,
      colorCompoundBrandBackgroundHover: 70,
      colorCompoundBrandBackgroundPressed: 60,
      colorBrandBackgroundStatic: 80,
      colorBrandBackground2: 160,
      colorBrandBackgroundInvertedHover: 160,
      colorBrandBackgroundInvertedPressed: 140,
      colorBrandBackgroundInvertedSelected: 150,
      colorNeutralStrokeAccessibleSelected: 80,
      colorCompoundBrandStroke: 80,
      colorCompoundBrandStrokeHover: 70,
      colorCompoundBrandStrokePressed: 60,
    };
  } else {
    theme = createLightTheme(brand);
    initialColors = {
      colorNeutralForeground2BrandHover: 80,
      colorNeutralForeground2BrandPressed: 70,
      colorNeutralForeground2BrandSelected: 80,
      colorNeutralForeground3BrandHover: 80,
      colorNeutralForeground3BrandPressed: 70,
      colorNeutralForeground3BrandSelected: 80,
      colorBrandForegroundLink: 70,
      colorBrandForegroundLinkHover: 60,
      colorBrandForegroundLinkPressed: 40,
      colorBrandForegroundLinkSelected: 70,
      colorCompoundBrandForeground1: 80,
      colorCompoundBrandForeground1Hover: 80,
      colorCompoundBrandForeground1Pressed: 80,
      colorBrandForeground1: 80,
      colorBrandForeground2: 70,
      colorBrandForegroundInverted: 100,
      colorBrandForegroundInvertedHover: 110,
      colorBrandForegroundInvertedPressed: 100,
      colorBrandForegroundOnLight: 80,
      colorBrandForegroundOnLightHover: 70,
      colorBrandForegroundOnLightPressed: 50,
      colorBrandForegroundOnLightSelected: 60,
      colorBrandBackground: 80,
      colorBrandBackgroundHover: 70,
      colorBrandBackgroundPressed: 40,
      colorBrandBackgroundSelected: 60,
      colorCompoundBrandBackground: 80,
      colorCompoundBrandBackgroundHover: 70,
      colorCompoundBrandBackgroundPressed: 60,
      colorBrandBackgroundStatic: 80,
      colorBrandBackground2: 160,
      colorBrandBackgroundInvertedHover: 160,
      colorBrandBackgroundInvertedPressed: 140,
      colorBrandBackgroundInvertedSelected: 150,
      colorNeutralStrokeAccessibleSelected: 80,
      colorCompoundBrandStroke: 80,
      colorCompoundBrandStrokeHover: 70,
      colorCompoundBrandStrokePressed: 60,
    };
  }

  const colorReducer: (state: AccentColors, action: { colorToken: string; newValue: Brands }) => AccentColors = (
    state,
    action,
  ) => {
    return { ...state, [action.colorToken]: action.newValue };
  };

  const [colors, dispatchColors] = React.useReducer(colorReducer, initialColors);

  return (
    <div className={props.className}>
      <div className={styles.row}>
        <Caption1>Color tokens</Caption1>
        <Caption1>Assigned values</Caption1>
        <Caption1>Usage examples</Caption1>
      </div>
      <ColorTokensList brand={brand} colors={colors} dispatchColors={dispatchColors} />
    </div>
  );
};
