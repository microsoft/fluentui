/**
 * Test-only count of how many times one class token appears in a class attribute. Accepts a
 * rendered element, or a raw class string for a state object that never reaches the DOM.
 *
 * `classList` is an ordered set, so a duplicated token is only visible in the raw attribute — a
 * count is the only assertion that can see one. The jest css-module proxy compounds this: it drops
 * the component and hash segments, so a composed component's `root` and the `root` of the
 * component it composes are the same string, and the occurrence count is the only thing that
 * distinguishes them. The same proxy answers every key, so an assertion against a proxy value pins
 * the lookup key the stylesheet authors, not the existence of a class.
 */
export const classOccurrences = (source: Element | string, token: string): number =>
  (typeof source === 'string' ? source : (source.getAttribute('class') ?? ''))
    .split(/\s+/)
    .filter(candidate => candidate === token).length;
