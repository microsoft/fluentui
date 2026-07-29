import { clsx } from 'clsx';

import type { SplitNavItemState } from './SplitNavItem.types';

import styles from './SplitNavItem.module.css';

/**
 * SplitNavItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<SplitNavItemSlots>` to `{ root: string }` — the
 * `navItem`, `actionButton`, `toggleButton`, `menuButton` and the three `*Tooltip` keys are
 * gone (D16.5) — and the value is no longer the `fui-SplitNavItem` BEM static (D16.1).
 *
 * The marker is ALSO what the three button slots read their show/hide state from:
 * `SplitNavItem.module.css`'s `.hover-action` composes `group-hover/fui-split-nav-item` and
 * `group-focus-within/fui-split-nav-item`, replacing the `& .fui-SplitNavItem__*Button`
 * descendant selectors the statics used to key (D16.3, mechanism M2).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + splitNavItemClassNames.root` is invalid CSS.
 * Use `fuiSelector(splitNavItemClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const splitNavItemClassNames: { root: string } = {
  root: 'group/fui-split-nav-item',
};

/**
 * Apply styling to the SplitNavItem slots based on the state
 */
export const useSplitNavItemStyles_unstable = (state: SplitNavItemState): SplitNavItemState => {
  const isMediumDensity = state.density === 'medium';

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector, throwing a render-time
  // `AggregateError` (D15.1). Before D16 the `fui-SplitNavItem` static held that position.
  //
  // Cascade priority is decided by the `@layer fui.*` order in SplitNavItem.module.css, not
  // by the order of these arguments.
  state.root.className = clsx(styles.root, 'group/fui-split-nav-item', state.root.className);

  if (state.navItem) {
    state.navItem.className = clsx(styles['nav-item'], state.navItem.className);
  }

  // The three button slots are react-button roots this hook RENDERS, so it holds their slot
  // objects and D16.3's M2 applies: the class it composes here is what the module's
  // `group-*/fui-split-nav-item` variants attach to, replacing the
  // `& .fui-SplitNavItem__actionButton, …` descendant selectors the statics used to key.
  if (state.actionButton) {
    state.actionButton.className = clsx(
      styles.secondary,
      styles['hover-action'],
      isMediumDensity && styles.medium,
      state.actionButton.className,
    );
  }

  if (state.toggleButton) {
    state.toggleButton.className = clsx(
      styles.secondary,
      styles['hover-action'],
      isMediumDensity && styles.medium,
      state.toggleButton.className,
    );
  }

  if (state.menuButton) {
    state.menuButton.className = clsx(
      styles.secondary,
      styles['hover-action'],
      isMediumDensity && styles.medium,
      state.menuButton.className,
    );
  }

  return state;
};
