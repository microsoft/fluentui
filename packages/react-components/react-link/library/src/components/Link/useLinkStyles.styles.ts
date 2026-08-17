import { clsx } from 'clsx';
import type { LinkState } from './Link.types';

import styles from './Link.module.css';

/**
 * Public identity classes for Link.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-Link`, `fui-Link__*`)
 * are no longer rendered and the per-slot keys are gone; there is no public class-name
 * handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + linkClassNames.root` is an invalid selector even though
 * it type-checks. Use `fuiSelector(linkClassNames.root)` from `@fluentui/react-utilities`.
 */
export const linkClassNames: { root: string } = {
  root: 'group/fui-link',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type LinkRootDataAttributes = {
  'data-disabled'?: true;
  'data-inline'?: true;
};

export const useLinkStyles_unstable = (state: LinkState): LinkState => {
  const { appearance, disabled, inline, root, backgroundAppearance } = state;

  const rootWithData = state.root as LinkState['root'] & LinkRootDataAttributes;

  rootWithData['data-disabled'] = disabled || undefined;
  rootWithData['data-inline'] = inline || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    linkClassNames.root,
    root.as === 'a' && root.href && styles.href,
    root.as === 'button' && styles.button,
    appearance === 'subtle' && styles.subtle,
    backgroundAppearance && styles[backgroundAppearance],
    state.root.className,
  );

  return state;
};
