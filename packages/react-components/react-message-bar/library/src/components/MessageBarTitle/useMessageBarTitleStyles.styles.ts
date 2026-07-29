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
import type { MessageBarTitleState } from './MessageBarTitle.types';

import styles from './MessageBarTitle.module.css';

/**
 * MessageBarTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. See `messageBarClassNames` in
 * `../MessageBar/useMessageBarStyles.styles.ts` for the full rationale, including why this is
 * not tagged `@deprecated`. In short: the `fui-MessageBarTitle` BEM static is gone (D16.1),
 * the type narrowed to `{ root: string }` so per-slot reads are compile errors, and the value
 * is a class TOKEN — use `fuiSelector(messageBarTitleClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it.
 */
export const messageBarTitleClassNames: { root: string } = {
  root: 'group/fui-message-bar-title',
};

/**
 * Apply styling to the MessageBarTitle slots based on the state
 */
export const useMessageBarTitleStyles_unstable = (state: MessageBarTitleState): MessageBarTitleState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-message-bar-title` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-MessageBarTitle` static held that position; `styles.root` holds it now.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `messageBarTitleClassNames` — and is the only handle by which another module, in
  // this package or any other, can style an element from this title's state, because
  // `styles.root` is hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // The component has a single unconditional slice, so it needs no data-attributes — see
  // MessageBarTitle.module.css for the mapping back to the mergeClasses() argument order.
  state.root.className = clsx(styles.root, 'group/fui-message-bar-title', state.root.className);

  return state;
};
