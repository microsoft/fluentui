'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): unlike the Badge and PresenceBadge
 * styles hooks, this file needs NO `enforce-use-client` suppression and KEEPS its
 * `react-hooks/immutability` disables — it still calls a React hook
 * (`useBadgeStyles_unstable`), so both rules still apply to it exactly as before. The
 * other two hooks call nothing after conversion, which is why their directives are
 * suppressed and their mutation disables are gone. Same split as react-button, where
 * Button lost both and ToggleButton (which still delegates) kept them.
 */

import { clsx } from 'clsx';
import { useBadgeStyles_unstable } from '../Badge/useBadgeStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BadgeSlots } from '../Badge/Badge.types';
import type { CounterBadgeState } from './CounterBadge.types';

import styles from './CounterBadge.module.css';

export const counterBadgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-CounterBadge',
  icon: 'fui-CounterBadge__icon',
};

/**
 * Applies style classnames to slots
 */
export const useCounterBadgeStyles_unstable = (state: CounterBadgeState): CounterBadgeState => {
  // Static `fui-*` class first (conformance contract), consumer className last.
  //
  // This composition is deliberately unchanged: these classes are set BEFORE delegating to
  // `useBadgeStyles_unstable`, which prepends its own and carries this whole string through
  // as its trailing argument — so the consumer's className stays last overall. The two
  // slices below live in `@layer fui.components.l2` precisely so they keep beating Badge's
  // l1 rules without depending on that ordering; see CounterBadge.module.css.
  //
  // No data attributes are needed here: `dot`/`hide` are plain boolean branches with no
  // descendant selectors, and Badge's own hook stamps `data-size` / `data-icon-position` /
  // `data-empty` on this same root when it runs.
  //
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    counterBadgeClassNames.root,
    state.dot && styles.dot,
    !state.root.children && !state.dot && styles.hide,
    state.root.className,
  );

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(counterBadgeClassNames.icon, state.icon.className);
  }

  return useBadgeStyles_unstable(state) as CounterBadgeState;
};
