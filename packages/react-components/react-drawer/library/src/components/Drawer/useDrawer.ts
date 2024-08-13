import * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import type { DrawerProps, DrawerState } from './Drawer.types';
import { OverlayDrawer, type OverlayDrawerProps } from '../OverlayDrawer';
import { InlineDrawer, type InlineDrawerProps } from '../InlineDrawer';

/**
 * Create the state required to render Drawer.
 *
 * The returned state can be modified with hooks such as useDrawerStyles_unstable,
 * before being passed to renderDrawer_unstable.
 *
 * @param props - props from this instance of Drawer
 * @param ref - reference to root HTMLElement of Drawer
 */
export const useDrawer_unstable = (props: DrawerProps, ref: React.Ref<HTMLElement>): DrawerState => {
  // casting here to convert a union of functions to a single function with the union of parameters
  const elementType = (props.type === 'inline' ? InlineDrawer : OverlayDrawer) as React.FC<
    InlineDrawerProps | OverlayDrawerProps
  >;
  const root: InlineDrawerProps | OverlayDrawerProps = slot.always({ ref, ...props }, { elementType });

  return {
    components: { root: elementType },
    root,
  };
};
