import type * as React from 'react';
import { clsx } from 'clsx';

import type { OverlayDrawerState } from './OverlayDrawer.types';
import { setDrawerBaseDataAttributes } from '../../shared/useDrawerBaseStyles.styles';

import styles from './OverlayDrawer.module.css';

/**
 * OverlayDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const overlayDrawerClassNames: { root: string } = {
  root: 'group/fui-overlay-drawer',
};

/**
 * Apply styling to the OverlayDrawer slots based on the state
 */
export const useOverlayDrawerStyles_unstable = (state: OverlayDrawerState): OverlayDrawerState => {
  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  // `position` and `size` drive `:where([data-position=…])` / `@variant size-…` rules in
  // OverlayDrawer.module.css, replacing the `useDrawerBaseClassNames` lookup and the
  // `rootStyles[state.position]` index. The root slot's element type is
  // `OverlayDrawerSurface`, not an intrinsic, but the attributes still reach the DOM:
  // `useDialogSurface_unstable` funnels `...props` through `getIntrinsicElementProps`, and
  // `getNativeElementProps` allows every `data-`-prefixed key through
  // (react-utilities/src/utils/properties.ts:476).
  setDrawerBaseDataAttributes(state);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    overlayDrawerClassNames.root,
    state.hasMountNodeElement && styles.absolute,
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (backdrop && state.hasMountNodeElement) {
    backdrop.className = clsx(styles['backdrop-absolute'], backdrop.className);
  }

  return state;
};
