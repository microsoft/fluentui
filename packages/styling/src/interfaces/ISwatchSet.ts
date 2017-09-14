import { ISwatch } from './ISwatch';

/**
 * Experimental interface:
 *
 * A swatch set is a collection of semantic swatches which work in harmony together. Each
 * swatch has a semantic purpose and follows the naming convention:
 *
 * {component}{area}{state}
 *
 * component: (optional) a optional conceptual component, which may align to many variations.
 * area: the area within the component, usually either background or text color.
 * state: one of { Hover, Pressed, Selected, HoverSelected, Disabled, SelectionHighlight or FocusStroke }
 *
 * @export
 * @interface ISwatchSet
 */
export interface ISwatchSet {

  // Background color in various states.

  background: ISwatch;
  backgroundHover: ISwatch;
  backgroundPressed: ISwatch;
  backgroundSelected: ISwatch;
  backgroundSelectedHover: ISwatch;
  backgroundSelectionHighlight: ISwatch;

  // Foreground color.

  text: ISwatch;
  textRest: ISwatch;
  textHover: ISwatch;
  textPressed: ISwatch;
  textSelected: ISwatch;
  textDisabled: ISwatch;
  textSelectionHighlight: ISwatch;

  // Sublabels.

  secondaryText: ISwatch;
  secondaryTextRest: ISwatch;
  secondaryTextHover: ISwatch;
  secondaryTextPressed: ISwatch;
  secondaryTextSelected: ISwatch;

  // Bold text.

  emphasizedText: ISwatch;
  emphasizedTextRest: ISwatch;
  emphasizedTextHover: ISwatch;
  emphasizedTextPressed: ISwatch;
  emphasizedTextSelected: ISwatch;

  // Border colors for selected/hover and focus.

  strokeSelectedHover: ISwatch;
  strokeFocus: ISwatch;

  // Default button background.

  controlBackground: ISwatch;
  controlBackgroundHover: ISwatch;
  controlBackgroundPressed: ISwatch;
  controlBackgroundSelected: ISwatch;
  controlBackgroundDisabled: ISwatch;

  // Default button foreground.

  controlText: ISwatch;
  controlTextHover: ISwatch;
  controlTextPressed: ISwatch;
  controlTextSelected: ISwatch;
  controlTextDisabled: ISwatch;

  // Default button stroke.

  controlStroke: ISwatch;
  controlStrokeHover: ISwatch;
  controlStrokePressed: ISwatch;
  controlStrokeSelected: ISwatch;
  controlStrokeDisabled: ISwatch;
  controlStrokeFocus: ISwatch;

  // Emphasized (primary) button background.

  emphasizedControlBackground: ISwatch;
  emphasizedControlBackgroundHover: ISwatch;
  emphasizedControlBackgroundPressed: ISwatch;
  emphasizedControlBackgroundSelected: ISwatch;
  emphasizedControlBackgroundDisabled: ISwatch;

  // Emphasized button foreground.

  emphasizedControlText: ISwatch;
  emphasizedControlTextHover: ISwatch;
  emphasizedControlTextPressed: ISwatch;
  emphasizedControlTextSelected: ISwatch;
  emphasizedControlTextDisabled: ISwatch;

  // Emphasized button stroke.

  emphasizedControlStroke: ISwatch;
  emphasizedControlStrokeHover: ISwatch;
  emphasizedControlStrokePressed: ISwatch;
  emphasizedControlStrokeSelected: ISwatch;
  emphasizedControlStrokeDisabled: ISwatch;
  emphasizedControlStrokeFocus: ISwatch;

  // Subtle control background (TextField, Dropdown, Checkbox, ChoiceGroup)

  subtleControlBackground: ISwatch;
  subtleControlBackgroundHover: ISwatch;
  subtleControlBackgroundPressed: ISwatch;
  subtleControlBackgroundSelected: ISwatch;
  subtleControlBackgroundDisabled: ISwatch;

  // Subtle control foreground.

  subtleControlText: ISwatch;
  subtleControlTextHover: ISwatch;
  subtleControlTextPressed: ISwatch;
  subtleControlTextSelected: ISwatch;
  subtleControlTextDisabled: ISwatch;

  // Subtle control stroke.

  subtleControlStroke: ISwatch;
  subtleControlStrokeHover: ISwatch;
  subtleControlStrokePressed: ISwatch;
  subtleControlStrokeSelected: ISwatch;
  subtleControlStrokeDisabled: ISwatch;
  subtleControlStrokeFocus: ISwatch;

  // Hyperlinks.

  linkText: ISwatch;
  linkHover: ISwatch;
  linkPressed: ISwatch;

  // Active text

  activeText: ISwatch;
  activeTextHover: ISwatch;
  activeTextPressed: ISwatch;
  activeTextSelected: ISwatch;

  // Stroke Only -- Stroke colors to use when the background / foreground doesn't change (Ex: Color Picker Swatches)

  strokeOnlyHover: ISwatch;
  strokeOnlySelected: ISwatch;
  strokeOnlyPressed: ISwatch;

  // Error State - Used for error text / foreground color
  errorText: ISwatch;
  errorTextHover: ISwatch;
  errorTextPressed: ISwatch;
  errorTextSelected: ISwatch;

  // Accent colors
  accentDark: ISwatch;
  accentLight: ISwatch;
  accentEmphasis: ISwatch;
  accentOutline: ISwatch;

  headerBackground: ISwatch;
  headerText: ISwatch;
}