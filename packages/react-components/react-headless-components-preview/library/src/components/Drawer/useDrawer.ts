import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import { InlineDrawer, type InlineDrawerProps } from './InlineDrawer';
import { OverlayDrawer, type OverlayDrawerProps } from './OverlayDrawer';
import type { DrawerProps, DrawerState } from './Drawer.types';

/**
 * Returns the state for a Drawer component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDrawer`.
 */
export const useDrawer = (props: DrawerProps, ref: React.Ref<HTMLElement>): DrawerState => {
  'use no memo';

  const { type, ...restProps } = props;
  const elementType = (type === 'inline' ? InlineDrawer : OverlayDrawer) as React.FC<
    InlineDrawerProps | OverlayDrawerProps
  >;
  const root: InlineDrawerProps | OverlayDrawerProps = slot.always({ ref, ...restProps }, { elementType });

  return {
    components: { root: elementType },
    root,
  };
};
