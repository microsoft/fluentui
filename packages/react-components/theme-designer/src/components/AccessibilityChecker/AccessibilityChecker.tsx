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
      input.colorNeutralForeground1,
      input.colorNeutralForeground2,
      'NeutralBackground1 on NeutralBackground2',
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
