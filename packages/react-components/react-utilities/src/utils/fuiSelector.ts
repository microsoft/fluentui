/**
 * Builds a valid CSS class selector from a Fluent identity class.
 *
 * A converted component's public identity class is its Tailwind named-group marker —
 * `group/fui-<component-kebab>` — which is what `<x>ClassNames.root` resolves to
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The `/` in that name is legal inside a class **token** but not inside a class **selector**,
 * where it terminates the name. So the otherwise obvious concatenation is an invalid selector
 * and throws, while the token-taking DOM APIs are unaffected:
 *
 * ```ts
 * el.classList.contains(buttonClassNames.root);            // fine — a token, not a selector
 * document.getElementsByClassName(buttonClassNames.root);  // fine — takes tokens
 *
 * document.querySelector('.' + buttonClassNames.root);     // SyntaxError
 * document.querySelector(fuiSelector(buttonClassNames.root)); // '.group\/fui-button' — matches
 * ```
 *
 * Use this at every selector site that consumes an identity class. It is the one migration
 * step the type system cannot force, because `'.' + x.root` still type-checks.
 *
 * @param identityClass - A single class token, e.g. `buttonClassNames.root`.
 * @returns A class selector for that token, with every `/` escaped.
 */
export function fuiSelector(identityClass: string): string {
  return '.' + identityClass.replace(/\//g, '\\/');
}
