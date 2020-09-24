import { IPartialTheme, ITheme } from './ITheme';
import { IStyleFunctionOrObject } from '@uifabric/utilities';

/**
 * A ramp of size values.
 */
export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

/**
 * A baseline set of color plates.
 */
export type ColorTokens = Partial<{
  background: string;
  contentColor: string;
  secondaryContentColor: string;
  linkColor: string;
  iconColor: string;
  borderColor: string;
  dividerColor: string;
  focusColor: string;
  focusInnerColor: string;
  opacity: string;
}>;

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
export type ColorTokenStates = Partial<{
  hovered: ColorTokens;
  pressed: ColorTokens;
  disabled: ColorTokens;
  checked: ColorTokens;
  checkedHovered: ColorTokens;
  checkedPressed: ColorTokens;
}>;

export type ColorTokenSet = ColorTokens & ColorTokenStates;

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

export interface ComponentStyles {
  [componentName: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    styles?: IStyleFunctionOrObject<any, any>;
  };
}

/**
 * A prepared (fully expanded) theme object.
 */
export interface Theme extends ITheme {
  components?: ComponentStyles;
  tokens?: Tokens;
  stylesheets?: string[];
}

/**
 * A partial theme, provided by the customer. The internal `createTheme` helper will fill in the rest.
 */
export interface PartialTheme extends IPartialTheme {
  components?: ComponentStyles;
  tokens?: RecursivePartial<Tokens>;
  stylesheets?: string[];
}
