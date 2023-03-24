import * as React from 'react';
import type { BrandVariants, Theme } from '@fluentui/react-components';
import { createDarkTheme, createLightTheme } from '@fluentui/react-components';
import { brandWeb } from '../utils/brandColors';
import { getBrandTokensFromPalette } from '../utils/getBrandTokensFromPalette';
import { getOverridableTokenBrandColors } from '../components/ColorTokens/getOverridableTokenBrandColors';
import { Brands } from '@fluentui/react-theme';

export type ColorOverrideBrands = Record<string, Brands>;

// TODO -- merge this into the main reducer
export type ColorOverridePayload = {
  colorToken: string;
  newColor: string;

  brand: number;
};

// const getCurrentOverride = (themeLabel: string, colorOverride: ColorOverrides) => {
//   return colorOverride[themeLabel];
// };

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
  | { type: 'addOverride'; payload: ColorOverridePayload }
  | { type: 'themeName'; payload: string };

type Dispatch = (action: Action) => void;

export type ThemeDesignerState = {
  themeName: string;
  brand: BrandVariants;
  theme: Theme;
  themeWithOverrides: Theme;
  isDark: boolean;
  lightThemeOverrides: Partial<Theme>;
  darkThemeOverrides: Partial<Theme>;

  lightBrandOverrides: ColorOverrideBrands;

  darkBrandOverrides: ColorOverrideBrands;
};

export const initialThemeDesignerState: ThemeDesignerState = {
  themeName: 'Custom',
  brand: brandWeb,
  theme: createLightTheme(brandWeb),
  themeWithOverrides: createLightTheme(brandWeb),
  isDark: false,
  lightThemeOverrides: {},
  darkThemeOverrides: {},
  lightBrandOverrides: getOverridableTokenBrandColors(createLightTheme(brandWeb), brandWeb),
  darkBrandOverrides: getOverridableTokenBrandColors(createDarkTheme(brandWeb), brandWeb),
};

export const ThemeDesignerContext = React.createContext<{ state: ThemeDesignerState; dispatch: Dispatch } | undefined>(
  undefined,
);

const createCustomTheme = ({ hueTorsion, keyColor, vibrancy }: CustomAttributes): BrandVariants => {
  return getBrandTokensFromPalette(keyColor, {
    hueTorsion,
    darkCp: vibrancy,
    lightCp: vibrancy + 0.5,
  });
};

export const ThemeDesignerReducer = (state: ThemeDesignerState, action: Action): ThemeDesignerState => {
  switch (action.type) {
    case 'isDark':
      const theme = action.payload ? createDarkTheme(state.brand) : createLightTheme(state.brand);
      return {
        ...state,
        theme,
        isDark: action.payload,
        themeWithOverrides: {
          ...theme,
          ...state.themeWithOverrides,
        },
      };
    case 'reset':
      const resetTheme = state.isDark ? createDarkTheme(state.brand) : createLightTheme(state.brand);
      return {
        ...state,
        theme: resetTheme,
        themeWithOverrides: resetTheme,
        lightBrandOverrides: getOverridableTokenBrandColors(createLightTheme(brandWeb), brandWeb),
        darkBrandOverrides: getOverridableTokenBrandColors(createDarkTheme(brandWeb), brandWeb),
      };
    case 'updateThemeWithCustomerAttributes':
      const newBrand = createCustomTheme(action.payload);
      return {
        ...state,
        brand: newBrand,
        theme: state.isDark ? createDarkTheme(newBrand) : createLightTheme(newBrand),
      };
    case 'addOverride':
      if (state.isDark) {
        const overrides = {
          ...state.darkThemeOverrides,
          // This overrides a THEME token to a new color
          [action.payload.colorToken]: action.payload.newColor,
        };
        return {
          ...state,
          darkBrandOverrides: {
            ...state.darkBrandOverrides,
            // this is signifying for e.g. 'colorBrandBackground2' = 8 (which is the 8th sqaure in the color wheel)
            [action.payload.colorToken]: action.payload.brand,
          } as ColorOverrideBrands,
          darkThemeOverrides: overrides,
          themeWithOverrides: {
            ...state.themeWithOverrides,
            ...overrides,
          },
        };
      } else {
        const overrides = {
          ...state.lightThemeOverrides,
          // This overrides a THEME token to a new color
          [action.payload.colorToken]: action.payload.newColor,
        };
        return {
          ...state,
          lightBrandOverrides: {
            ...state.lightBrandOverrides,
            // this is signifying for e.g. 'colorBrandBackground2' = 8 (which is the 8th sqaure in the color wheel)
            [action.payload.colorToken]: action.payload.brand,
          } as ColorOverrideBrands,
          lightThemeOverrides: overrides,
          themeWithOverrides: {
            ...state.themeWithOverrides,
            ...overrides,
          },
        };
      }
    case 'themeName':
      return {
        ...state,
        themeName: action.payload,
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
