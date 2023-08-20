import * as React from 'react';
import { getNativeElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { DrawerOverlayProps, DrawerOverlayState } from './DrawerOverlay.types';
import { DialogProps, DialogSurface, DialogSurfaceProps } from '@fluentui/react-dialog';
import { useBaseDrawerDefaultProps } from '../../util/useBaseDrawerDefaultProps';
import { useMotionFromSlot } from '@fluentui/react-motion-preview';

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
  const { open, defaultOpen, size, position } = useBaseDrawerDefaultProps(props);
  const { modalType = 'modal', inertTrapFocus, onOpenChange } = props;

  const [drawerProps, drawerMotion] = useMotionFromSlot(props, open);
  const [backdropProps, backdropMotion] = useMotionFromSlot(props.backdrop, open);

  const hasCustomBackdrop = modalType !== 'non-modal' && backdropProps !== null;

  const root = slot.always<DialogSurfaceProps>(
    getNativeElementProps('div', {
      ...drawerProps,
      ref: useMergedRefs(ref, drawerMotion.ref),
    }),
    {
      elementType: DialogSurface,
      defaultProps: {
        backdrop: slot.optional(backdropProps, {
          elementType: 'div',
          renderByDefault: hasCustomBackdrop,
          defaultProps: {
            motion: backdropMotion,
            ref: backdropMotion.ref,
          },
        }),
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
    } as DialogProps,
    {
      elementType: 'div',
    },
  );

  return {
    components: {
      root: DialogSurface,
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
