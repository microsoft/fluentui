import * as React from 'react';
import { Dialog } from '@fluentui/react-dialog';
import { slot } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { toMountNodeProps } from '@fluentui/react-portal';

import { OverlayDrawerMotion, OverlaySurfaceBackdropMotion } from '../../shared/drawerMotions';
import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type { OverlayDrawerProps, OverlayDrawerState } from './OverlayDrawer.types';
import { OverlayDrawerSurface } from './OverlayDrawerSurface';
import { mergePresenceSlots } from '../../shared/drawerMotionUtils';

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
  const { backdropMotion, modalType = 'modal', inertTrapFocus, onOpenChange, surfaceMotion, mountNode } = props;
  const { dir, targetDocument } = useFluent();
  const { element: mountNodeElement } = toMountNodeProps(mountNode);
  const hasMountNodeElement = Boolean(mountNodeElement && targetDocument?.body !== mountNodeElement);

  const backdropProps = slot.resolveShorthand(props.backdrop);
  const hasCustomBackdrop = modalType !== 'non-modal' && backdropProps !== null;

  const root = slot.always(
    {
      ...props,
      ref,
      backdrop: hasCustomBackdrop ? { ...backdropProps } : null,
      backdropMotion: mergePresenceSlots(backdropMotion, OverlaySurfaceBackdropMotion, { size }),
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
      surfaceMotion: mergePresenceSlots(surfaceMotion, OverlayDrawerMotion, { position, size, dir }),
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
      root: OverlayDrawerSurface,
      dialog: Dialog,
    },

    root,
    dialog,

    open,
    size,
    position,
    hasMountNodeElement,

    // Deprecated props
    mountNode,
    motion: STATIC_MOTION,
  };
};
