import { IRawStyle } from '@uifabric/merge-styles';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { IPalette } from './IPalette';
import { IFontStyles } from './IFontStyles';
import { ISemanticColors } from './ISemanticColors';
import { ISpacing } from './ISpacing';
import { IEffects } from './IEffects';
import { IScheme, ISchemeNames } from './IScheme';

/**
 * A ramp of size values.
 */
export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

/**
 * A baseline set of color plates.
 */
export type ColorTokenSet = {
  background?: string;
  contentColor?: string;
  secondaryContentColor?: string;
  linkColor?: string;
  iconColor?: string;
  borderColor?: string;
  dividerColor?: string;
  focusColor?: string;
  focusInnerColor?: string;
  opacity?: string;
};

/**
 * A set of states for each color plate to use.
 *
 * Note:
 *
 * State names here align to a consistent naming convention:
 *
 * The component is _____
 *
 * Bad: "hover", Good: "hovered"
 *
 * Additional considerations:
 *
 * The term "active" in css means that the keyboard or mouse button
 * which activates the component is pressed down. It is however ambiguous
 * with a focused state, as the HTML object model refers to the focused
 * element as the "activeElement". To resolve ambiguity and to be more
 * compatible with other platforms reusing token names, we have decided to snap
 * to "pressed".
 */
export type ColorTokens = ColorTokenSet & {
  hovered?: ColorTokens;
  pressed?: ColorTokens;
  disabled?: ColorTokens;
  checked?: ColorTokens;
  checkedHovered?: ColorTokens;
  checkedPressed?: ColorTokens;
};

export type FontTokens = Partial<{
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
}>;

/**
 * A token set can provide a single string or object, mapping additional sub-parts of a token set.
 */
export type TokenSetType = { [key: string]: TokenSetType | string | number | undefined };

/**
 * Recursive partial type.
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I> ? Array<RecursivePartial<I>> : RecursivePartial<T[P]>;
};

export interface Tokens {
  color: {
    body: ColorTokenSet & TokenSetType;
    brand: ColorTokenSet & TokenSetType;
    [key: string]: TokenSetType;
  };

  [key: string]: TokenSetType;
}

/**
 * A set of style configurations for variants of a component (e.g. primary is a variant for the Button component).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Variants = Record<string, any>;

/**
 * {@docCategory Theme}
 * Component-level styles and variants.
 */
export interface ComponentStyles {
  /**
   * styles prop for a component.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: IStyleFunctionOrObject<any, any>;

  /**
   * The variants property is still in an experimental phase. This is only applied by `ThemeProvider`.
   */
  variants?: Variants;
}

/**
 * {@docCategory Theme}
 * Component-level styles and token set.
 */
export type ComponentsStyles = {
  [componentName: string]: ComponentStyles;
};

/**
 * {@docCategory Theme}
 * A prepared (fully expanded) theme object.
 */
export interface Theme extends IScheme {
  /**
   * Component-level styles and token set.
   * This is still in an experimental phase and is only applied by `ThemeProvider`.
   */
  components?: ComponentsStyles;

  /**
   * CSS stylesheets to be registered.
   * This is still in an experimental phase and is only applied by `ThemeProvider`.
   */
  stylesheets?: string[];

  /**
   * @internal
   * Id of the theme. This is for internal use only.
   */
  id?: string;

  /**
   * @internal
   * Global tokens. This is for internal use only and is not production-ready.
   * */
  tokens?: RecursivePartial<Tokens>;

  /**
   * @internal
   * The schemes property is still in an experimental phase. The intent is to have it work
   * in conjunction with new 'schemes' prop that any component making use of Foundation can use.
   * Alternative themes that can be referred to by name.
   */
  schemes?: { [P in ISchemeNames]?: IScheme };
}

/**
 * {@docCategory Theme}
 * A partial theme.
 */
export interface PartialTheme {
  components?: ComponentsStyles;
  stylesheets?: string[];

  palette?: Partial<IPalette>;
  fonts?: Partial<IFontStyles>;
  semanticColors?: Partial<ISemanticColors>;
  isInverted?: boolean;
  disableGlobalClassNames?: boolean;
  rtl?: boolean;
  spacing?: Partial<ISpacing>;
  effects?: Partial<IEffects>;

  /**
   * Use this property to specify font property defaults.
   */
  defaultFontStyle?: IRawStyle;

  /**
   * @internal
   * Global tokens. This is experimental and not production-ready.
   * */
  tokens?: RecursivePartial<Tokens>;

  /**
   * @internal
   * The schemes property is still in an experimental phase. The intent is to have it work
   * in conjunction with new 'schemes' prop that any component making use of Foundation can use.
   * Alternative themes that can be referred to by name.
   */
  schemes?: { [P in ISchemeNames]?: IScheme };
}
