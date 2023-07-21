/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Button } from '@fluentui/react-components';
import type { Brands } from '@fluentui/react-theme';
import { AccessibilityList } from './AccessibilityList';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';

export interface ColorTokensProps {}

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const {
    state: {
      brand,
      isDark,
      themeWithOverrides,
      darkBrandOverrides,
      lightBrandOverrides,
      lightThemeOverrides,
      darkThemeOverrides,
      themeName,
    },
    dispatch,
  } = useThemeDesigner();
  const brandColorOverrides = isDark ? darkBrandOverrides : lightBrandOverrides;
  const themeOverrides = isDark ? darkThemeOverrides : lightThemeOverrides;

  const onNewOverride = (color: string, newColor: Brands) => {
    dispatch({
      type: 'addOverride',
      payload: {
        colorToken: color,
        newColor: brand[newColor],
        brand: newColor,
      },
    });
  };

  const handleResetClick = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div>
      <Button size="small" onClick={handleResetClick}>
        Reset Customizations
      </Button>
      <AccessibilityList
        themeOverrides={themeOverrides}
        brand={brand}
        themeName={themeName}
        colorOverride={brandColorOverrides}
        onNewOverride={onNewOverride}
        theme={themeWithOverrides}
      />
    </div>
  );
};
