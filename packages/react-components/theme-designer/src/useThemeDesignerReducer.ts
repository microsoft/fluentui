import * as React from 'react';
import { createDarkTheme, createLightTheme } from '@fluentui/react-components';
import { getBrandTokensFromPalette } from './utils/getBrandTokensFromPalette';
import { brandTeams } from './utils/brandColors';
import type { BrandVariants, Theme } from '@fluentui/react-components';
import { themeList, themeNames } from './utils/themeList';

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
  themeName: string;
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
    themeName: 'Teams',
    themeLabel: 'Teams Light',
    brand: brandTeams,
    theme: createLightTheme(brandTeams),
    isDark: false,
    overrides: {},
  };

  const appStateReducer = (state: AppState, action: DispatchTheme): AppState => {
    // check if isDark is changed
    if (action.type === 'isDark' && typeof action.isDark !== 'undefined') {
      const isDark = action.isDark;
      const themeLabel = state.themeName + ' ' + (isDark ? 'Dark' : 'Light');
      return {
        ...state,
        themeLabel: themeLabel,
        theme: isDark ? createDarkTheme(state.brand) : createLightTheme(state.brand),
        isDark,
        overrides: overrideState[themeLabel],
      };
    }

    // check for override modifications
    if (action.type === 'Override') {
      if (action.overrides) {
        dispatchOverrideState({
          type: state.themeLabel,
          overrides: action.overrides,
        });
      } else {
        dispatchOverrideState({ type: state.themeLabel });
      }
      return { ...state, overrides: overrideState[state.themeLabel] };
    }

    const theme = action.type;
    const isDark = state.isDark;
    let brand = themeList[theme].brand;
    const themeLabel = theme + ' ' + (isDark ? 'Dark' : 'Light');

    // If the theme does not have an associated brand, it must be a custom theme
    if (!brand) {
      // If no theme attributes are given, the theme does not change (though overrides may)
      if (!action.customAttributes) {
        return state;
      }
      brand = createCustomTheme(action.customAttributes);
    }

    return {
      themeName: theme,
      themeLabel,
      brand,
      theme: isDark ? createDarkTheme(brand) : createLightTheme(brand),
      isDark,
      overrides: overrideState[themeLabel],
    };
  };

  return React.useReducer(appStateReducer, initialAppState);
};
