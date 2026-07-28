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
import type { MessageBarBodySlots, MessageBarBodyState } from './MessageBarBody.types';

import styles from './MessageBarBody.module.css';

export const messageBarBodyClassNames: SlotClassNames<MessageBarBodySlots> = {
  root: 'fui-MessageBarBody',
};

/**
 * Apply styling to the MessageBarBody slots based on the state
 */
export const useMessageBarBodyStyles_unstable = (state: MessageBarBodyState): MessageBarBodyState => {
  // Static `fui-*` class first (conformance contract), consumer className last.
  // The component has a single unconditional slice, so it needs no data-attributes — see
  // MessageBarBody.module.css for the mapping back to the mergeClasses() argument order.
  state.root.className = clsx(messageBarBodyClassNames.root, styles.root, state.root.className);

  return state;
};
