import * as React from 'react';
import type { BrandVariants, Theme } from '@fluentui/react-components';
import { createDarkTheme, createLightTheme } from '@fluentui/react-components';
import { brandWeb } from '../utils/brandColors';
import { getBrandTokensFromPalette } from '../utils/getBrandTokensFromPalette';
import { getOverridableTokenBrandColors } from '../components/ColorTokens/getOverridableTokenBrandColors';
import { Brands } from '@fluentui/react-theme';

export type ColorOverrideBrands = Record<string, Brands>;

export type ColorOverridePayload = {
  colorToken: string;
  newColor: string;

  brand: number;
};

export type CustomAttributes = {
  keyColor: string;
  hueTorsion: number;
  vibrancy: number;
};

interface ThemeDesignerContextProps {
  children: React.ReactNode;
}

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
          ...(state.isDark ? state.darkThemeOverrides : state.lightThemeOverrides),
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
