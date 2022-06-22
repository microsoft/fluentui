import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { BrandVariants, Caption1, createDarkTheme, createLightTheme, Theme } from '@fluentui/react-components';
import type { AccentColors } from '../../utils/themes/createCustomLightTheme';

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

  let theme: Theme;
  let initialColors: AccentColors;

  if (props.isDark) {
    theme = createDarkTheme(props.brand);
    // below is still light theme stuff, needs to be changed
    initialColors = {
      colorNeutralForeground2BrandHover: { brandValue: 80, usage: 'usage goes here' },
      colorNeutralForeground2BrandPressed: { brandValue: 70, usage: 'usage goes here' },
      colorNeutralForeground2BrandSelected: { brandValue: 80, usage: 'usage goes here' },
      colorNeutralForeground3BrandHover: { brandValue: 80, usage: 'usage goes here' },
      colorNeutralForeground3BrandPressed: { brandValue: 70, usage: 'usage goes here' },
      colorNeutralForeground3BrandSelected: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForegroundLink: { brandValue: 70, usage: 'usage goes here' },
      colorBrandForegroundLinkHover: { brandValue: 60, usage: 'usage goes here' },
      colorBrandForegroundLinkPressed: { brandValue: 40, usage: 'usage goes here' },
      colorBrandForegroundLinkSelected: { brandValue: 70, usage: 'usage goes here' },
      colorCompoundBrandForeground1: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandForeground1Hover: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandForeground1Pressed: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForeground1: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForeground2: { brandValue: 70, usage: 'usage goes here' },
      colorBrandForegroundInverted: { brandValue: 100, usage: 'usage goes here' },
      colorBrandForegroundInvertedHover: { brandValue: 110, usage: 'usage goes here' },
      colorBrandForegroundInvertedPressed: { brandValue: 100, usage: 'usage goes here' },
      colorBrandForegroundOnLight: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForegroundOnLightHover: { brandValue: 70, usage: 'usage goes here' },
      colorBrandForegroundOnLightPressed: { brandValue: 50, usage: 'usage goes here' },
      colorBrandForegroundOnLightSelected: { brandValue: 60, usage: 'usage goes here' },
      colorBrandBackground: { brandValue: 80, usage: 'usage goes here' },
      colorBrandBackgroundHover: { brandValue: 70, usage: 'usage goes here' },
      colorBrandBackgroundPressed: { brandValue: 40, usage: 'usage goes here' },
      colorBrandBackgroundSelected: { brandValue: 60, usage: 'usage goes here' },
      colorCompoundBrandBackground: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandBackgroundHover: { brandValue: 70, usage: 'usage goes here' },
      colorCompoundBrandBackgroundPressed: { brandValue: 60, usage: 'usage goes here' },
      colorBrandBackgroundStatic: { brandValue: 80, usage: 'usage goes here' },
      colorBrandBackground2: { brandValue: 160, usage: 'usage goes here' },
      colorBrandBackgroundInvertedHover: { brandValue: 160, usage: 'usage goes here' },
      colorBrandBackgroundInvertedPressed: { brandValue: 140, usage: 'usage goes here' },
      colorBrandBackgroundInvertedSelected: { brandValue: 150, usage: 'usage goes here' },
      colorNeutralStrokeAccessibleSelected: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandStroke: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandStrokeHover: { brandValue: 70, usage: 'usage goes here' },
      colorCompoundBrandStrokePressed: { brandValue: 60, usage: 'usage goes here' },
    };
  } else {
    theme = createLightTheme(props.brand);
    initialColors = {
      colorNeutralForeground2BrandHover: { brandValue: 80, usage: 'usage goes here' },
      colorNeutralForeground2BrandPressed: { brandValue: 70, usage: 'usage goes here' },
      colorNeutralForeground2BrandSelected: { brandValue: 80, usage: 'usage goes here' },
      colorNeutralForeground3BrandHover: { brandValue: 80, usage: 'usage goes here' },
      colorNeutralForeground3BrandPressed: { brandValue: 70, usage: 'usage goes here' },
      colorNeutralForeground3BrandSelected: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForegroundLink: { brandValue: 70, usage: 'usage goes here' },
      colorBrandForegroundLinkHover: { brandValue: 60, usage: 'usage goes here' },
      colorBrandForegroundLinkPressed: { brandValue: 40, usage: 'usage goes here' },
      colorBrandForegroundLinkSelected: { brandValue: 70, usage: 'usage goes here' },
      colorCompoundBrandForeground1: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandForeground1Hover: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandForeground1Pressed: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForeground1: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForeground2: { brandValue: 70, usage: 'usage goes here' },
      colorBrandForegroundInverted: { brandValue: 100, usage: 'usage goes here' },
      colorBrandForegroundInvertedHover: { brandValue: 110, usage: 'usage goes here' },
      colorBrandForegroundInvertedPressed: { brandValue: 100, usage: 'usage goes here' },
      colorBrandForegroundOnLight: { brandValue: 80, usage: 'usage goes here' },
      colorBrandForegroundOnLightHover: { brandValue: 70, usage: 'usage goes here' },
      colorBrandForegroundOnLightPressed: { brandValue: 50, usage: 'usage goes here' },
      colorBrandForegroundOnLightSelected: { brandValue: 60, usage: 'usage goes here' },
      colorBrandBackground: { brandValue: 80, usage: 'usage goes here' },
      colorBrandBackgroundHover: { brandValue: 70, usage: 'usage goes here' },
      colorBrandBackgroundPressed: { brandValue: 40, usage: 'usage goes here' },
      colorBrandBackgroundSelected: { brandValue: 60, usage: 'usage goes here' },
      colorCompoundBrandBackground: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandBackgroundHover: { brandValue: 70, usage: 'usage goes here' },
      colorCompoundBrandBackgroundPressed: { brandValue: 60, usage: 'usage goes here' },
      colorBrandBackgroundStatic: { brandValue: 80, usage: 'usage goes here' },
      colorBrandBackground2: { brandValue: 160, usage: 'usage goes here' },
      colorBrandBackgroundInvertedHover: { brandValue: 160, usage: 'usage goes here' },
      colorBrandBackgroundInvertedPressed: { brandValue: 140, usage: 'usage goes here' },
      colorBrandBackgroundInvertedSelected: { brandValue: 150, usage: 'usage goes here' },
      colorNeutralStrokeAccessibleSelected: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandStroke: { brandValue: 80, usage: 'usage goes here' },
      colorCompoundBrandStrokeHover: { brandValue: 70, usage: 'usage goes here' },
      colorCompoundBrandStrokePressed: { brandValue: 60, usage: 'usage goes here' },
    };
  }

  return (
    <div className={props.className}>
      <div className={styles.row}>
        <Caption1>Color tokens</Caption1>
        <Caption1>Assigned values</Caption1>
        <Caption1>Usage examples</Caption1>
      </div>
      <ColorTokensList accentColors={initialColors} />
    </div>
  );
};
