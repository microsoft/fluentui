/**
 * The collection of semantic slots for colors used in themes.
 *
 * ## Naming Convention
 *
 * The name of a semantic slot can quickly tell you how it’s meant to be used. It generally follows this format:
 *
 * [category name][element name][checked state][hovered/pressed/disabled state]
 * [category name] – The “family” that this slot belongs to.
 * [element name] – The name of the thing being targeted, such as the background or border.
 * [checked state] – Whether the thing is checked. We assume things are unchecked by default, so no need to specify the unchecked state.
 * (We used “checked” to refer to anything that is on, selected, toggled, highlighted, emphasized, etc.)
 * [hovered/pressed/disabled state] – One of these states, if applicable. Each of these states are mutually exclusive.
 * Pressed styles overwrite hovered styles, and disabled elements cannot be hovered or pressed.
 *
 * ## Base Slots
 *
 * A basic set of slots that provide many default body styles, such as text, subtext, disabled colors, and so on.
 * If a category doesn't provide the slot you're looking for, use one from this category.
 * For example, the placeholder text on a text input field has no corresponding slot in its category,
 * so you'd use the bodySubtextColor from this category.
 *
 * ## Invariants
 *
 * When color has meaning, we do not want to change the color much theme to theme. For example, we
 * will always want errors to be some shade of red, but we will need to tweak the exact shade so it's
 * legible depending on whether it's an inverted theme or not.
 * Invariant colors should almost never be changed by the theme, the defaults should suffice.
 *
 * ## Input Controls
 *
 * This category contains input components commonly used to denote state, including radio buttons,
 * check boxes, toggle switches, sliders, progress bars, and more.
 *
 * ## Buttons
 *
 * Buttons! And all the flavors thereof.
 *
 * ## Menus
 *
 * Any kind of popup menus uses this category.
 *
 * ## Lists
 *
 * Lists differ from menus in that they are designed to show infinite amounts of items, often scroll,
 * and have a large and complex interaction surface.
 * This category covers all kinds of lists, whether they're typical one-item-per-row lists (like DetailsList) or ones with a tiled layout.
 */
export interface ISemanticColors {
  /* ANY ADDITIONS/REMOVALS HERE MUST ALSO BE MADE TO \packages\office-ui-fabric-react\src\common\_semanticSlots.scss */

  //// Base slots

  /**
   * The default color for backgrounds.
   */
  bodyBackground: string;

  /**
   * The default color for text.
   */
  bodyText: string;

  /**
   * The default hover color for the backgrounds of interactable elements that don't have their own backgrounds.
   * e.g. if links had hover backgrounds, they'd use this
   */
  bodyBackgroundHovered: string;

  /**
   * The default background color of selected interactable elements that don't have their own backgrounds.
   * e.g. indicates in the nav which page you're currently on
   */
  bodyBackgroundChecked: string;

  /**
   * Checked text color, e.g. selected menu item text.
   */
  bodyTextChecked: string;

  /**
   * De-emphasized text; e.g. metadata, captions, placeholder text.
   */
  bodySubtext: string;

  /**
   * Divider lines; e.g. lines that separate sections in a menu, an <HR> element.
   */
  bodyDivider: string;

  /**
   * The default color for backgrounds of disabled controls; e.g. disabled text field.
   */
  disabledBackground: string;

  /**
   * The default color for disabled text on top of disabledBackground; e.g. text in a disabled text field, disabled button text.
   */
  disabledText: string;

  /**
   * The default color for disabled text on the default background (bodyBackground).
   */
  disabledBodyText: string;

  /**
   * Disabled de-emphasized text, for use on disabledBackground.
   */
  disabledSubtext: string;

  /**
   * The color of the outline around focused controls that don't already have a border; e.g. menu items
   */
  focusBorder: string;

  //// Invariants - slots that rarely change color theme-to-theme because the color has meaning

