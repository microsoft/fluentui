import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { Dialog } from '@fluentui/react-dialog';
import { useMotion } from '@fluentui/react-motion-preview';

import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type { DrawerOverlayProps, DrawerOverlayState } from './DrawerOverlay.types';
import { DrawerOverlaySurface } from '../DrawerOverlaySurface/DrawerOverlaySurface';

/**
 * Create the state required to render DrawerOverlay.
 *
 * The returned state can be modified with hooks such as useDrawerOverlayStyles_unstable,
 * before being passed to renderDrawerOverlay_unstable.
 *
 * @param props - props from this instance of DrawerOverlay
 * @param ref - reference to root HTMLDivElement of DrawerOverlay
 */
export const useDrawerOverlay_unstable = (
  props: DrawerOverlayProps,
  ref: React.Ref<HTMLDivElement>,
): DrawerOverlayState => {
  const { open, size, position } = useDrawerDefaultProps(props);
  const { modalType = 'modal', inertTrapFocus, defaultOpen = false, onOpenChange } = props;

  const drawerMotion = useMotion<HTMLDivElement>(open);
  const backdropMotion = useMotion<HTMLDivElement>(open);

  const hasCustomBackdrop = modalType !== 'non-modal' && props.backdrop !== null;

  const root = slot.always(
    {
      ...props,
      backdrop: hasCustomBackdrop
        ? {
            ...slot.resolveShorthand(props.backdrop),
            ref: backdropMotion.ref,
          }
        : null,
    },
    {
      elementType: DrawerOverlaySurface,
      defaultProps: {
        ref: useMergedRefs(ref, drawerMotion.ref),
      },
    },
  );

  const dialog = slot.always(
    {
      open: true,
      defaultOpen,
      onOpenChange,
      inertTrapFocus,
      modalType,
      /*
       * children is not needed here because we construct the children in the render function,
       * but it's required by DialogProps
       */
      children: null as unknown as JSX.Element,
    },
    {
      elementType: Dialog,
    },
  );

  return {
    components: {
      root: DrawerOverlaySurface,
      dialog: Dialog,
      backdrop: 'div',
    },

    root,
    dialog,

    size,
    position,
    motion: drawerMotion,
    backdropMotion,
  };
};
