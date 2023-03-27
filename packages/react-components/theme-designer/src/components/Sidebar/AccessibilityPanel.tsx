import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { getAccessibilityChecker } from '../../utils/getAccessibilityChecker';
import { BrandVariants, createDarkTheme, createLightTheme, Theme } from '@fluentui/tokens';
import { AccessibilityContrastChip } from '../ColorTokens/AccessibilityList';
export interface AccessibilityPanelProps {
  lightThemeOverrides: Partial<Theme>;

  darkThemeOverrides: Partial<Theme>;

  brand: BrandVariants;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = props => {
  const { lightThemeOverrides, darkThemeOverrides, brand } = props;
  const { fail: failLight } = getAccessibilityChecker({ ...createLightTheme(brand), ...lightThemeOverrides });
  const { fail: failDark } = getAccessibilityChecker({ ...createDarkTheme(brand), ...darkThemeOverrides });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Label>Light mode</Label>
      <AccessibilityContrastChip failKeys={Object.keys(failLight)} />
      <Label>Dark mode</Label>
      <AccessibilityContrastChip failKeys={Object.keys(failDark)} />
    </div>
  );
};
