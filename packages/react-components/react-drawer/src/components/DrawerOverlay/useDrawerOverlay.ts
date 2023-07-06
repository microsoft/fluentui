import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DrawerOverlayProps, DrawerOverlayState } from './DrawerOverlay.types';
import { DialogProps, DialogSurface } from '@fluentui/react-dialog';
import { getDefaultDrawerProps } from '../../util/getDefaultDrawerProps';

/**
 * Create the state required to render DrawerOverlay.
 *
 * The returned state can be modified with hooks such as useDrawerOverlayStyles_unstable,
 * before being passed to renderDrawerOverlay_unstable.
 *
 * @param props - props from this instance of DrawerOverlay
 * @param ref - reference to root HTMLElement of DrawerOverlay
 */
export const useDrawerOverlay_unstable = (
  props: DrawerOverlayProps,
  ref: React.Ref<HTMLElement>,
): DrawerOverlayState => {
  const { open, defaultOpen, size, position } = getDefaultDrawerProps(props);
  const { modalType = 'modal', inertTrapFocus, onOpenChange } = props;

  return {
    components: {
      root: DialogSurface,
      backdrop: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    dialog: {
      open,
      defaultOpen,
      onOpenChange,
      inertTrapFocus,
      modalType,
    } as DialogProps,

    size,
    position,
  };
};
