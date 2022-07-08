import * as React from 'react';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import type { DispatchTheme, ReducerState } from '../../useThemeDesignerReducer';

export type ColorOverrides = {
  teamsLight: Record<string, Brands>;
  teamsDark: Record<string, Brands>;
  webLight: Record<string, Brands>;
  webDark: Record<string, Brands>;
  customLight: Record<string, Brands>;
  customDark: Record<string, Brands>;
};

export type DispatchColorOverrides = {
  type: string;
  colorToken?: string;
  newValue?: Brands;
};

export const getCurrentOverride = (appState: ReducerState, colorOverride: ColorOverrides) => {
  switch (appState.themeLabel) {
    case 'Teams Light':
      return colorOverride.teamsLight;
    case 'Teams Dark':
      return colorOverride.teamsDark;
    case 'Web Light':
      return colorOverride.webLight;
    case 'Web Dark':
      return colorOverride.webDark;
    case 'Custom':
      if (!appState.isDark) {
        return colorOverride.customLight;
      } else {
        return colorOverride.customDark;
      }
    default:
      return colorOverride.customLight;
  }
};

export const useColorOverrideReducer = (
  appState: ReducerState,
  brand: BrandVariants,
  dispatchState: React.Dispatch<DispatchTheme>,
) => {
  const colorOverrideReducer: (
    state: ColorOverrides,
    action: { type: string; colorToken?: string; newValue?: Brands },
  ) => ColorOverrides = (state, action) => {
    switch (action.type) {
      case 'Add Override':
        if (!action.colorToken || !action.newValue) {
          return state;
        }
        switch (appState.themeLabel) {
          case 'Teams Light':
            return { ...state, teamsLight: { ...state.teamsLight, [action.colorToken]: action.newValue } };
          case 'Teams Dark':
            return { ...state, teamsDark: { ...state.teamsDark, [action.colorToken]: action.newValue } };
          case 'Web Light':
            return { ...state, webLight: { ...state.webLight, [action.colorToken]: action.newValue } };
          case 'Web Dark':
            return { ...state, webDark: { ...state.webDark, [action.colorToken]: action.newValue } };
          case 'Custom':
            if (!appState.isDark) {
              return { ...state, customLight: { ...state.customLight, [action.colorToken]: action.newValue } };
            } else {
              return { ...state, customDark: { ...state.customDark, [action.colorToken]: action.newValue } };
            }
          default:
            return state;
        }
      case 'Reset Overrides':
        switch (appState.themeLabel) {
          case 'Teams Light':
            return { ...state, teamsLight: {} };
          case 'Teams Dark':
            return { ...state, teamsDark: {} };
          case 'Web Light':
            return { ...state, webLight: {} };
          case 'Web Dark':
            return { ...state, webDark: {} };
          case 'Custom':
            if (!appState.isDark) {
              return { ...state, customLight: {} };
            } else {
              return { ...state, customDark: {} };
            }
          default:
            return state;
        }
      case 'Reset Custom Overrides':
        return { ...state, customLight: {}, customDark: {} };
      default:
        return state;
    }
  };
  return React.useReducer(colorOverrideReducer, {
    teamsLight: {},
    teamsDark: {},
    webLight: {},
    webDark: {},
    customLight: {},
    customDark: {},
  });
};
