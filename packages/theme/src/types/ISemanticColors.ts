/* eslint-disable @typescript-eslint/naming-convention */
import type { ISemanticTextColors } from './ISemanticTextColors';

// WARNING: The comment below must use valid markdown, or it will break the website.
// Headings must start at h4 to be appropriate for the website.
/**
 * The collection of all semantic slots for colors used in themes.
 *
 * Note: text colors are defined in ISemanticTextColors.ts.
 * We plan to move completely to semantic slots and replace all usage of Fabric palette slots.
 * We've been actively making some of these changes but still have a ways to go. At present,
 * we're only adding slots if absolutely necessary because we are trying to avoid bloating
 * the already sizeable offering. We're also working on a better solution for design tokens
 * overall in our next iteration. We'll provide an update on this site when that's ready.
 * Thank you for your patience.
 *
 * #### Naming Convention
 *
 * The name of a semantic slot can quickly tell you how it’s meant to be used. It generally follows this format:
 *
 * `[category name][element name][Checked][Hovered/Pressed/Disabled state]`
 *
 * * `[category name]` – The “family” that this slot belongs to.
 * * `[element name]` – The name of the thing being targeted, such as the background or border.
 * * `[Checked]` – Whether the thing is checked. We assume things are unchecked by default, so no need to specify the
 * unchecked state. (“Checked” refers to anything that is on, selected, toggled, highlighted, emphasized, etc.)
 * * `[Hovered/Pressed/Disabled state]` – One of these states, if applicable. Each of these states are mutually
 * exclusive. Pressed styles overwrite hovered styles, and disabled elements cannot be hovered or pressed.
 *
 * #### Base Slots
 *
 * A basic set of slots that provide many default body styles, such as text, subtext, disabled colors, and so on.
 * If a category doesn't provide the slot you're looking for, use one from this category.
 * For example, the placeholder text on a text input field has no corresponding slot in its category,
 * so you'd use the bodySubtextColor from this category.
 *
 * #### Invariants
 *
 * When color has meaning, we do not want to change the color much theme to theme. For example, we
 * will always want errors to be some shade of red, but we will need to tweak the exact shade so it's
 * legible depending on whether it's an inverted theme or not.
 * Invariant colors should almost never be changed by the theme, the defaults should suffice.
 *
 * #### Input Controls
 *
 * This category contains input components commonly used to denote state, including radio buttons,
 * check boxes, toggle switches, sliders, progress bars, and more.
 *
 * #### Buttons
 *
 * Buttons! And all the flavors thereof.
 *
 * #### Menus
 *
 * Any kind of popup menus uses this category.
 *
 * #### Lists
 *
 * Lists differ from menus in that they are designed to show infinite amounts of items, often scroll,
 * and have a large and complex interaction surface.
 * This category covers all kinds of lists, whether they're typical one-item-per-row lists (like DetailsList)
 * or ones with a tiled layout.
 *
 * {@docCategory ISemanticColors}
 */
export interface ISemanticColors extends ISemanticTextColors {
  /*
   * !!!!!!!!
   * FOR ANY ADDITIONS/REMOVALS HERE YOU MUST ALSO RUN `yarn update-sass-theme-files` in packages/common-styles
   * to ensure that semantic slots scss variables are updated
   * !!!!!!!!
   */

  //// Base slots

  /**
   * The default color for backgrounds.
   */
  bodyBackground: string;

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
   * The standout color for highlighted content backgrounds.
   * For highlighted content when there is no emphasis, use the neutral variant instead.
   * This should be a shade darker than bodyBackground in light themes, and a shade lighter in inverted themes.
   */
  bodyStandoutBackground: string;

  /**
   * The color for chrome adjacent to an area with bodyBackground.
   * This can be used to provide visual separation of zones when using stronger colors, when using a divider line
   * is not desired.
   * In most themes, this should match the color of bodyBackground.
   * See also: bodyFrameDivider
   */
  bodyFrameBackground: string;

  /**
   * Used as the border between a zone with bodyFrameBackground and a zone with bodyBackground.
   * If bodyBackground and bodyFrameBackground are different, this should be the same color as bodyFrameBackground
   * in order to visually disappear.
   * See also: bodyFrameBackground
   */
  bodyFrameDivider: string;

  /**
   * Divider lines; e.g. lines that separate sections in a menu, an <HR> element.
   */
  bodyDivider: string;

  /**
   * The default color for backgrounds of disabled controls; e.g. disabled text field.
   */
  disabledBackground: string;

  /**
   * The default color for border of disabled controls; e.g. disabled slider, disabled toggle border.
   */
  disabledBorder: string;

  /**
   * The color of the outline around focused controls that don't already have a border; e.g. menu items
   */
  focusBorder: string;

  /**
   * The background color of a card (or other surface) on a standout background.
   * Cards usually have shadows, but the variantBorder slots can be used for a solid border.
   * e.g. cards on a carousel of highlighted articles
   */
  cardStandoutBackground: string;

  /**
   * The default box-shadow for a card. In inverted themes, by default, this is set to `none` since shadows do not work
   * well on dark backgrounds. If the card could be the same color as the background, it is recommended that
   * `variantBorder` is used instead, so the card doesn't disappear in inverted themes.
   * For use with `box-shadow`.
   */
  cardShadow: string;

