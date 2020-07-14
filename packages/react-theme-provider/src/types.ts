import * as React from 'react';

/**
 * A baseline set of color plates.
 */
export type ColorTokens = Partial<{
  background: string;
  contentColor: string;
  subTextColor: string;
  linkColor: string;
  iconColor: string;
  borderColor: string;
  dividerColor: string;
  focusColor: string;
  focusInnerColor: string;
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

export type FontTokens = Partial<{
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
}>;

export type ColorPlateSet = ColorTokens & ColorTokenStates;

/**
 * A token set can provide a single string or object, mapping additional sub-parts of a token set.
 */
export type TokenSetType = string | { [key: string]: TokenSetType | undefined };

/**
 * Recursive partial type.
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

/**
 * A prepared (fully expanded) theme object.
 */
export interface Theme {
  tokens: {
    body: ColorPlateSet & TokenSetType;
    [key: string]: TokenSetType;
  };

  stylesheets: string[];
}

/**
 * A partial theme, provided by the customer. The internal `createTheme` helper will fill in the rest.
 */
export interface PartialTheme extends RecursivePartial<Theme> {}

/**
 * Typing containing the definition for the `style` and `tokens` props that will be extended for the calculation of the
 * style prop.
 */
export interface StyleProps<TTokens extends ColorPlateSet = ColorPlateSet> {
  style?: React.CSSProperties;
  tokens?: TTokens;
}

export interface StyleOptions<TProps> {
  slotProps: ((props: TProps) => Record<string, object>)[];
}
