import * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import type { DrawerProps, DrawerState } from './Drawer.types';
import { OverlayDrawer } from '../OverlayDrawer';
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
  const elementType = props.type === 'inline' ? InlineDrawer : OverlayDrawer;

  return {
    components: {
      root: elementType as typeof InlineDrawer,
      // @ts-expect-error This slot should not appear here
      surfaceMotion: null,
      // @ts-expect-error This slot should not appear here
      backdropMotion: null,
    },

    root: slot.always(
      {
        ref,
        ...props,
      },
      {
        elementType: elementType as typeof InlineDrawer,
      },
    ) as InlineDrawerProps,
  };
};
