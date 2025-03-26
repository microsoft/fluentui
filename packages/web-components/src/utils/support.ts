/**
 * Check if the browser supports CSS Anchor Positioning.
 * @public
 */
export const AnchorPositioningCSSSupported = CSS.supports('anchor-name: --a');

/**
 * Check if the browser supports HTML Anchor Positioning.
 * @public
 */
export const AnchorPositioningHTMLSupported = 'anchor' in HTMLElement.prototype;

/**
 * Check if the browser supports Custom States.
 * @public
 */
export const CustomStatesSetSupported = CSS.supports('selector(:state(g))');
