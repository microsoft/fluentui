import * as React from 'react';
import { getAccessibilityChecker } from '../../utils/getAccessibilityChecker';
import { AccessibilityContrastChip } from '../ColorTokens/AccessibilityList';
import { BrandVariants, createDarkTheme, createLightTheme, Label, Theme, tokens } from '@fluentui/react-components';

export interface AccessibilityPanelProps {
  lightThemeOverrides: Partial<Theme>;

  darkThemeOverrides: Partial<Theme>;

  brand: BrandVariants;
}
// all: all, failedLuminosityTests: failedLuminosityTests, failedContrastTests: failedContrastTests
export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = props => {
  const { lightThemeOverrides, darkThemeOverrides, brand } = props;
  const { failedContrastTests: failLight } = getAccessibilityChecker({
    ...createLightTheme(brand),
    ...lightThemeOverrides,
  });
  const { failedContrastTests: failDark } = getAccessibilityChecker({
    ...createDarkTheme(brand),
    ...darkThemeOverrides,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
        marginBottom: tokens.spacingVerticalL,
      }}
    >
      <Label>Light mode</Label>
      <AccessibilityContrastChip failKeys={Object.keys(failLight)} />
      <Label>Dark mode</Label>
      <AccessibilityContrastChip failKeys={Object.keys(failDark)} />
    </div>
  );
};
