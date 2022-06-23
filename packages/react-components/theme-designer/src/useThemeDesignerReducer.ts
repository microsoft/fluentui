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
import { overrideTheme } from './utils/overrideTheme';

import type { BrandVariants, Theme } from '@fluentui/react-components';
import type { ColorOverrides } from './utils/colorOverrides';

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
  overrides?: ColorOverrides;
};

type ReducerState = {
  themeLabel: string;
  brand: BrandVariants;
  theme: Theme;
  isDark: boolean;
  overrides: ColorOverrides;
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
          theme: overrideTheme(teamsLightTheme, brandTeams, state.overrides),
          isDark: false,
          overrides: state.overrides,
        };
      case 'Teams Dark':
        return {
          themeLabel: 'Teams Dark',
          brand: brandTeams,
          theme: overrideTheme(teamsDarkTheme, brandTeams, state.overrides),
          isDark: true,
          overrides: state.overrides,
        };
      case 'Web Light':
        return {
          themeLabel: 'Web Light',
          brand: brandWeb,
          theme: overrideTheme(webLightTheme, brandWeb, state.overrides),
          isDark: false,
          overrides: state.overrides,
        };
      case 'Web Dark':
        return {
          themeLabel: 'Web Dark',
          brand: brandWeb,
          theme: overrideTheme(webDarkTheme, brandWeb, state.overrides),
          isDark: true,
          overrides: state.overrides,
        };
      case 'Custom':
        if (!action.customAttributes) {
          return state;
        }
        const custom = createCustomTheme(action.customAttributes);
        return {
          themeLabel: 'Custom',
          brand: custom.brand,
          theme: overrideTheme(custom.theme, custom.brand, state.overrides),
          isDark: action.customAttributes.isDark,
          overrides: state.overrides,
        };
      case 'Overrides':
        if (!action.overrides) {
          return state;
        }
        return {
          themeLabel: state.themeLabel,
          brand: state.brand,
          theme: overrideTheme(state.theme, state.brand, action.overrides),
          isDark: state.isDark,
          overrides: action.overrides,
        };
      default:
        return state;
    }
  };

  return React.useReducer(stateReducer, initialState);
};
