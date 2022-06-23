import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { Caption1, createDarkTheme, createLightTheme } from '@fluentui/react-components';
import type { AccentColors } from '../../utils/themes/createCustomLightTheme';

import type { Brands, BrandVariants } from '@fluentui/react-theme';

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

  const hexColorToBrand: Record<string, Brands> = {
    [brand[10]]: 10,
    [brand[20]]: 20,
    [brand[30]]: 30,
    [brand[40]]: 40,
    [brand[50]]: 50,
    [brand[60]]: 60,
    [brand[70]]: 70,
    [brand[80]]: 80,
    [brand[90]]: 90,
    [brand[100]]: 100,
    [brand[110]]: 110,
    [brand[120]]: 120,
    [brand[130]]: 130,
    [brand[140]]: 140,
    [brand[150]]: 150,
    [brand[160]]: 160,
  };

  const theme = isDark ? createDarkTheme(brand) : createLightTheme(brand);
  const initialColors: AccentColors = {
    colorNeutralForeground2BrandHover: hexColorToBrand[theme.colorNeutralForeground2BrandHover],
    colorNeutralForeground2BrandPressed: hexColorToBrand[theme.colorNeutralForeground2BrandPressed],
    colorNeutralForeground2BrandSelected: hexColorToBrand[theme.colorNeutralForeground2BrandSelected],
    colorNeutralForeground3BrandHover: hexColorToBrand[theme.colorNeutralForeground3BrandHover],
    colorNeutralForeground3BrandPressed: hexColorToBrand[theme.colorNeutralForeground3BrandPressed],
    colorNeutralForeground3BrandSelected: hexColorToBrand[theme.colorNeutralForeground3BrandSelected],
    colorBrandForegroundLink: hexColorToBrand[theme.colorBrandForegroundLink],
    colorBrandForegroundLinkHover: hexColorToBrand[theme.colorBrandForegroundLinkHover],
    colorBrandForegroundLinkPressed: hexColorToBrand[theme.colorBrandForegroundLinkPressed],
    colorBrandForegroundLinkSelected: hexColorToBrand[theme.colorBrandForegroundLinkSelected],
    colorCompoundBrandForeground1: hexColorToBrand[theme.colorCompoundBrandForeground1],
    colorCompoundBrandForeground1Hover: hexColorToBrand[theme.colorCompoundBrandForeground1Hover],
    colorCompoundBrandForeground1Pressed: hexColorToBrand[theme.colorCompoundBrandForeground1Pressed],
    colorBrandForeground1: hexColorToBrand[theme.colorBrandForeground1],
    colorBrandForeground2: hexColorToBrand[theme.colorBrandForeground2],
    colorBrandForegroundInverted: hexColorToBrand[theme.colorBrandForegroundInverted],
    colorBrandForegroundInvertedHover: hexColorToBrand[theme.colorBrandForegroundInvertedHover],
    colorBrandForegroundInvertedPressed: hexColorToBrand[theme.colorBrandForegroundInvertedPressed],
    colorBrandForegroundOnLight: hexColorToBrand[theme.colorBrandForegroundOnLight],
    colorBrandForegroundOnLightHover: hexColorToBrand[theme.colorBrandForegroundOnLightHover],
    colorBrandForegroundOnLightPressed: hexColorToBrand[theme.colorBrandForegroundOnLightPressed],
    colorBrandForegroundOnLightSelected: hexColorToBrand[theme.colorBrandForegroundOnLightSelected],
    colorBrandBackground: hexColorToBrand[theme.colorBrandBackground],
    colorBrandBackgroundHover: hexColorToBrand[theme.colorBrandBackgroundHover],
    colorBrandBackgroundPressed: hexColorToBrand[theme.colorBrandBackgroundPressed],
    colorBrandBackgroundSelected: hexColorToBrand[theme.colorBrandBackgroundSelected],
    colorCompoundBrandBackground: hexColorToBrand[theme.colorCompoundBrandBackground],
    colorCompoundBrandBackgroundHover: hexColorToBrand[theme.colorCompoundBrandBackgroundHover],
    colorCompoundBrandBackgroundPressed: hexColorToBrand[theme.colorCompoundBrandBackgroundPressed],
    colorBrandBackgroundStatic: hexColorToBrand[theme.colorBrandBackgroundStatic],
    colorBrandBackground2: hexColorToBrand[theme.colorBrandBackground2],
    colorBrandBackgroundInvertedHover: hexColorToBrand[theme.colorBrandBackgroundInvertedHover],
    colorBrandBackgroundInvertedPressed: hexColorToBrand[theme.colorBrandBackgroundInvertedPressed],
    colorBrandBackgroundInvertedSelected: hexColorToBrand[theme.colorBrandBackgroundInvertedSelected],
    colorNeutralStrokeAccessibleSelected: hexColorToBrand[theme.colorNeutralStrokeAccessibleSelected],
    colorCompoundBrandStroke: hexColorToBrand[theme.colorCompoundBrandStroke],
    colorCompoundBrandStrokeHover: hexColorToBrand[theme.colorCompoundBrandStrokeHover],
    colorCompoundBrandStrokePressed: hexColorToBrand[theme.colorCompoundBrandStrokePressed],
  };

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
