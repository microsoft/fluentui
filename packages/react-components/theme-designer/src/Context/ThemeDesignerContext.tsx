import * as React from 'react';
import type { BrandVariants, Theme } from '@fluentui/react-components';
import { createDarkTheme, createLightTheme } from '@fluentui/react-components';
import { brandWeb } from '../utils/brandColors';
import { getBrandTokensFromPalette } from '../utils/getBrandTokensFromPalette';
import { Brands } from '@fluentui/tokens';
import { themeNames } from '../utils/themeList';

export type ColorOverrideBrands = Record<string, Brands>;

export type ColorOverrides = Record<string, ColorOverrideBrands>;

// TODO -- merge this into the main reducer
export type ColorOverridePayload = {
  type: string;
  colorToken?: string;
  newValue?: Brands;
};

const getCurrentOverride = (themeLabel: string, colorOverride: ColorOverrides) => {
  return colorOverride[themeLabel];
};

const initialColorOverride: ColorOverrides = Object.fromEntries(themeNames.map(currTheme => [currTheme, {}]));

console.log('Initial overrides', initialColorOverride, themeNames);
export type CustomAttributes = {
  keyColor: string;
  hueTorsion: number;
  vibrancy: number;
};

interface ThemeDesignerContextProps {
  children: React.ReactNode;
}

/**
 *  // const colorOverrideReducer: (
 *   //   state: ColorOverrides,
 *   //   action: { type: string; colorToken?: string; newValue?: Brands },
 *   // ) => ColorOverrides = (state, action) => {
 *   //   switch (action.type) {
 *   //     case 'Add Override':
 *   //       if (!action.colorToken || !action.newValue) {
 *   //         return state;
 *   //       }
 *   //       return {
 *   //         ...state,
 *   //         [themeLabel]: { ...state[themeLabel], [action.colorToken]: action.newValue },
 *   //       };
 *   //     case 'Reset Overrides':
 *   //       return { ...state, [themeLabel]: {} };
 *   //     case 'Reset Custom Overrides':
 *   //       return { ...state, [themeName + 'Light']: {}, [themeName + 'Dark']: {} };
 *   //     default:
 *   //       return state;
 *   //   }
 *   // };
 *   //
 */
// export type DispatchTheme = {
//   type: string;
//   isDark?: boolean;
//   customAttributes?: CustomAttributes;
//   overrides?: Partial<Theme>;
// };

// export type OverrideState = Record<string, Partial<Theme>>;
//
// export type DispatchOverride = { type: string; overrides?: Partial<Theme> };

type Action =
  | { type: 'isDark'; payload: boolean }
  | { type: 'override'; payload: Partial<Theme> }
  | { type: 'reset' }
  | { type: 'updateThemeWithCustomerAttributes'; payload: CustomAttributes }
  | { type: 'addOverride'; payload: ColorOverridePayload };

type Dispatch = (action: Action) => void;

export type ThemeDesignerState = {
  themeName: string;
  brand: BrandVariants;
  theme: Theme;
  isDark: boolean;
  lightOverrides: Partial<Theme>;
  darkOverrides: Partial<Theme>;
};

export const initialThemeDesignerState = {
  themeName: 'Custom',
  brand: brandWeb,
  theme: createLightTheme(brandWeb),
  isDark: false,
  lightOverrides: {},
  darkOverrides: {},
};

export const ThemeDesignerContext = React.createContext<{ state: ThemeDesignerState; dispatch: Dispatch }>({
  state: initialThemeDesignerState,
  dispatch: () => true,
});

const createCustomTheme = ({ hueTorsion, keyColor, vibrancy }: CustomAttributes): BrandVariants => {
  return getBrandTokensFromPalette(keyColor, {
    hueTorsion,
    darkCp: vibrancy,
    lightCp: vibrancy + 0.5,
  });
};

