/* eslint-disable @typescript-eslint/naming-convention */

/**
 * {@docCategory ISemanticTextColors}
 */
export interface ISemanticTextColors {
  /*
   * !!!!!!!!
   * FOR ANY ADDITIONS/REMOVALS HERE YOU MUST ALSO RUN `yarn update-sass-theme-files` in packages/common-styles
   * to ensure that semantic slots scss variables are updated
   * !!!!!!!!
   */

  //// Base slots

  /**
   * The default color for text.
   */
  bodyText: string;

  /**
   * Checked text color, e.g. selected menu item text.
   */
  bodyTextChecked: string;

  /**
   * De-emphasized text; e.g. metadata, captions, placeholder text.
   */
  bodySubtext: string;

  /**
   * Neutral colored links and links for action buttons.
   */
  actionLink: string;

  /**
   * Hover state for neutral colored links and links for action buttons.
   */
  actionLinkHovered: string;

  /**
   * The color of a link.
   */
  link: string;

  /**
   * The color of a hovered link. Also used when the link is active.
   */
  linkHovered: string;

  /**
   * The default color for disabled text on top of disabledBackground; e.g. text in a disabled text field or
   * disabled button text.
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
   * Disabled de-emphasized text, for use on the default background (bodyBackground).
   */
  disabledBodySubtext: string;

  //// Invariants - slots that rarely change color theme-to-theme because the color has meaning
  /**
   * The default color of error text on bodyBackground.
   */
  errorText: string;

  /**
   * The default color of text in a message bar.
   */
  messageText: string;

  /**
   * The color of input text.
   */
  inputText: string;

  /**
   * The color of input text on hover.
   */
  inputTextHovered: string;

  /**
   * The color of placeholder text.
   */
  inputPlaceholderText: string;

  //// Buttons

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
  /**
   * Color of text in a pressed standard button; i.e. currently being clicked by mouse
   */
  buttonTextPressed: string;

  /**
   * Color of text in a disabled standard button
   */
  buttonTextDisabled: string;

  /**
   * Color of text in a primary button
   */
  primaryButtonText: string;
  /**
   * Color of text in a hovered primary button
   */
  primaryButtonTextHovered: string;
  /**
   * Color of text in a pressed primary button; i.e. currently being clicked by mouse
   */
  primaryButtonTextPressed: string;

  /**
   * Color of text in a disabled primary button
   */
  primaryButtonTextDisabled: string;

  /**
   * Color of text for accent button (kicker)
   */
  accentButtonText: string;

  //// Lists

  /**
   * The default text color for list item titles and text in column fields.
   */
  listText: string;

  //// DEPRECATED SLOTS
  // Do not use these slots, they are only maintained for backwards compatibility.

  /** @deprecated
   * This slot was incorrectly named. Use listText instead. */
  listTextColor: string;

  /** @deprecated
   * No longer used. Consider using messageText and/or warningIcon instead.
   */
  warningText: string;

  /** @deprecated
   * No longer used. Consider using messageText and/or successIcon instead.
   */
  successText: string;
}
