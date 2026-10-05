/**
 * Whether the browser supports CSS anchor positioning. It's evaluated every time (it's cheap) to be able to stub it in tests.
 */
export function supportsAnchorPositioning(): boolean {
  return (
    typeof CSS !== 'undefined' &&
    !!CSS.supports &&
    CSS.supports('anchor-name: --a') &&
    CSS.supports('position-area: top')
  );
}
