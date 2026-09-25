'use client';

import { usePopover as usePopoverBase } from '@fluentui/react-headless-components-preview/popover';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Fade } from '@fluentui/react-motion-components-preview';
import type { PopoverProps, PopoverState } from './Popover.types';

export { usePopoverContextValues } from '@fluentui/react-headless-components-preview/popover';

/** Create the state required to render Popover. */
export const usePopover = (props: PopoverProps): PopoverState => {
  const { appearance, size = 'medium', surfaceMotion, ...rest } = props;
  const state = usePopoverBase(rest);

  return {
    ...state,
    appearance,
    components: {
      surfaceMotion: Fade,
    },
    size,
    surfaceMotion: presenceMotionSlot(surfaceMotion, {
      elementType: Fade,
      defaultProps: {
        appear: true,
        unmountOnExit: true,
        visible: state.open,
      },
    }),
  };
};
