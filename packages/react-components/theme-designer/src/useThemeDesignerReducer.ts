import * as React from 'react';
import { createDarkTheme, createLightTheme } from '@fluentui/react-components';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';
import { brandWeb } from './utils/brandColors';
import type { BrandVariants, Theme } from '@fluentui/react-components';
import { themeList, themeNames } from './utils/themeList';

export type CustomAttributes = {
  keyColor: string;
  hueTorsion: number;
  vibrancy: number;
};

export type DispatchTheme = {
  type: string;
  isDark?: boolean;
  customAttributes?: CustomAttributes;
  overrides?: Partial<Theme>;
};

export type OverrideState = Record<string, Partial<Theme>>;

export type DispatchOverride = { type: string; overrides?: Partial<Theme> };

export type AppState = {
  themeName: string;
  brand: BrandVariants;
  theme: Theme;
  isDark: boolean;
  lightOverrides: Partial<Theme>;
  darkOverrides: Partial<Theme>;
};

export const initialAppState = {
  themeName: 'Web',
  brand: brandWeb,
  theme: createLightTheme(brandWeb),
  isDark: false,
  lightOverrides: {},
  darkOverrides: {},
};

export const useThemeDesignerReducer = () => {
  const createCustomTheme = ({ hueTorsion, keyColor, vibrancy }: CustomAttributes): BrandVariants => {
    const brand = getBrandTokensFromPalette(keyColor, {
      hueTorsion,
      darkCp: vibrancy,
      lightCp: vibrancy + 0.5,
    });
    return brand;
  };

  const initialOverrideState: OverrideState = Object.fromEntries(themeNames.map(currTheme => [currTheme, {}]));

  const overrideReducer = (state: OverrideState, action: { type: string; overrides?: Partial<Theme> }) => {
    const theme = action.type;

    // Check for override modifications
    if (typeof action.overrides === 'undefined') {
      return { ...state, [theme]: {} };
    } else {
      return { ...state, [theme]: { ...state[theme], ...action.overrides } };
    }
  };

  const [overrideState, dispatchOverrideState] = React.useReducer(overrideReducer, initialOverrideState);

  const appStateReducer = (state: AppState, action: DispatchTheme): AppState => {
    // check if isDark is changed
    if (action.type === 'isDark' && typeof action.isDark !== 'undefined') {
      const isDark = action.isDark;
      return {
        ...state,
        theme: isDark ? createDarkTheme(state.brand) : createLightTheme(state.brand),
        isDark,
        lightOverrides: overrideState[state.themeName + 'Light'],
        darkOverrides: overrideState[state.themeName + 'Dark'],
      };
    }

    const stateThemeLabel = state.themeName + (state.isDark ? 'Dark' : 'Light');

    // check for override modifications
    if (action.type === 'Override') {
      if (action.overrides) {
        dispatchOverrideState({
          type: stateThemeLabel,
          overrides: action.overrides,
        });
      } else {
        dispatchOverrideState({
          type: stateThemeLabel,
        });
      }
      return { ...state, [state.isDark ? 'darkOverrides' : 'lightOverrides']: overrideState[stateThemeLabel] };
    }

    const themeName = action.type;
    const isDark = state.isDark;
    let brand = themeList[themeName].brand;

    // If the theme does not have an associated brand, it must be a custom theme
    if (!brand) {
      // If no theme attributes are given, the theme does not change (though overrides may)
      if (!action.customAttributes) {
        return state;
      }
      brand = createCustomTheme(action.customAttributes);

      dispatchOverrideState({ type: themeName + 'Light' });
      dispatchOverrideState({ type: themeName + 'Dark' });
    }

    return {
      themeName,
      brand,
      theme: isDark ? createDarkTheme(brand) : createLightTheme(brand),
      isDark,
      lightOverrides: overrideState[themeName + 'Light'],
      darkOverrides: overrideState[themeName + 'Dark'],
    };
  };

  return React.useReducer(appStateReducer, initialAppState);
};
