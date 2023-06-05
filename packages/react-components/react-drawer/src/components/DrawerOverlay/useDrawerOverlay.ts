import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import type { DrawerOverlayProps, DrawerOverlayState } from './DrawerOverlay.types';
import { DialogProps, DialogSurface } from '@fluentui/react-dialog';
import { getDefaultDrawerProps } from '../../util/getDefaultDrawerProps';
import { usePresenceState } from '../../util/usePresenceState';

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

  const { ref: drawerRef, shouldRender, mounted, entering, exiting } = usePresenceState<HTMLDivElement>(open);

  return {
    components: {
      root: DialogSurface,
    },

    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, drawerRef),
      ...props,
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
    mounted,
    entering,
    exiting,
  };
};
