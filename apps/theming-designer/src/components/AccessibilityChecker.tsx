import * as React from 'react';
import { AccessibilityDetailsList } from './AccessibilityDetailsList';
import { BaseSlots, FabricSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { getContrastRatio, isDark } from 'office-ui-fabric-react/lib/utilities/color/shades';
import { IColor } from 'office-ui-fabric-react/lib/utilities/color/interfaces';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface IAccessibilityCheckerProps {
  theme?: ITheme;
  themeRules?: IThemeRules;
}

export interface IContrastRatioPair {
  contrastRatioValue: string;
  contrastRatioPair: string;
  stringToMatchLeftPanel: string;
}

export const AccessibilityChecker: React.StatelessComponent<IAccessibilityCheckerProps> = (props: IAccessibilityCheckerProps) => {
  let nonAccessiblePairs: IContrastRatioPair[] = [];
  let accessiblePairs: IContrastRatioPair[] = [];

  const calculateContrastRatio = (foreground: FabricSlots, background: FabricSlots) => {
    if (props.themeRules) {
      const bgc: IColor = props.themeRules[FabricSlots[background]].color!;
      const fgc: IColor = props.themeRules[FabricSlots[foreground]].color!;

      const currContrastRatio = getContrastRatio(bgc, fgc);
      const contrastRatioString = currContrastRatio.toFixed(2);

      const currContrastRatioPair = FabricSlots[foreground] + ' on ' + FabricSlots[background];

      let stringToMatchLeftPanel = '';
      if (FabricSlots[foreground] === 'themePrimary') {
        stringToMatchLeftPanel = 'Primary color on background color';
      } else {
        stringToMatchLeftPanel = 'Text color on background color';
      }

      if (currContrastRatio < 4.5) {
        nonAccessiblePairs.push({
          contrastRatioValue: contrastRatioString,
          contrastRatioPair: currContrastRatioPair,
          stringToMatchLeftPanel: stringToMatchLeftPanel
        });
      } else {
        accessiblePairs.push({
          contrastRatioValue: contrastRatioString,
          contrastRatioPair: currContrastRatioPair,
          stringToMatchLeftPanel: stringToMatchLeftPanel
        });
      }
    }
  };

  const loadAllContrastRatioPairsList = () => {
    calculateContrastRatio(FabricSlots.themePrimary, FabricSlots.white); // primary on background
    calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.white); // text on background
  };

  loadAllContrastRatioPairsList();
  return (
    <div className={MainPanelInnerContent}>
      <h1>Accessibility checker</h1>
      <AccessibilityDetailsList theme={props.theme!} accessiblePairs={accessiblePairs} nonAccessiblePairs={nonAccessiblePairs} />
    </div>
  );
};
