/**
 * Variant theme types values
 *
 * @public
 */
export const VariantThemeType = {
  /*
   * No variant.
   */
  None: 0 as 0,
  /*
   * A variant where the background is a soft version of the background color. Most other colors remain unchanged.
   */
  Neutral: 1 as 1,
  /*
   * A variant where the background is a soft version of the primary color. Most other colors remain unchanged.
   */
  Soft: 2 as 2,
  /*
   * A variant where the background is a strong version of the primary color. All colors change.
   * The background becomes shades of the primary color.
   * The foreground/text becomes shades of the background color.
   * The primary color becomes shades of the background.
   */
  Strong: 3 as 3,
};

export type VariantThemeType = (typeof VariantThemeType)[keyof typeof VariantThemeType];
