import { clsx } from 'clsx';

import type { InlineDrawerState } from './InlineDrawer.types';
import { setDrawerBaseDataAttributes } from '../../shared/useDrawerBaseStyles.styles';

import styles from './InlineDrawer.module.css';

/**
 * InlineDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<Omit<InlineDrawerSlots, 'surfaceMotion'>>` to
 * `{ root: string }`, and the value is no longer the `fui-InlineDrawer` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + inlineDrawerClassNames.root` is invalid CSS.
 * Use `fuiSelector(inlineDrawerClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const inlineDrawerClassNames: { root: string } = {
  root: 'group/fui-inline-drawer',
};

/**
 * Apply styling to the InlineDrawer slots based on the state
 */
export const useInlineDrawerStyles_unstable = (state: InlineDrawerState): InlineDrawerState => {
  // `position` and `size` drive `:where([data-position=…])` / `@variant size-…` rules in
  // InlineDrawer.module.css. They replace the `useDrawerBaseClassNames` lookup AND the two
  // `switch (state.position)` helpers this file used to carry (`getSeparatorClass` /
  // `getAnimationExitClass`): the position branch is now expressed once, in CSS, so
  // `separator` and `animationDirection` reduce to two flat conditional classes.
  setDrawerBaseDataAttributes(state);

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])`, and the `/` in `group/fui-inline-drawer` survives that
  // escaping into an invalid selector, throwing a render-time `AggregateError` under jsdom
  // (DECISIONS.md D15.1). Before D16 the `fui-InlineDrawer` static held that position;
  // `styles.root` holds it now. Neither `styles.separator` nor `styles['animation-exit']`
  // could: both are conditional, and `clsx` drops a falsy argument entirely.
  //
  // Cascade priority is decided by the `@layer fui.*` order in InlineDrawer.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(
    styles.root,
    inlineDrawerClassNames.root,
    state.separator && styles.separator,
    state.animationDirection === 'exit' && styles['animation-exit'],
    state.root.className,
  );

  return state;
};
