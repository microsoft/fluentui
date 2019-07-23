import * as React from 'react';
import { AccessibilityDetailsList } from './AccessibilityDetailsList';
import { FabricSlots, IThemeRules } from 'office-ui-fabric-react';
import { getContrastRatio } from 'office-ui-fabric-react/lib/utilities/color/shades';
import { IColor } from 'office-ui-fabric-react/lib/utilities/color/interfaces';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
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

export const AccessibilityChecker: React.StatelessComponent<IAccessibilityCheckerProps> = (props: IAccessibilityCheckerProps) => {
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
          colorPair: colorPairString
        });
      } else {
        accessiblePairs.push({
          contrastRatioValue: contrastRatioString,
          contrastRatioPair: currContrastRatioPair,
          colorPair: colorPairString
        });
      }
    }
  };

  const loadAllContrastRatioPairsList = () => {
    calculateContrastRatio(FabricSlots.themePrimary, FabricSlots.white, 'Primary color on Background color');
    calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.white, 'Text color on Background color');
  };

  loadAllContrastRatioPairsList();
  return (
    <div className={MainPanelInnerContent}>
      <TitleText>Accessibility checker</TitleText>
      <AccessibilityDetailsList theme={props.theme!} accessiblePairs={accessiblePairs} nonAccessiblePairs={nonAccessiblePairs} />
    </div>
  );
};
