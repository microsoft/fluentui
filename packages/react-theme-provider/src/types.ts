/**
 * A set of states for each color plate to use.
 */
export type ThemeStateSet =
  | Partial<{
      default: string;
      hover: string;
      active: string;
      disabled: string;
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
 * A basic prepared (fully qualitied) theme object.
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
