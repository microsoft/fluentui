import * as React from 'react';
import { createDarkTheme, createLightTheme } from '@fluentui/react-components';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';
import { brandTeams } from './utils/brandColors';
import type { BrandVariants, Theme } from '@fluentui/react-components';
import { themeList, themeNames } from './utils/themes/themeList';

export type CustomAttributes = {
  keyColor: string;
  hueTorsion: number;
  darkCp: number;
  lightCp: number;
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
  themeLabel: string;
  brand: BrandVariants;
  theme: Theme;
  isDark: boolean;
  overrides: Partial<Theme>;
};

export const useThemeDesignerReducer = () => {
  const createCustomTheme = ({ darkCp, hueTorsion, keyColor, lightCp }: CustomAttributes): BrandVariants => {
    const brand = getBrandTokensFromPalette(keyColor, {
      hueTorsion: hueTorsion,
      darkCp: darkCp,
      lightCp: lightCp,
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

  const initialAppState = {
    themeLabel: 'Teams Light',
    brand: brandTeams,
    theme: createLightTheme(brandTeams),
    isDark: false,
    overrides: {},
  };

  const appStateReducer = (state: AppState, action: DispatchTheme): AppState => {
    // check if isDark is changed
    let isDark = state.isDark;
    if (action.type === 'isDark' && typeof action.isDark != 'undefined') {
      isDark = action.isDark;
      return { ...state, theme: isDark ? createDarkTheme(state.brand) : createLightTheme(state.brand), isDark };
    }

    const theme = action.type;
    const themeLabel = theme + ' ' + (isDark ? 'Dark' : 'Light');

    // check for override modifications
    if (action.type === 'Override') {
      if (action.overrides) {
        dispatchOverrideState({
          type: themeLabel,
          overrides: action.overrides,
        });
      } else {
        dispatchOverrideState({ type: themeLabel });
      }
      action.type = state.themeLabel;
    }

    const brand = themeList[theme].brand;

    // If the theme does not have an associated brand, it must be a custom theme
    if (!brand) {
      // If no theme attributes are given, the theme does not change
      if (!action.customAttributes) {
        return state;
      }
      const customBrand = createCustomTheme(action.customAttributes);
      return {
        themeLabel,
        brand: customBrand,
        theme: isDark ? createDarkTheme(customBrand) : createLightTheme(customBrand),
        isDark,
        overrides: overrideState[themeLabel],
      };
    }

    return {
      themeLabel,
      brand,
      theme: isDark ? createDarkTheme(brand) : createLightTheme(brand),
      isDark,
      overrides: overrideState[themeLabel],
    };
  };

  return React.useReducer(appStateReducer, initialAppState);
};
