import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import { AccessibilityDetailsList } from './AccessibilityDetailsList';
import { ITheme, IThemeRules, FabricSlots, BaseSlots } from '../../../../packages/office-ui-fabric-react/lib/index';
import { IColor } from 'office-ui-fabric-react/lib/utilities/color/interfaces';
import { getContrastRatio, isDark } from 'office-ui-fabric-react/lib/utilities/color/shades';

export interface IAccessibilityCheckerProps {
  theme?: ITheme;
  themeRules?: IThemeRules;
}

export interface IContrastRatioPair {
  contrastRatioValue: string;
  contrastRatioPair: string;
}

export const AccessibilityChecker: React.StatelessComponent<IAccessibilityCheckerProps> = (props: IAccessibilityCheckerProps) => {
  let nonAccessiblePairs: IContrastRatioPair[] = [];
  let accessiblePairs: IContrastRatioPair[] = [];

  const calculateContrastRatio = (foreground: FabricSlots, background: FabricSlots) => {
    const bgc: IColor = props.themeRules![FabricSlots[background]].color!;
    const fgc: IColor = props.themeRules![FabricSlots[foreground]].color!;

    const currContrastRatio = getContrastRatio(bgc, fgc);
    let contrastRatioString = String(currContrastRatio);
    contrastRatioString = contrastRatioString.substr(0, contrastRatioString.indexOf('.') + 3);

    const currContrastRatioPair = FabricSlots[foreground] + ' on ' + FabricSlots[background];

    if (currContrastRatio < 4.5) {
      nonAccessiblePairs.push({ contrastRatioValue: contrastRatioString, contrastRatioPair: currContrastRatioPair });
    } else {
      accessiblePairs.push({ contrastRatioValue: contrastRatioString, contrastRatioPair: currContrastRatioPair });
    }
  };

  const loadAllContrastRatioPairsList = () => {
    calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.white); // default
    // primary color also needs to be accessible, this is also strong variant default
    calculateContrastRatio(FabricSlots.white, FabricSlots.themePrimary);
    calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.neutralLighter); // neutral variant default
    calculateContrastRatio(FabricSlots.themeDark, FabricSlots.neutralLighter);
    calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.themeLighter); // neutral variant with primary color
    // these are the text and primary colors on top of the soft variant, whose bg depends on invertedness of original theme
    if (!isDark(props.themeRules![BaseSlots[BaseSlots.backgroundColor]].color!)) {
      // is not inverted
      calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.themeLighterAlt);
      calculateContrastRatio(FabricSlots.themeDarkAlt, FabricSlots.themeLighterAlt);
    } else {
      // is inverted
      calculateContrastRatio(FabricSlots.neutralPrimary, FabricSlots.themeLight);
      calculateContrastRatio(FabricSlots.themeDarkAlt, FabricSlots.themeLight);
    }
  };

  loadAllContrastRatioPairsList();
  return (
    <Card styles={{ root: { width: '800px', height: 'auto' } }}>
      <h1>Accessibility Checker</h1>
      <AccessibilityDetailsList
        theme={props.theme!}
        allContrastRatioPairs={nonAccessiblePairs.concat(accessiblePairs)}
        nonAccessibleStartIndex={nonAccessiblePairs.length}
      />
    </Card>
  );
};
