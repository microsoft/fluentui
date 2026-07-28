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
  // Identity-only module class FIRST, then the static `fui-*` class (conformance contract),
  // then the named group marker — the marker must never be `classList[0]` (nwsapi's `:scope`
  // polyfill throws on it under jsdom; DECISIONS.md D15.1) — with the consumer className
  // last. The marker is a literal, unhashed, GLOBAL token — the only handle by which another
  // module can style an element from this CounterBadge's state, because the module classes
  // are hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // `styles.root` carries no declarations; it exists so this root always emits a hashed,
  // selector-safe token ahead of the markers. It is needed because BOTH of this hook's own
  // slices are conditional — the default render (children, not a dot) emits neither — so
  // nothing else here is guaranteed to be present. Badge's delegation below does prepend its
  // own unconditional classes, but relying on that would make this root's D15.1 safety a
  // property of another component's hook. See CounterBadge.module.css for why the local
  // carries an inert custom property rather than an empty body (statics-removal design §4b).
  //
  // This root ends up carrying TWO markers, `group/fui-badge` and `group/fui-counter-badge`,
  // exactly as it already carries both `fui-Badge` and `fui-CounterBadge`: the delegation
  // below prepends Badge's whole composition to this same element. That is the intended
  // shape — a rule written against `group/fui-badge` should match a CounterBadge, since a
  // CounterBadge IS one, and `group/fui-counter-badge` narrows to this subtype.
  //
  // This composition is otherwise deliberately unchanged: these classes are set BEFORE
  // delegating to `useBadgeStyles_unstable`, which prepends its own and carries this whole
  // string through as its trailing argument — so the consumer's className stays last
  // overall. The two slices below live in `@layer fui.components.l2` precisely so they keep
  // beating Badge's l1 rules without depending on that ordering; see CounterBadge.module.css.
  //
  // No data attributes are needed here: `dot`/`hide` are plain boolean branches with no
  // descendant selectors, and Badge's own hook stamps `data-size` / `data-icon-position` /
  // `data-empty` on this same root when it runs.
  //
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    styles.root,
    counterBadgeClassNames.root,
    'group/fui-counter-badge',
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
