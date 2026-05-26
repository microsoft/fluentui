'use client';

import type * as React from 'react';
import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerBody } from '../../Drawer/DrawerBody';

/**
 * Create the state required to render NavDrawerBody.
 *
 * Arrow-key navigation is enabled by default via the native `focusgroup` attribute
 * with the `toolbar` behavior (vertical, wraps at ends). `toolbar` was chosen over
 * `block wrap` alone because the scoped-focusgroup spec requires an explicit
 * `<behavior>` token (see https://open-ui.org/components/scoped-focusgroup.explainer/#supported-behaviors).
 *
 * Since `toolbar` implies `role="toolbar"`, we override the role back to
 * `navigation` to preserve the landmark semantics expected of a nav drawer.
 */
export const useNavDrawerBody = (props: NavDrawerBodyProps, ref: React.Ref<HTMLElement>): NavDrawerBodyState => {
  const state: NavDrawerBodyState = useDrawerBody(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgroup = 'toolbar block wrap';

  //  Since `toolbar` implies `role="toolbar"`, we override the role back to
  // `navigation` to preserve the landmark semantics expected of a nav drawer.

  // eslint-disable-next-line react-hooks/immutability
  state.root.role = 'navigation';

  return state;
};
