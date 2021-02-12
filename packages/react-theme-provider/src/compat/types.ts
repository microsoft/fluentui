import * as React from 'react';
import { Theme as CompatTheme, PartialTheme as CompatPartialTheme } from '@fluentui/theme';
import { IStyleFunctionOrObject } from '@fluentui/utilities';

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
  menuIconColor?: string;
  borderColor?: string;
  dividerColor?: string;
  focusColor?: string;
  focusInnerColor?: string;
  opacity?: string;

  highContrast?: ColorTokens;
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
  checked?: ColorTokenSet;
  checkedHovered?: ColorTokenSet;
  checkedPressed?: ColorTokenSet;
  disabled?: ColorTokenSet;
  expanded?: ColorTokenSet;
  focused?: ColorTokenSet;
  hovered?: ColorTokenSet;
  pressed?: ColorTokenSet;
  selected?: ColorTokenSet;
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
    body: ColorTokens & TokenSetType;
    brand: ColorTokens & TokenSetType;
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
 * Typing containing the definition for the `style` and `tokens` props that will be extended for the calculation of the
 * style prop.
 */
export interface StyleProps<TTokens extends ColorTokenSet = ColorTokenSet> {
  style?: React.CSSProperties;
  tokens?: TTokens;
}

export interface StyleOptions<TProps> {
  slotProps: ((props: TProps) => Record<string, object>)[];
}

/**
 * {@docCategory Theme}
 * Component-level styles and token set.
 */
export type ComponentsStyles = {
  [componentName: string]: {
    /**
     * styles prop for a component.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    styles?: IStyleFunctionOrObject<any, any>;

    /**
     * The variants property is still in an experimental phase. This is only applied by `ThemeProvider`.
     */
    variants?: Variants;
  };
};

export interface Theme extends CompatTheme {
  components?: ComponentsStyles;

  /**
   * @internal
   * CSS stylesheets to be registered.
   * This is still in an experimental phase and is only applied by `ThemeProvider`.
   */
  stylesheets?: string[];

  /**
   * @internal
   * Global tokens. This is for internal use only and is not production-ready.
   * */
  tokens?: RecursivePartial<Tokens>;
}

export interface PartialTheme extends CompatPartialTheme {
  components?: ComponentsStyles;

  /**
   * @internal
   * CSS stylesheets to be registered.
   * This is still in an experimental phase and is only applied by `ThemeProvider`.
   */
  stylesheets?: string[];

  /**
   * @internal
   * Global tokens. This is for internal use only and is not production-ready.
   * */
  tokens?: RecursivePartial<Tokens>;
}
