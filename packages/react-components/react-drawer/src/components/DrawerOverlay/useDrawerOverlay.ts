import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useMergedRefs, useMotionPresence } from '@fluentui/react-utilities';
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

  const { ref: drawerRef, shouldRender, visible, entering, exiting } = useMotionPresence<HTMLDivElement>(open);
  const backdropPresence = useMotionPresence<HTMLDivElement>(open);

  const backdropProps = React.useMemo(() => {
    if (backdropPresence.shouldRender) {
      return {
        ref: backdropPresence.ref,
      };
    }

    return null;
  }, [backdropPresence.ref, backdropPresence.shouldRender]);

  return {
    components: {
      root: DialogSurface,
    },

    root: resolveShorthand(getNativeElementProps('div', {}), {
      required: true,
      defaultProps: {
        ...props,
        ref: useMergedRefs(ref, drawerRef),
        backdrop: backdropProps,
      } as DialogSurfaceProps,
    }),
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
    visible,
    entering,
    exiting,
    backdropVisible: backdropPresence.visible,
  };
};
