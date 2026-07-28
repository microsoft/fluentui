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
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarGroupSlots, MessageBarGroupState } from './MessageBarGroup.types';

import styles from './MessageBarGroup.module.css';

export const messageBarGroupClassNames: SlotClassNames<MessageBarGroupSlots> = {
  root: 'fui-MessageBarGroup',
};

/**
 * Apply styling to the MessageBarGroup slots based on the state
 */
export const useMessageBarGroupStyles_unstable = (state: MessageBarGroupState): MessageBarGroupState => {
  // ARGUMENT ORDER — `styles.root`, static, marker, consumer className. Order carries no
  // cascade meaning (the `@layer fui.*` order decides every tie, DECISIONS.md D2), so the
  // only thing position buys is the D15.1 invariant: the marker must never be `classList[0]`,
  // because nwsapi's `:scope` polyfill builds its anchor from `escape(element.classList[0])`
  // and the `/` in `group/fui-message-bar-group` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` under jsdom.
  //
  // MessageBarGroup's root is a "Class B" slot in the statics-removal design (§4b): it
  // carries the marker but had NO unconditional module class, so `fui-MessageBarGroup` was
  // the only thing holding index 0 — and that static is scheduled for removal. `styles.root`
  // is the token that keeps the invariant satisfied afterwards, and leading with it NOW
  // (statics still present, so this change is inert) makes that removal a pure deletion of
  // one argument. Do not reorder.
  //
  // The marker itself is a literal, unhashed, GLOBAL token — the handle by which a descendant
  // module can style itself from this group's state (DECISIONS.md D15).
  state.root.className = clsx(
    styles.root,
    messageBarGroupClassNames.root,
    'group/fui-message-bar-group',
    state.root.className,
  );
  return state;
};
