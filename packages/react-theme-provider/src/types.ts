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
export type ThemeStateSet =
  | Partial<{
      default: string;
      hovered: string;
      pressed: string;
      disabled: string;
      checked: string;
      checkedHovered: string;
      checkedPressed: string;
    }>
  | string;

/**
 * A baseline set of color plates.
 */
export type ThemePlateSet = Partial<{
  fill: ThemeStateSet;
  text: ThemeStateSet;
  subText: ThemeStateSet;
  link: ThemeStateSet;
  divider: ThemeStateSet;
  [key: string]: ThemeStateSet;
}>;

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
export interface ThemePrepared {
  tokens: {
    body: ThemePlateSet;
    [key: string]: TokenSetType;
  };

  stylesheets: string[];
}

/**
 * A partial theme, provided by the customer. The internal `createTheme` helper will fill in the rest.
 */
export interface Theme extends RecursivePartial<ThemePrepared> {}
