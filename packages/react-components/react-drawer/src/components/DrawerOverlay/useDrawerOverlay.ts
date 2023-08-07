import * as React from 'react';
import { getNativeElementProps, useMergedRefs, useMotionPresence, slot } from '@fluentui/react-utilities';
import type { DrawerOverlayProps, DrawerOverlayState } from './DrawerOverlay.types';
import { DialogProps, DialogSurface, DialogSurfaceProps } from '@fluentui/react-dialog';
import { getDefaultDrawerProps } from '../../util/getDefaultDrawerProps';

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
  const { open, defaultOpen, size, position } = getDefaultDrawerProps(props);
  const { modalType = 'modal', inertTrapFocus, onOpenChange } = props;

  const { ref: drawerRef, shouldRender, visible, motionState } = useMotionPresence<HTMLDivElement>(open);
  const backdropPresence = useMotionPresence<HTMLDivElement>(open);

  const hasCustomBackdrop = modalType !== 'non-modal' && props.backdrop !== null;

  return {
    components: {
      root: DialogSurface,
      backdrop: 'div',
    },

    root: slot.always<DialogSurfaceProps>(
      getNativeElementProps('div', {
        ...props,
        ref: useMergedRefs(ref, drawerRef),
      }),
      {
        elementType: DialogSurface,
        defaultProps: {
          backdrop: slot.optional(props.backdrop, {
            elementType: 'div',
            renderByDefault: hasCustomBackdrop,
            defaultProps: {
              ref: backdropPresence.ref,
            },
          }),
        },
      },
    ),
    dialog: {
      open: shouldRender,
      defaultOpen,
      onOpenChange,
      inertTrapFocus,
      modalType,
    } as DialogProps,

    size,
    position,
    shouldRender,
    motionState,
    visible,
    backdropVisible: backdropPresence.visible,
  };
};
