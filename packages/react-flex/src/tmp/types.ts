import * as React from 'react';

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
