import { presenceMotionSlot, type PresenceMotionSlotProps } from '@fluentui/react-motion';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import { type DrawerMotionParams, InlineDrawerMotion } from '../../shared/drawerMotions';
import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type { InlineDrawerProps, InlineDrawerState } from './InlineDrawer.types';

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

  return {
    components: {
      root: 'div',
      // TODO: remove once React v18 slot API is modified
      // This is a problem at the moment due to UnknownSlotProps assumption
      // that `children` property is `ReactNode`, which in this case is not valid
      // as PresenceComponentProps['children'] is `ReactElement`
      surfaceMotion: InlineDrawerMotion as unknown as React.FC<PresenceMotionSlotProps<DrawerMotionParams>>,
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
        visible: open,
        unmountOnExit: true,
      },
    }),

    // Deprecated props
    motion: STATIC_MOTION,
  };
};
