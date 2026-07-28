/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * MessageBarGroup declares NO styles — its Griffel hook only ran `mergeClasses` over the
 * static class name and the consumer className — so this conversion emits no
 * `MessageBarGroup.module.css`. `mergeClasses` is still replaced by `clsx` so that no file
 * in the package imports `@griffel/react` and the dependency can be dropped
 * (CONVERSION_GUIDE.md §4).
 *
 * There is no `'use client'` directive to preserve here: the original file had none.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarGroupSlots, MessageBarGroupState } from './MessageBarGroup.types';

export const messageBarGroupClassNames: SlotClassNames<MessageBarGroupSlots> = {
  root: 'fui-MessageBarGroup',
};

/**
 * Apply styling to the MessageBarGroup slots based on the state
 */
export const useMessageBarGroupStyles_unstable = (state: MessageBarGroupState): MessageBarGroupState => {
  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token — the handle by which a descendant module can style itself from
  // this group's state (DECISIONS.md D15). MessageBarGroup has no module of its own, so the
  // marker is its only non-static class.
  state.root.className = clsx(messageBarGroupClassNames.root, 'group/fui-message-bar-group', state.root.className);
  return state;
};
