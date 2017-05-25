/**
 * The collection of semantic slots for colors used in themes.
 * See documentation [todo]
 */
export interface ISemanticColors {
  /**
   * ANY ADDITIONS/REMOVALS HERE MUST ALSO BE MADE TO \packages\styling\src\utilities\theme.ts:_makeSemanticColorsFromPalette()
   */

  // Base slots defining universal colors
  bodyBackground?: string;
  bodyText?: string;
  bodySubtext?: string;

  disabledBackground?: string;
  disabledText?: string;
  disabledSubtext?: string;

  focusBorder?: string;

  // Invariants - slots that rarely change color theme-to-theme because the color has meaning
  errorBackground?: string;
  errorText?: string;

  // Input controls slots (text fields, checkboxes, radios...)
  inputBorder?: string;
  inputBorderHovered?: string;
  inputBackgroundSelected?: string;
  inputBackgroundSelectedHovered?: string;
  inputForegroundSelected?: string;
}