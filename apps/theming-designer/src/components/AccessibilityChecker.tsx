import * as React from 'react';
import { AccessibilityDetailsList } from './AccessibilityDetailsList';
import { FabricSlots, IThemeRules } from '@fluentui/react';
import { getContrastRatio, IColor } from '@fluentui/react/lib/Color';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { ITheme } from '@fluentui/react/lib/Styling';
import { TitleText } from '../shared/Typography';

export interface IAccessibilityCheckerProps {
  theme?: ITheme;
  themeRules?: IThemeRules;
}

export interface IContrastRatioPair {
  contrastRatioValue: string;
  contrastRatioPair: string;
  colorPair: string;
}

export const AccessibilityChecker: React.FunctionComponent<IAccessibilityCheckerProps> = (
  props: IAccessibilityCheckerProps,
) => {
  let nonAccessiblePairs: IContrastRatioPair[] = [];
  let accessiblePairs: IContrastRatioPair[] = [];

  const calculateContrastRatio = (foreground: FabricSlots, background: FabricSlots, colorPairString: string) => {
    if (props.themeRules) {
      const bgc: IColor = props.themeRules[FabricSlots[background]].color!;
      const fgc: IColor = props.themeRules[FabricSlots[foreground]].color!;

      const currContrastRatio = getContrastRatio(bgc, fgc);
      const contrastRatioString = currContrastRatio.toFixed(2);

      const currContrastRatioPair = FabricSlots[foreground] + ' on ' + FabricSlots[background];

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
    }
  };

  const loadAllContrastRatioPairsList = () => {
    calculateContrastRatio(FabricSlots.themePrimary, FabricSlots.white, 'Primary color on Background color');
    calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.white, 'Text color on Background color');
    calculateContrastRatio(FabricSlots.neutralSecondary, FabricSlots.white, 'Secondary text color on Background color');
  };

  loadAllContrastRatioPairsList();
  return (
    <div className={MainPanelInnerContent}>
      <TitleText>Accessibility checker</TitleText>
      <AccessibilityDetailsList
        theme={props.theme!}
        accessiblePairs={accessiblePairs}
        nonAccessiblePairs={nonAccessiblePairs}
      />
    </div>
  );
};
