import * as React from 'react';
import { AccessibilityList } from './AccessibilityList';
import { Vec3, hex_to_sRGB } from '@fluent-blocks/colors';
import { getContrastRatio } from '../../utils/color/shades';
import { Caption1, Theme } from '@fluentui/react-components';

export interface AccessibilityCheckerProps {
  className?: string;
  theme: Theme;
}

export interface ContrastRatioPair {
  background: string;
  foreground: string;
  contrastRatioValue: string;
  contrastRatioPair: string;
  colorPair: string;
}

export const AccessibilityChecker: React.FunctionComponent<AccessibilityCheckerProps> = props => {
  const nonAccessiblePairs: ContrastRatioPair[] = [];
  const accessiblePairs: ContrastRatioPair[] = [];

  const calculateContrastRatio = (foreground: string, background: string) => {
    const theme = (props.theme as unknown) as Record<string, string>;

    const bghex: string = theme[foreground];
    const fghex: string = theme[background];

    const bgc: Vec3 = hex_to_sRGB(bghex);
    const fgc: Vec3 = hex_to_sRGB(fghex);

    const currContrastRatio = getContrastRatio(bgc, fgc);

    const pair = {
      background: bghex,
      foreground: fghex,
      contrastRatioValue: currContrastRatio.toFixed(2),
      contrastRatioPair: fghex + ' on ' + bghex,
      colorPair: foreground + ' on ' + background,
    };

    if (currContrastRatio < 4.5) {
      nonAccessiblePairs.push(pair);
    } else {
      accessiblePairs.push(pair);
    }
  };

  const colorPairs = [
    ['colorNeutralForegroundOnBrand', 'colorBrandBackgroundHover'],
    ['colorNeutralForegroundOnBrand', 'colorBrandBackgroundPressed'],
    ['colorNeutralForegroundOnBrand', 'colorBrandBackgroundSelected'],
    ['colorNeutralForegroundOnBrand', 'colorCompoundBrandBackground'],
    ['colorNeutralForegroundOnBrand', 'colorCompoundBrandBackgroundHover'],
    ['colorNeutralForegroundOnBrand', 'colorCompoundBrandBackgroundPressed'],
    ['colorNeutralForegroundInverted', 'colorBrandBackgroundStatic'],
    ['colorNeutralForeground1', 'colorNeutralBackground1'],
    ['colorNeutralForeground2BrandHover', 'colorNeutralBackground1'],
    ['colorNeutralForeground2BrandHover', 'colorSubtleBackgroundHover'],
    ['colorNeutralForeground2BrandPressed', 'colorNeutralBackground1'],
    ['colorNeutralForeground2BrandPressed', 'colorSubtleBackgroundPressed'],
    ['colorNeutralForeground2BrandSelected', 'colorNeutralBackground1'],
    ['colorNeutralForeground2BrandSelected', 'colorSubtleBackgroundSelected'],
    ['colorBrandForegroundLink', 'colorNeutralBackground1'],
    ['colorBrandForegroundLinkHover', 'colorNeutralBackground1'],
    ['colorBrandForegroundLinkPressed', 'colorNeutralBackground1'],
    ['colorBrandForegroundLinkSelected', 'colorNeutralBackground1'],
    ['colorCompoundBrandForeground1', 'colorNeutralBackground1'],
    ['colorCompoundBrandForeground1Hover', 'colorNeutralBackground1'],
    ['colorCompoundBrandForeground1Pressed', 'colorNeutralBackground1'],
    ['colorBrandForeground1', 'colorNeutralBackground1'],
    ['colorBrandForeground2', 'colorNeutralBackground1'],
    ['colorBrandBackground', 'colorNeutralBackground1'],
    ['colorBrandBackground', 'colorNeutralForegroundOnBrand'],
    ['colorBrandBackgroundHover', 'colorNeutralBackground1'],
    ['colorBrandBackgroundPressed', 'colorNeutralBackground1'],
    ['colorBrandBackgroundSelected', 'colorNeutralBackground1'],
    ['colorCompoundBrandBackground', 'colorNeutralBackground1'],
    ['colorCompoundBrandBackgroundHover', 'colorNeutralBackground1'],
    ['colorCompoundBrandBackgroundPressed', 'colorNeutralBackground1'],
    ['colorBrandBackgroundStatic', 'colorNeutralBackground1'],
    ['colorBrandForeground2', 'colorBrandBackground2'],
    ['colorBrandStroke1', 'colorBrandBackground2'],
    ['colorBrandStroke2', 'colorBrandBackground2'],
    ['colorCompoundBrandStroke', 'colorNeutralBackground1'],
    ['colorCompoundBrandStroke', 'colorNeutralBackground3'],
    ['colorCompoundBrandStrokeHover', 'colorNeutralBackground1'],
    ['colorCompoundBrandStrokePressed', 'colorNeutralBackground1'],
  ];

  const loadAllContrastRatioPairsList = () => {
    colorPairs.map(([c1, c2]) => {
      return calculateContrastRatio(c1, c2);
    });
  };

  loadAllContrastRatioPairsList();

  return (
    <div className={props.className}>
      <Caption1>Accessibility Checker</Caption1>
      <AccessibilityList
        theme={props.theme}
        accessiblePairs={accessiblePairs}
        nonAccessiblePairs={nonAccessiblePairs}
      />
    </div>
  );
};
