/**
 * Returns a component's pair of public identity classes, in the fixed order `fui-<name>
 * group/fui-<name>`. `fui-<name>` must be first: jsdom's nwsapi builds its `:scope` polyfill
 * (and therefore `:has()`) from `element.classList[0]` run through the unescaped global
 * `escape()`, which mishandles `/` and throws — putting the slash-free class first guarantees
 * `classList[0]` is never the `/`-bearing one. `group/<name>` is Tailwind's real named-group
 * class, unchanged, so a consumer can target a component's children with `group-<variant>/fui-
 * <name>` with no configuration of their own.
 */
export function componentMarkers(name: string): string {
  return `fui-${name} group/fui-${name}`;
}

/**
 * Returns a component's sibling marker class, `peer/fui-<name>` — the sibling analogue of
 * componentMarkers' named group, for a slot whose own state has to reach following siblings
 * (a hidden input drives the indicator and the label, because the checked state lives on the
 * input and not on the root). It must never be first in a class list: see componentMarkers
 * for why a `/`-bearing classList[0] breaks jsdom.
 */
export function peerMarker(name: string): string {
  return `peer/fui-${name}`;
}
