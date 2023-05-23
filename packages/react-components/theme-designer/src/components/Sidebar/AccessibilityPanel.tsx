import * as React from 'react';
import { getAccessibilityChecker, TestType } from '../../utils/getAccessibilityChecker';
import { AccessibilityContrastChip } from '../ColorTokens/AccessibilityList';
import { BrandVariants, createLightTheme, Label, Theme, tokens } from '@fluentui/react-components';
import { createDarkThemeWithUpdatedMapping } from '../../utils/getOverridableTokenBrandColors';

export interface AccessibilityPanelProps {
  lightThemeOverrides: Partial<Theme>;

  darkThemeOverrides: Partial<Theme>;

  brand: BrandVariants;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = props => {
  const { lightThemeOverrides, darkThemeOverrides, brand } = props;
  const { failedContrastTests: failLight } = getAccessibilityChecker({
    ...createLightTheme(brand),
    ...lightThemeOverrides,
  });
  const { failedContrastTests: failDark } = getAccessibilityChecker({
    ...createDarkThemeWithUpdatedMapping(brand),
    ...darkThemeOverrides,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
      }}
    >
      <Label>Light mode</Label>
      <AccessibilityContrastChip failKeys={Object.keys(failLight)} testType={TestType.contrastRatio} />
      <Label style={{ paddingTop: tokens.spacingVerticalXS }}>Dark mode</Label>
      <AccessibilityContrastChip failKeys={Object.keys(failDark)} testType={TestType.contrastRatio} />
    </div>
  );
};
