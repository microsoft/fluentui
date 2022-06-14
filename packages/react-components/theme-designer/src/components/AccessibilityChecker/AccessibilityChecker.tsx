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

  const calculateContrastRatio = (foreground: string, background: string, colorPairString: string) => {
    const bgc: Vec3 = hex_to_sRGB(background);
    const fgc: Vec3 = hex_to_sRGB(foreground);

    const currContrastRatio = getContrastRatio(bgc, fgc);
    const contrastRatioString = currContrastRatio.toFixed(2);

    const currContrastRatioPair = background + ' on ' + foreground;

    const pair = {
      background: background,
      foreground: foreground,
      contrastRatioValue: contrastRatioString,
      contrastRatioPair: currContrastRatioPair,
      colorPair: colorPairString,
    };

    if (currContrastRatio < 4.5) {
      nonAccessiblePairs.push(pair);
    } else {
      accessiblePairs.push(pair);
    }
  };

  const loadAllContrastRatioPairsList = () => {
    const input = props.theme;
    calculateContrastRatio(
      input.colorNeutralForeground1,
      input.colorNeutralBackground1,
      'NeutralForeground1 on NeutralBackground1',
    );
    calculateContrastRatio(
      input.colorNeutralForeground2BrandHover,
      input.colorNeutralBackground1,
      'colorNeutralForeground2BrandHover on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorNeutralForeground2BrandHover,
      input.colorSubtleBackgroundHover,
      'colorNeutralForeground2BrandHover on colorSubtleBackgroundHover',
    );
    calculateContrastRatio(
      input.colorNeutralForeground2BrandPressed,
      input.colorNeutralBackground1,
      'colorNeutralForeground2BrandPressed on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorNeutralForeground2BrandPressed,
      input.colorSubtleBackgroundPressed,
      'colorNeutralForeground2BrandPressed on colorSubtleBackgroundPressed',
    );
    calculateContrastRatio(
      input.colorNeutralForeground2BrandSelected,
      input.colorNeutralBackground1,
      'colorNeutralForeground2BrandSelected on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorNeutralForeground2BrandSelected,
      input.colorSubtleBackgroundSelected,
      'colorNeutralForeground2BrandSelected on colorSubtleBackgroundSelected',
    );
    calculateContrastRatio(
      input.colorBrandForegroundLink,
      input.colorNeutralBackground1,
      'colorBrandForegroundLink on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandForegroundLinkHover,
      input.colorNeutralBackground1,
      'colorBrandForegroundLinkHover on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandForegroundLinkPressed,
      input.colorNeutralBackground1,
      'colorBrandForegroundLinkPressed on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandForegroundLinkSelected,
      input.colorNeutralBackground1,
      'colorBrandForegroundLinkSelected on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandForeground1,
      input.colorNeutralBackground1,
      'colorCompoundBrandForeground1 on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandForeground1Hover,
      input.colorNeutralBackground1,
      'colorCompoundBrandForeground1Hover on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandForeground1Pressed,
      input.colorNeutralBackground1,
      'colorCompoundBrandForeground1Pressed on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandForeground1,
      input.colorNeutralBackground1,
      'colorBrandForeground1 on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandForeground2,
      input.colorNeutralBackground1,
      'colorBrandForeground2 on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandBackground,
      input.colorNeutralBackground1,
      'colorBrandBackground on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandBackground,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackground on colorNeutralForegroundOnBrand',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundHover,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackgroundHover on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundHover,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackgroundHover on colorNeutralForegroundOnBrand',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundPressed,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackgroundPressed on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundPressed,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackgroundPressed on colorNeutralForegroundOnBrand',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundSelected,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackgroundSelected on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundSelected,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackgroundSelected on colorNeutralForegroundOnBrand',
    );
    calculateContrastRatio(
      input.colorCompoundBrandBackground,
      input.colorNeutralForegroundOnBrand,
      'colorCompoundBrandBackground on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandBackground,
      input.colorNeutralForegroundOnBrand,
      'colorCompoundBrandBackground on colorNeutralForegroundOnBrand',
    );
    calculateContrastRatio(
      input.colorCompoundBrandBackgroundHover,
      input.colorNeutralForegroundOnBrand,
      'colorCompoundBrandBackgroundHover on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandBackgroundHover,
      input.colorNeutralForegroundOnBrand,
      'colorCompoundBrandBackgroundHover on colorNeutralForegroundOnBrand',
    );
    calculateContrastRatio(
      input.colorCompoundBrandBackgroundPressed,
      input.colorNeutralForegroundOnBrand,
      'colorCompoundBrandBackgroundPressed on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandBackgroundPressed,
      input.colorNeutralForegroundOnBrand,
      'colorCompoundBrandBackgroundPressed on colorNeutralForegroundOnBrand',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundStatic,
      input.colorNeutralForegroundOnBrand,
      'colorBrandBackgroundStatic on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorBrandBackgroundStatic,
      input.colorNeutralForegroundInverted,
      'colorBrandBackgroundStatic on colorNeutralForegroundInverted',
    );
    calculateContrastRatio(
      input.colorBrandBackground2,
      input.colorBrandForeground2,
      'colorBrandBackground2 on colorBrandForeground2',
    );
    calculateContrastRatio(
      input.colorBrandStroke1,
      input.colorBrandBackground2,
      'colorBrandStroke1 on colorBrandBackground2',
    );
    calculateContrastRatio(
      input.colorBrandStroke2,
      input.colorBrandBackground2,
      'colorBrandStroke2 on colorBrandBackground2',
    );
    calculateContrastRatio(
      input.colorCompoundBrandStroke,
      input.colorNeutralBackground1,
      'colorCompoundBrandStroke on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandStroke,
      input.colorNeutralBackground3,
      'colorCompoundBrandStroke on colorNeutralBackground3',
    );
    calculateContrastRatio(
      input.colorCompoundBrandStrokeHover,
      input.colorNeutralBackground1,
      'colorCompoundBrandStrokeHover on colorNeutralBackground1',
    );
    calculateContrastRatio(
      input.colorCompoundBrandStrokePressed,
      input.colorNeutralBackground1,
      'colorCompoundBrandStrokePressed on colorNeutralBackground1',
    );
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
