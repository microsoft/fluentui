'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarTitleSlots, MessageBarTitleState } from './MessageBarTitle.types';

import styles from './MessageBarTitle.module.css';

export const messageBarTitleClassNames: SlotClassNames<MessageBarTitleSlots> = {
  root: 'fui-MessageBarTitle',
};

/**
 * Apply styling to the MessageBarTitle slots based on the state
 */
export const useMessageBarTitleStyles_unstable = (state: MessageBarTitleState): MessageBarTitleState => {
  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this title's state, because `styles.root` is
  // hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // The component has a single unconditional slice, so it needs no data-attributes — see
  // MessageBarTitle.module.css for the mapping back to the mergeClasses() argument order.
  state.root.className = clsx(
    messageBarTitleClassNames.root,
    'group/fui-message-bar-title',
    styles.root,
    state.root.className,
  );

  return state;
};
