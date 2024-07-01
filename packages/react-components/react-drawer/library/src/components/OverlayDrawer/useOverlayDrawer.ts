import * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type { OverlayDrawerProps, OverlayDrawerState } from './OverlayDrawer.types';
import { OverlayDrawerDialog } from './OverlayDrawerDialog';
import { OverlayDrawerSurface } from './OverlayDrawerSurface';

const STATIC_MOTION = {
  active: true,
  canRender: true,
  ref: React.createRef<HTMLDivElement>(),
  type: 'idle' as const,
};

/**
 * Create the state required to render OverlayDrawer.
 *
 * The returned state can be modified with hooks such as useOverlayDrawerStyles_unstable,
 * before being passed to renderOverlayDrawer_unstable.
 *
 * @param props - props from this instance of OverlayDrawer
 * @param ref - reference to root HTMLElement of OverlayDrawer
 */
export const useOverlayDrawer_unstable = (
  props: OverlayDrawerProps,
  ref: React.Ref<HTMLElement>,
): OverlayDrawerState => {
  const { open, size, position } = useDrawerDefaultProps(props);
  const { modalType = 'modal', inertTrapFocus, onOpenChange } = props;

  const backdropProps = slot.resolveShorthand(props.backdrop);
  const hasCustomBackdrop = modalType !== 'non-modal' && backdropProps !== null;

  const root = slot.always(
    {
      ...props,
      ref,
      backdrop: hasCustomBackdrop ? { ...backdropProps } : null,
    },
    {
      /**
       * Drawer accepts a `div` or `aside` element type, but Dialog only accepts a `div` element type.
       * We need to cast the ref to a `div` element type to not break Dialog's ref type.
       */
      elementType: OverlayDrawerSurface as unknown as 'div',
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

    open,
    size,
    position,
    motion: STATIC_MOTION,
  };
};
