import { clsx } from 'clsx';

import type { InlineDrawerState } from './InlineDrawer.types';
import { setDrawerBaseDataAttributes } from '../../shared/useDrawerBaseStyles.styles';

import styles from './InlineDrawer.module.css';

/**
 * InlineDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
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
