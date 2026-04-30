import type * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { slot } from '@fluentui/react-utilities';

import { Dialog, DialogSurface } from '../../Dialog';
import { stringifyDataAttribute } from '../../../utils';
import type { OverlayDrawerProps, OverlayDrawerState } from './OverlayDrawer.types';

/**
 * Returns the state for an OverlayDrawer component, given its props and ref.
 */
export const useOverlayDrawer = (props: OverlayDrawerProps, ref: React.Ref<HTMLDialogElement>): OverlayDrawerState => {
  'use no memo';

  const {
    open = false,
    position = 'start',
    unmountOnClose = true,
    modalType = 'modal',
    onOpenChange,
    ...rootProps
  } = props;

  const root = slot.always(
    {
      ...rootProps,
      unmountOnClose,
      'data-open': stringifyDataAttribute(open),
      'data-position': position,
      ref,
    },
    {
      elementType: DialogSurface,
    },
  );

  const dialog = slot.always(
    {
      open,
      onOpenChange,
      modalType,
      unmountOnClose,
      /**
       * children is not needed here because we construct the children in the render function,
       * but it's required by DialogProps
       */
      children: null as unknown as JSXElement,
    },
    {
      elementType: Dialog,
    },
  );

  return {
    components: {
      root: DialogSurface,
      dialog: Dialog,
    },
    root,
    dialog,
    modalType,
    onOpenChange,
    open,
    position,
    unmountOnClose,
  };
};
