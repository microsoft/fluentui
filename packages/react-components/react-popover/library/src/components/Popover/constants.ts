/**
 * The default value of the tooltip's border radius (borderRadiusMedium).
 *
 * Unfortunately, Popper requires it to be specified as a variable instead of using CSS.
 * While we could use getComputedStyle, that adds a performance penalty for something that
 * will likely never change.
 *
 * @internal
 */
export const popoverSurfaceBorderRadius = 4;

export const nonInteractiveContentWarning =
  'Non-modal Popover with non-interactive content may not be announced by screen readers because focus remains on the trigger. Consider using Tooltip for informational content, or make the Popover content focusable if user interaction is expected.';
