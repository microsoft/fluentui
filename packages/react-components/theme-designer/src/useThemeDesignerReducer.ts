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

export type DispatchTheme = {
  type: string;
  customAttributes?: CustomAttributes;
  overrides: Partial<Theme>;
};

type ReducerState = {
  themeLabel: string;
  brand: BrandVariants;
  theme: Theme;
  isDark: boolean;
  overrides: Partial<Theme>;
};

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

  const initialState: ReducerState = {
    themeLabel: 'Teams Light',
    brand: brandTeams,
    theme: teamsLightTheme,
    isDark: false,
    overrides: {},
  };

  const stateReducer = (state: ReducerState, action: DispatchTheme) => {
    switch (action.type) {
      case 'Teams Light':
        return {
          themeLabel: 'Teams Light',
          brand: brandTeams,
          theme: teamsLightTheme,
          isDark: false,
          overrides: action.overrides,
        };
      case 'Teams Dark':
        return {
          themeLabel: 'Teams Dark',
          brand: brandTeams,
          theme: teamsDarkTheme,
          isDark: true,
          overrides: action.overrides,
        };
      case 'Web Light':
        return {
          themeLabel: 'Web Light',
          brand: brandWeb,
          theme: webLightTheme,
          isDark: false,
          overrides: action.overrides,
        };
      case 'Web Dark':
        return {
          themeLabel: 'Web Dark',
          brand: brandWeb,
          theme: webDarkTheme,
          isDark: true,
          overrides: action.overrides,
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
          isDark: action.customAttributes.isDark,
          overrides: action.overrides,
        };
      case 'Overrides':
        return {
          themeLabel: state.themeLabel,
          brand: state.brand,
          theme: state.theme,
          isDark: state.isDark,
          overrides: action.overrides,
        };
      default:
        return state;
    }
  };

  return React.useReducer(stateReducer, initialState);
};