export const ThemeDesignerReducer = (state: ThemeDesignerState, action: Action) => {
  switch (action.type) {
    case 'isDark':
      return {
        ...state,
        theme: action.payload ? createDarkTheme(state.brand) : createLightTheme(state.brand),
        isDark: action.payload,
        // lightOverrides: state[state.themeName + 'Light'],
        // darkOverrides: state[state.themeName + 'Dark'],
      };
    case 'override':
      return {
        ...state,
      };
    case 'updateThemeWithCustomerAttributes':
      const newBrand = createCustomTheme(action.payload);
      return {
        ...state,
        brand: newBrand,
        theme: state.isDark ? createDarkTheme(newBrand) : createLightTheme(newBrand),
      };
    case 'addOverride':
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export const useThemeDesigner = () => {
  const context = React.useContext(ThemeDesignerContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

export const ThemeDesignerContextProvider = ({ children }: ThemeDesignerContextProps) => {
  const [state, dispatch] = React.useReducer(ThemeDesignerReducer, initialThemeDesignerState);

  const value = { state, dispatch };

  return <ThemeDesignerContext.Provider value={value}>{children}</ThemeDesignerContext.Provider>;
};
// export const themeDesignerContext = () => {
//
//   // const initialOverrideState: OverrideState = Object.fromEntries(themeNames.map(currTheme => [currTheme, {}]));
//   //
//   // const overrideReducer = (state: OverrideState, action: { type: string; overrides?: Partial<Theme> }) => {
//   //   const theme = action.type;
//   //
//   //   // Check for override modifications
//   //   if (typeof action.overrides === 'undefined') {
//   //     return { ...state, [theme]: {} };
//   //   } else {
//   //     return { ...state, [theme]: { ...state[theme], ...action.overrides } };
//   //   }
//   // };
//   //
//   // const [overrideState, dispatchOverrideState] = useReducer(overrideReducer, initialOverrideState);
//   //
//   // const appStateReducer = (state: AppState, action: DispatchTheme): AppState => {
//   //   // check if isDark is changed
//   //   if (action.type === 'isDark' && typeof action.isDark !== 'undefined') {
//   //     const isDark = action.isDark;
//   //     return {
//   //       ...state,
//   //       theme: isDark ? createDarkTheme(state.brand) : createLightTheme(state.brand),
//   //       isDark,
//   //       lightOverrides: overrideState[state.themeName + 'Light'],
//   //       darkOverrides: overrideState[state.themeName + 'Dark'],
//   //     };
//   //   }
//   //
//   //   const stateThemeLabel = state.themeName + (state.isDark ? 'Dark' : 'Light');
//   //
//   //   // check for override modifications
//   //   if (action.type === 'Override') {
//   //     if (action.overrides) {
//   //       dispatchOverrideState({
//   //         type: stateThemeLabel,
//   //         overrides: action.overrides,
//   //       });
//   //     } else {
//   //       dispatchOverrideState({
//   //         type: stateThemeLabel,
//   //       });
//   //     }
//   //     return { ...state, [state.isDark ? 'darkOverrides' : 'lightOverrides']: overrideState[stateThemeLabel] };
//   //   }
//   //
//   //   const themeName = action.type;
//   //   const isDark = state.isDark;
//   //   let brand = themeList[themeName].brand;
//   //
//   //   // If the theme does not have an associated brand, it must be a custom theme
//   //   if (!brand) {
//   //     // If no theme attributes are given, the theme does not change (though overrides may)
//   //     if (!action.customAttributes) {
//   //       return state;
//   //     }
//   //     brand = createCustomTheme(action.customAttributes);
//   //
//   //     dispatchOverrideState({ type: themeName + 'Light' });
//   //     dispatchOverrideState({ type: themeName + 'Dark' });
//   //   }
//   //
//   //   return {
//   //     themeName,
//   //     brand,
//   //     theme: isDark ? createDarkTheme(brand) : createLightTheme(brand),
//   //     isDark,
//   //     lightOverrides: overrideState[themeName + 'Light'],
//   //     darkOverrides: overrideState[themeName + 'Dark'],
//   //   };
//   // };
//   //
//   // return React.useReducer(appStateReducer, initialAppState);
// };
