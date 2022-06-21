import * as React from 'react';
import {
  createDarkTheme,
  createLightTheme,
  teamsDarkTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';
import { brandTeams, brandWeb } from './utils/brandColors';

import type { BrandVariants, Theme } from '@fluentui/react-components';

export type CustomAttributes = {
  keyColor: string;
  hueTorsion: number;
  darkCp: number;
  lightCp: number;
  isDark: boolean;
};

export type DispatchTheme = React.Dispatch<{
  type: string;
  customAttributes?: CustomAttributes;
}>;

export const useThemeDesignerReducer = () => {
  const createCustomTheme = ({
    darkCp,
    hueTorsion,
    isDark,
    keyColor,
    lightCp,
  }: CustomAttributes): { brand: BrandVariants; theme: Theme } => {
    const brand = getBrandTokensFromPalette(keyColor, {
      hueTorsion: hueTorsion,
      darkCp: darkCp,
      lightCp: lightCp,
    });
    return {
      brand: brand,
      theme: isDark ? createDarkTheme(brand) : createLightTheme(brand),
    };
  };

  const initialState = {
    themeLabel: 'Teams Light',
    brand: brandTeams,
    theme: teamsLightTheme,
  };

  const stateReducer = (
    state: { themeLabel: string; brand: BrandVariants; theme: Theme },
    action: {
      type: string;
      customAttributes?: CustomAttributes;
    },
  ) => {
    switch (action.type) {
      case 'Teams Light':
        return {
          themeLabel: 'Teams Light',
          brand: brandTeams,
          theme: teamsLightTheme,
        };
      case 'Teams Dark':
        return {
          themeLabel: 'Teams Dark',
          brand: brandTeams,
          theme: teamsDarkTheme,
        };
      case 'Web Light':
        return {
          themeLabel: 'Web Light',
          brand: brandWeb,
          theme: webLightTheme,
        };
      case 'Web Dark':
        return {
          themeLabel: 'Web Dark',
          brand: brandWeb,
          theme: webDarkTheme,
        };
      case 'Custom':
        if (!action.customAttributes) {
          return state;
        }
        const custom = createCustomTheme(action.customAttributes);
        return {
          themeLabel: 'Custom',
          brand: custom.brand,
          theme: custom.theme,
        };
      default:
        return state;
    }
  };

  return React.useReducer(stateReducer, initialState);
};
