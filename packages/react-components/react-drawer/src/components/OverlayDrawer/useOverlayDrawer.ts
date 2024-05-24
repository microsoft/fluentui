import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useMotion } from '@fluentui/react-motion-preview';

import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type { OverlayDrawerProps, OverlayDrawerState } from './OverlayDrawer.types';
import { OverlayDrawerDialog } from './OverlayDrawerDialog';
import { OverlayDrawerSurface } from './OverlayDrawerSurface';

/**
 * Create the state required to render OverlayDrawer.
 *
 * The returned state can be modified with hooks such as useOverlayDrawerStyles_unstable,
 * before being passed to renderOverlayDrawer_unstable.
 *
 * @param props - props from this instance of OverlayDrawer
 * @param ref - reference to root HTMLDivElement of OverlayDrawer
 */
export const useOverlayDrawer_unstable = (
  props: OverlayDrawerProps,
  ref: React.Ref<HTMLDivElement>,
): OverlayDrawerState => {
  const { open, size, position } = useDrawerDefaultProps(props);
  const { modalType = 'modal', inertTrapFocus, onOpenChange } = props;

  const motion = useMotion<HTMLDivElement>(open);

  const backdropProps = slot.resolveShorthand(props.backdrop);
  const hasCustomBackdrop = modalType !== 'non-modal' && backdropProps !== null;

  const root = slot.always(
    {
      ...props,
      backdrop: hasCustomBackdrop ? { ...backdropProps } : null,
    },
    {
      elementType: OverlayDrawerSurface,
      defaultProps: {
        ref: useMergedRefs(ref, motion.ref),
      },
    },
  );

  const dialog = slot.always(
    {
      open,
      onOpenChange,
      inertTrapFocus,
      modalType,
      /**
       * children is not needed here because we construct the children in the render function,
       * but it's required by DialogProps
       */
      children: null as unknown as JSX.Element,
    },
    {
      elementType: OverlayDrawerDialog,
    },
  );

  return {
    components: {
      root: OverlayDrawerSurface,
      dialog: OverlayDrawerDialog,
    },

    root,
    dialog,

    size,
    position,
    motion,
  };
};