  /**
   * The default color of error text, used on bodyBackground.
   */
  errorText: string;
  /**
   * The color of text on errorBackground, warningBackground, blockingBackground, or successBackground.
   */
  warningText: string;
  /**
   * The background for errors, if necessary, or highlighting the section of the page where the error is present.
   */
  errorBackground: string;
  /**
   * Background for blocking issues, which is more severe than a warning, but not as bad as an error.
   */
  blockingBackground: string;
  /**
   * Background for warning messages.
   */
  warningBackground: string;
  /**
   * Foreground color for warning highlights
   */
  warningHighlight: string;
  /**
   * Background for success
   */
  successBackground: string;

  //// Input controls slots (text fields, checkboxes, radios...)

  /**
   * The border of a large input control in its resting, state; e.g. the box of dropdown.
   */
  inputBorder: string;

  /** The border of a small input control in its resting unchecked state; e.g. the box of an unchecked checkbox.
  *
  */
  smallInputBorder: string;

  /**
   * The border color of a large hovered input control, such as textbox.
   */
  inputBorderHovered: string;

  /**
   * The background color of an input, e.g. textbox background.
   */
  inputBackground: string;

  /**
   * The background of a checked control; e.g. checked radio button's dot, checked toggle's background.
   */
  inputBackgroundChecked: string;

  /**
   * The background of a checked and hovered control; e.g. checked checkbox's background color on hover.
   */
  inputBackgroundCheckedHovered: string;

  /**
   * The foreground of a checked control; e.g. checked checkbox's checkmark color, checked toggle's thumb color,
   * radio button's background color around the dot.
   */
  inputForegroundChecked: string;

  /**
   * The alternate focus border color for elements that already have a border; e.g. text field borders on focus.
   */
  inputFocusBorderAlt: string;

  /**
   * The color of placeholder text.
   */
  inputPlaceholderText: string;

  //// Buttons

  /**
   * Background of a standard button
   */
  buttonBackground: string;
  /**
   * Background of a hovered standard button
   */
  buttonBackgroundHovered: string;
  /**
   * Background of a checked standard button; e.g. bold/italicize/underline text button in toolbar
   */
  buttonBackgroundChecked: string;
  /**
   * Background of a checked and hovered standard button; e.g. bold/italicize/underline text button in toolbar
   */
  buttonBackgroundCheckedHovered: string;

  /**
   * Border of a standard button
   */
  buttonBorder: string;

  /**
   * Color of text in a standard button
   */
  buttonText: string;
  /**
   * Color of text in a hovered standard button
   */
  buttonTextHovered: string;
  /**
   * Color of text in a checked standard button
   */
  buttonTextChecked: string;
  /**
   * Color of text in a checked and hovered standard button
   */
  buttonTextCheckedHovered: string;

  //// Menus, popups, etc

  /**
   * The background of a hovered menu item.
   */
  menuItemBackgroundHovered: string;

  /**
   * @deprecated
   * The background of checked menu item; e.g. a menu item whose submenu is open, a selected dropdown item.
   */
  menuItemBackgroundChecked: string;

  /**
   * The default colors of icons in menus.
   */
  menuIcon: string;

  /**
   * The headers in menus that denote title of a section.
   */
  menuHeader: string;

  //// Lists

  /**
   * The background color for the entire list.
   */
  listBackground: string;

  /**
   * The default text color for list item titles and text in column fields.
   */
  listText: string;

  /**
   * The background color of a hovered list item.
   */
  listItemBackgroundHovered: string;

  /**
   * The background color of a checked list item.
   */
  listItemBackgroundChecked: string;

  /**
   * The background color of a checked and hovered list item.
   */
  listItemBackgroundCheckedHovered: string;

  /**
   * The color of a link.
   */
  link: string;

  /**
   * The color of a hovered link. Also used when the link is active.
   */
  linkHovered: string;

  //// DEPRECATED SLOTS
  // Do not use these slots, they are only maintained for backwards compatibility.

  /** DEPRECATED use listText instead */
  listTextColor: string;
}