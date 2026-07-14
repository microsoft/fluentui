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