  /**
   * The default box-shadow when hovering on a card. Generally, this is a deeper shadow than `cardShadow`, to give
   * the effect that the card is lifting off the page.
   * In inverted themes, this should be set to a box-shadow that looks like a solid border, because shadows are not
   * visible on dark themes.
   * For use with `box-shadow`.
   */
  cardShadowHovered: string;

  /**
   * The color of the border that provides contrast between an element, such as a card, and a standout background.
   */
  variantBorder: string;

  /**
   * Hover color of border that provides contrast between an element, such as a card, and a standout background.
   */
  variantBorderHovered: string;

  /**
   * Background color for default/empty state graphical elements; eg default icons, empty section that
   * needs user to fill in content, placeholder graphics, empty seats, etc.
   */
  defaultStateBackground: string;

  //// Invariants - slots that rarely change color theme-to-theme because the color has meaning
  /**
   * Background for informational messages.
   */
  infoBackground: string;
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
   * Background for severe warning messages.
   */
  severeWarningBackground: string;
  /**
   * Background for success
   */
  successBackground: string;
  /**
   * Color for icons on infoBackground.
   */
  infoIcon: string;
  /**
   * Color for icons on errorBackground.
   */
  errorIcon: string;
  /**
   * Color for icons on blockingBackground.
   */
  blockingIcon: string;
  /**
   * Color for icons on warningBackground.
   */
  warningIcon: string;
  /**
   * Color for icons on severeWarningBackground.
   */
  severeWarningIcon: string;
  /**
   * Color for icons on successBackground.
   */
  successIcon: string;
  /**
   * Color of links within a message.
   */
  messageLink: string;
  /**
   * Color of links within a message when hovered.
   */
  messageLinkHovered: string;

  //// Input controls slots (text fields, checkboxes, radios...)

  /**
   * The border of a large input control in its resting, state; e.g. the box of dropdown.
   */
  inputBorder: string;

  /**
   * The border of a small input control in its resting unchecked state; e.g. the box of an unchecked checkbox.
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
   * The placeholder background color of a checked control, e.g. slider background, spinner background.
   */
  inputPlaceholderBackgroundChecked: string;

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
   * The color for disabled icon ; e.g. SearchBox magnifying glass in disabled state.
   */
  inputIconDisabled: string;

  /**
   * The color for icon ; e.g. SearchBox magnifying glass in rest state.
   */
  inputIcon: string;

  /**
   * The color for hovered icon ; e.g. SearchBox magnifying glass in hovered state.
   */
  inputIconHovered: string;

  //// Buttons

  /**
   * Background of a standard button
   */
  buttonBackground: string;

  /**
   * Background of a checked standard button; e.g. bold/italicize/underline text button in toolbar
   */
  buttonBackgroundChecked: string;

  /**
   * Background of a hovered standard button
   */
  buttonBackgroundHovered: string;

  /**
   * Background of a checked and hovered standard button; e.g. bold/italicize/underline text button in toolbar
   */
  buttonBackgroundCheckedHovered: string;

  /**
   * Background of a disabled standard button
   */
  buttonBackgroundDisabled: string;

  /**
   * Background of a pressed standard button; i.e. currently being clicked by mouse
   */
  buttonBackgroundPressed: string;

  /**
   * Border of a standard button
   */
  buttonBorder: string;

  /**
   * Border of a disabled standard button
   */
  buttonBorderDisabled: string;

  /**
   * Background of a primary button
   */
  primaryButtonBackground: string;

  /**
   * Background of a hovered primary button
   */
  primaryButtonBackgroundHovered: string;

  /**
   * Background of a pressed primary button; i.e. currently being clicked by mouse
   */
  primaryButtonBackgroundPressed: string;

  /**
   * Background of a disabled primary button
   */
  primaryButtonBackgroundDisabled: string;

  /**
   * Border of a primary button
   */
  primaryButtonBorder: string;

  /**
   * Background of an accent button (kicker)
   */
  accentButtonBackground: string;

  //// Menus, popups, etc

  /**
   * The background of a menu.
   */
  menuBackground: string;

  /**
   * The divider between menu items.
   */
  menuDivider: string;

  /**
   * The default colors of icons in menus.
   */
  menuIcon: string;

  /**
   * The headers in menus that denote title of a section.
   */
  menuHeader: string;

  /**
   * The background of a hovered menu item.
   */
  menuItemBackgroundHovered: string;

  /**
   * The background of a pressed menu item.
   */
  menuItemBackgroundPressed: string;

  /**
   * The text color of a menu item.
   */
  menuItemText: string;

  /**
   * The text color of a hovered menu item.
   */
  menuItemTextHovered: string;

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
   * The background color for a hovered list header.
   */
  listHeaderBackgroundHovered: string;

  /**
   * The background color for a pressed list header.
   */
  listHeaderBackgroundPressed: string;

  //// DEPRECATED SLOTS
  // Do not use these slots, they are only maintained for backwards compatibility.

  /**
   * @deprecated
   * (Checked menu items no longer get a background color.)
   * The background of checked menu item; e.g. a menu item whose submenu is open, a selected dropdown item.
   */
  menuItemBackgroundChecked: string;

  /**
   * @deprecated
   * (no longer used)
   * Foreground color for warning highlights
   */
  warningHighlight: string;
}
