/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * MessageBarGroup declares NO styles — its Griffel hook only ran `mergeClasses` over the
 * static class name and the consumer className — so `mergeClasses` was replaced by `clsx`
 * only to keep `@griffel/react` out of the package (CONVERSION_GUIDE.md §4).
 * `MessageBarGroup.module.css` accordingly carries no styling: it exists for the single
 * identity-only `.root` local imported below, and its header explains both why that local is
 * needed and why it cannot be spelled as an empty rule.
 *
 * There is no `'use client'` directive to preserve here: the original file had none.
 */

import { clsx } from 'clsx';
import type { MessageBarGroupState } from './MessageBarGroup.types';

import styles from './MessageBarGroup.module.css';

/**
 * MessageBarGroup's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const messageBarGroupClassNames: { root: string } = {
  root: 'group/fui-message-bar-group',
};

/**
 * Apply styling to the MessageBarGroup slots based on the state
 */
export const useMessageBarGroupStyles_unstable = (state: MessageBarGroupState): MessageBarGroupState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). Order
  // carries no cascade meaning (the `@layer fui.*` order decides every tie, DECISIONS.md D2),
  // so the only thing position buys is the D15.1 invariant: the marker must never be
  // `classList[0]`, because nwsapi's `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` in `group/fui-message-bar-group` survives that
  // escaping into an invalid selector, throwing a render-time `AggregateError` under jsdom.
  //
  // MessageBarGroup's root is one of the six "Class B" slots (D16.2): it carries the marker
  // but has NO unconditional module class of its own, so before D16 the `fui-MessageBarGroup`
  // static was the only thing holding index 0. `styles.root` — the identity-only local minted
  // for exactly this purpose — is what keeps the invariant satisfied now that the static is
  // gone. Do not reorder, and do not delete that local because it looks empty.
  //
  // The marker itself is a literal, unhashed, GLOBAL token, written literally here rather than
  // read back out of `messageBarGroupClassNames` — the handle by which a descendant module can
  // style itself from this group's state (DECISIONS.md D15).
  state.root.className = clsx(styles.root, messageBarGroupClassNames.root, state.root.className);
  return state;
};
