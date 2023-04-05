import * as React from 'react';
import { getAccessibilityChecker, TestType } from '../../utils/getAccessibilityChecker';
import { AccessibilityContrastChip } from '../ColorTokens/AccessibilityList';
import { BrandVariants, createDarkTheme, createLightTheme, Label, Theme, tokens } from '@fluentui/react-components';

export interface AccessibilityPanelProps {
  lightThemeOverrides: Partial<Theme>;

  darkThemeOverrides: Partial<Theme>;

  brand: BrandVariants;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = props => {
  const { lightThemeOverrides, darkThemeOverrides, brand } = props;
  const { failedContrastTests: failLight, failedLuminosityTests: failedLightLuminosityTests } = getAccessibilityChecker(
    {
      ...createLightTheme(brand),
      ...lightThemeOverrides,
    },
  );
  const { failedContrastTests: failDark, failedLuminosityTests: failedDarkLuminosityTests } = getAccessibilityChecker({
    ...createDarkTheme(brand),
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
      <AccessibilityContrastChip failKeys={Object.keys(failedLightLuminosityTests)} testType={TestType.luminosity} />
      <Label style={{ paddingTop: tokens.spacingVerticalXS }}>Dark mode</Label>
      <AccessibilityContrastChip failKeys={Object.keys(failDark)} testType={TestType.contrastRatio} />
      <AccessibilityContrastChip failKeys={Object.keys(failedDarkLuminosityTests)} testType={TestType.luminosity} />
    </div>
  );
};
