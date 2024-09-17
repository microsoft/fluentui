import * as React from 'react';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import { type DrawerMotionParams, InlineDrawerMotion } from '../../shared/drawerMotions';
import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type { InlineDrawerProps, InlineDrawerState, SurfaceMotionSlotProps } from './InlineDrawer.types';

const STATIC_MOTION = {
  active: true,
  canRender: true,
  ref: React.createRef<HTMLDivElement>(),
  type: 'idle' as const,
};

/**
 * Create the state required to render InlineDrawer.
 *
 * The returned state can be modified with hooks such as useInlineDrawerStyles_unstable,
 * before being passed to renderInlineDrawer_unstable.
 *
 * @param props - props from this instance of InlineDrawer
 * @param ref - reference to root HTMLElement of InlineDrawer
 */
export const useInlineDrawer_unstable = (props: InlineDrawerProps, ref: React.Ref<HTMLElement>): InlineDrawerState => {
  const { size, position, open } = useDrawerDefaultProps(props);
  const { separator = false, surfaceMotion } = props;
  const { dir } = useFluent();

  const state: InlineDrawerState = {
    components: {
      root: 'div',
      // casting from internal type that has required properties
      // to external type that only has optional properties
      // converting to unknown first as both Function component signatures are not compatible
      surfaceMotion: InlineDrawerMotion as unknown as React.FC<SurfaceMotionSlotProps>,
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        ref,
      }),
      { elementType: 'div' },
    ),

    open,
    position,
    size,
    separator,
    surfaceMotion: presenceMotionSlot<DrawerMotionParams>(surfaceMotion, {
      elementType: InlineDrawerMotion,
      defaultProps: {
        position,
        size,
        dir,
        visible: open,
        unmountOnExit: true,
      },
    }),

    // Deprecated props
    motion: STATIC_MOTION,
  };

  return state;
};
