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
  overrides?: Partial<Theme>;
};

export type OverrideState = {
  teamsLight: Partial<Theme>;
  teamsDark: Partial<Theme>;
  webLight: Partial<Theme>;
  webDark: Partial<Theme>;
  customLight: Partial<Theme>;
  customDark: Partial<Theme>;
};

export type DispatchOverride = { type: string; overrides: Partial<Theme> };

export type ReducerState = {
  themeLabel: string;
  brand: BrandVariants;
  theme: Theme;
  isDark: boolean;
  overrides: Partial<Theme>;
};

const overrideReducer = (state: OverrideState, action: DispatchOverride) => {
  switch (action.type) {
    case 'Teams Light':
      return { ...state, teamsLight: { ...state.teamsLight, ...action.overrides } };
    case 'Teams Dark':
      return { ...state, teamsDark: { ...state.teamsDark, ...action.overrides } };
    case 'Web Light':
      return { ...state, webLight: { ...state.webLight, ...action.overrides } };
    case 'Web Dark':
      return { ...state, webDark: { ...state.webDark, ...action.overrides } };
    case 'Custom Light':
      return { ...state, customLight: { ...state.customLight, ...action.overrides } };
    case 'Custom Dark':
      return { ...state, customDark: { ...state.customDark, ...action.overrides } };
    default:
      return state;
  }
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

  const [overrideState, dispatchOverrideState] = React.useReducer(overrideReducer, {
    teamsLight: {},
    teamsDark: {},
    webLight: {},
    webDark: {},
    customLight: {},
    customDark: {},
  });

  const stateReducer = (state: ReducerState, action: DispatchTheme) => {
    if (action.type === 'Override' && action.overrides) {
      if (state.themeLabel === 'Custom') {
        dispatchOverrideState({ type: state.isDark ? 'Custom Dark' : 'Custom Light', overrides: action.overrides });
      } else {
        dispatchOverrideState({ type: state.themeLabel, overrides: action.overrides });
      }
      action.type = state.themeLabel;
    }

    switch (action.type) {
      case 'Teams Light':
        return {
          themeLabel: 'Teams Light',
          brand: brandTeams,
          theme: teamsLightTheme,
          isDark: false,
          overrides: overrideState.teamsLight,
        };
      case 'Teams Dark':
        return {
          themeLabel: 'Teams Dark',
          brand: brandTeams,
          theme: teamsDarkTheme,
          isDark: true,
          overrides: overrideState.teamsDark,
        };
      case 'Web Light':
        return {
          themeLabel: 'Web Light',
          brand: brandWeb,
          theme: webLightTheme,
          isDark: false,
          overrides: overrideState.webLight,
        };
      case 'Web Dark':
        return {
          themeLabel: 'Web Dark',
          brand: brandWeb,
          theme: webDarkTheme,
          isDark: true,
          overrides: overrideState.webDark,
        };
      case 'Custom':
        if (!action.customAttributes) {
          return state;
        }
        const isDark = action.customAttributes.isDark;
        const custom = createCustomTheme(action.customAttributes);
        return {
          themeLabel: 'Custom',
          brand: custom.brand,
          theme: custom.theme,
          isDark: isDark,
          overrides: isDark ? overrideState.customDark : overrideState.customLight,
        };
      default:
        return state;
    }
  };

  return React.useReducer(stateReducer, {
    themeLabel: 'Teams Light',
    brand: brandTeams,
    theme: teamsLightTheme,
    isDark: false,
    overrides: {},
  });
};
