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

    if (currContrastRatio < 4.5) {
      nonAccessiblePairs.push({
        contrastRatioValue: contrastRatioString,
        contrastRatioPair: currContrastRatioPair,
        colorPair: colorPairString,
      });
    } else {
      accessiblePairs.push({
        contrastRatioValue: contrastRatioString,
        contrastRatioPair: currContrastRatioPair,
        colorPair: colorPairString,
      });
    }
  };

  const loadAllContrastRatioPairsList = () => {
    calculateContrastRatio(
      props.theme.colorNeutralForeground1,
      props.theme.colorNeutralBackground1,
      'Neutral foreground on neutral background',
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
