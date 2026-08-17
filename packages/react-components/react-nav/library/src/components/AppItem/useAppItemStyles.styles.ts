import { clsx } from 'clsx';

import type { AppItemState } from './AppItem.types';

import styles from './AppItem.module.css';

/**
 * AppItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<AppItemSlots>` to `{ root: string }` — the `icon`
 * key is gone (D16.5) — and the value is no longer the `fui-AppItem` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + appItemClassNames.root` is invalid CSS. Use
 * `fuiSelector(appItemClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const appItemClassNames: { root: string } = {
  root: 'group/fui-app-item',
};

/**
 * Apply styling to the AppItem slots based on the state
 */
export const useAppItemStyles_unstable = (state: AppItemState): AppItemState => {
  const { density, icon } = state;

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` (D15.1). Before D16 the `fui-AppItem`
  // static held that position — it was mergeClasses argument #2, after the reset.
  //
  // `styles.root` is ONE class carrying both the reset (`fui.base`) and this component's own
  // slice (`fui.components.l1`); the two Griffel arguments collapsed because CSS Modules
  // exports one name per local and the layers keep them ordered.
  //
  // Cascade priority is decided by the `@layer fui.*` order in AppItem.module.css, not by the
  // order of these arguments.
  state.root.className = clsx(
    styles.root,
    appItemClassNames.root,
    density === 'small' && styles.small,
    !icon && styles['absent-icon'],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
