/**
 * Whether the CSS path can position surfaces in this window. Checks `position-area` rather than
 * `anchor-name`: Chromium 125–128 support `anchor-name` but only shipped `position-area` in 129.
 */
export function supportsCssAnchorPositioning(win: (Window & typeof globalThis) | null | undefined): boolean {
  return typeof win?.CSS?.supports === 'function' && win.CSS.supports('position-area', 'bottom');
}
