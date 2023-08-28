import * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import type { DrawerProps, DrawerState } from './Drawer.types';
import { DrawerOverlay } from '../DrawerOverlay/DrawerOverlay';
import { DrawerInline } from '../DrawerInline/DrawerInline';

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
  const { type = 'overlay' } = props;

  const elementType = type === 'overlay' ? DrawerOverlay : DrawerInline;

  return {
    components: {
      root: elementType,
    },

    root: slot.always<DrawerProps>(
      slot.resolveShorthand({
        ref,
        ...props,
      }),
      {
        elementType,
      },
    ),
  };
};
