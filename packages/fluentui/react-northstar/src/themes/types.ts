import { Extendable } from '@fluentui/styles';

// Themes go through 3 phases.
// 1. Input - (from the user), variable and style objects/functions, some values optional
// 2. Prepared - (on context), variable and style functions only, all values required
// 3. Resolved - (for rendering), plain object variables and styles, all values required
//
// We use these terms in typings to indicate which phase the typings apply to.

// ========================================================
// Colors
// ========================================================

/**
 * A type for a palette for a single color.
 */
export type ColorVariants = Extendable<
  Partial<{
    50: string;
    100: string;
    150: string;
    200: string;
    250: string;
    300: string;
    350: string;
    400: string;
    450: string;
    500: string;
    550: string;
    600: string;
    650: string;
    700: string;
    750: string;
    800: string;
    850: string;
    900: string;
  }>,
  string
>;
/**
 * A type for a predefined natural colors.
 */
type NaturalColorsStrict = Partial<{
  blue: ColorVariants;
  green: ColorVariants;
  grey: ColorVariants;
  orange: ColorVariants;
  pink: ColorVariants;
  purple: ColorVariants;
  teal: ColorVariants;
  red: ColorVariants;
  yellow: ColorVariants;
}>;

export type NaturalColors = Extendable<NaturalColorsStrict, ColorVariants>;

/**
 * A type for a predefined state colors.
 */
export type ContextualColorsStrict = Partial<{
  text: ColorVariants;

  brand: ColorVariants;
  danger: ColorVariants;
  info: ColorVariants;
  success: ColorVariants;
  warning: ColorVariants;
}>;

export type ContextualColors = Extendable<ContextualColorsStrict, ColorVariants>;

/**
 * A type for a predefined emphasis colors.
 */
type EmphasisColorsStrict = Partial<{
  primary: ColorVariants;
  secondary: ColorVariants;
}>;

export type EmphasisColors = Extendable<EmphasisColorsStrict, ColorVariants>;

/**
 * A type for extracting the color names.
 */
export type ColorNames = keyof (EmphasisColorsStrict & NaturalColorsStrict);

/**
 * A type for an extendable set of ColorNames properties of type T
 */
export type ColorValues<T, Colors extends string | number | symbol = ColorNames> = Extendable<
  Partial<Record<Colors, T>>,
  T
>;

/**
 * A type for a base colors.
 */
export type PrimitiveColors = Partial<{
  black: string;
  white: string;
}>;

type ExtendablePalette<T> = T & { [K in keyof T]?: K extends keyof PrimitiveColors ? string : ColorVariants };

export type ColorPalette<T = {}> = ExtendablePalette<
  EmphasisColorsStrict & ContextualColorsStrict & NaturalColorsStrict & PrimitiveColors & T
>;

/**
 * A type for all area names that can define color
 */
export type ComponentAreaName =
  | 'foreground'
  | 'background'
  | 'border'
  | 'shadow'
  | 'foregroundHover'
  | 'backgroundHover'
  | 'borderHover'
  | 'shadowHover'
  | 'foregroundActive'
  | 'backgroundActive'
  | 'borderActive'
  | 'shadowActive'
  | 'foregroundFocus'
  | 'backgroundFocus'
  | 'borderFocus'
  | 'shadowFocus'
  | 'foregroundPressed'
  | 'backgroundPressed'
  | 'borderPressed'
  | 'shadowPressed'
  | 'foregroundDisabled'
  | 'backgroundDisabled'
  | 'borderDisabled'
  | 'shadowDisabled';

/**
 * A type for the generic color scheme of a component based on CSS property names
 */
export type ColorScheme<T extends string | number | symbol = ComponentAreaName> = Extendable<Record<T, string>, string>;

export type ColorSchemeMapping<
  Scheme = ColorScheme,
  Colors extends string | number | symbol = ColorNames,
> = ColorValues<Extendable<Scheme, string>, Colors> & {
  default?: Extendable<Scheme, string>;
};

export type StrictColorScheme<T extends string | number | symbol = ComponentAreaName> = Record<T, string>;

export type StrictColorSchemeMapping<
  Scheme = StrictColorScheme,
  Colors extends string | number | symbol = ColorNames,
> = ColorValues<Scheme, Colors> & {
  default?: Scheme;
};

export type ColorSchemeMappingOverrides<
  Scheme = ColorScheme,
  Colors extends string | number | symbol = ColorNames,
> = ColorValues<Partial<Extendable<Scheme, string>>, Colors> & {
  default?: Partial<Extendable<ColorScheme, string>>;
};

export type ItemType<T> = T extends (infer TItem)[] ? TItem : never;
