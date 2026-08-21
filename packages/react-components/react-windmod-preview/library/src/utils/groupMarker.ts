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
