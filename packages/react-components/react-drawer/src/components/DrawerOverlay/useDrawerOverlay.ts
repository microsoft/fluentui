import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { Dialog, DialogSurface } from '@fluentui/react-dialog';
import { useMotion } from '@fluentui/react-motion-preview';

import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type { DrawerOverlayProps, DrawerOverlayState } from './DrawerOverlay.types';

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
  const { open, defaultOpen, size, position } = useDrawerDefaultProps(props);
  const { modalType = 'modal', inertTrapFocus, onOpenChange } = props;

  const drawerMotion = useMotion<HTMLDivElement>(open);
  const backdropMotion = useMotion<HTMLDivElement>(open);

  const hasCustomBackdrop = modalType !== 'non-modal' && props.backdrop !== null;

  const root = slot.always(
    {
      ...props,
      ref: useMergedRefs(ref, drawerMotion.ref),
    },
    {
      elementType: DialogSurface,
      defaultProps: {
        backdrop: slot.optional(props.backdrop, {
          elementType: 'div',
          renderByDefault: hasCustomBackdrop,
          defaultProps: {
            ref: backdropMotion.ref,
          },
        }),
      },
    },
  );

  const dialog = slot.optional(props.dialog, {
    elementType: Dialog,
    renderByDefault: true,
    defaultProps: {
      open: true,
      defaultOpen,
      onOpenChange,
      inertTrapFocus,
      modalType,
    },
  });

  return {
    components: {
      root: DialogSurface,
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
