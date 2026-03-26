'use client';

import * as React from 'react';
import { Dialog } from '@fluentui/react-dialog';
import { slot } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { toMountNodeProps } from '@fluentui/react-portal';

import { OverlayDrawerMotion, OverlaySurfaceBackdropMotion } from '../../shared/drawerMotions';
import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';
import type {
  OverlayDrawerBaseProps,
  OverlayDrawerBaseState,
  OverlayDrawerProps,
  OverlayDrawerState,
} from './OverlayDrawer.types';
import { OverlayDrawerSurface } from './OverlayDrawerSurface';
import { mergePresenceSlots } from '../../shared/drawerMotionUtils';

const STATIC_MOTION = {
  active: true,
  canRender: true,
  ref: React.createRef<HTMLDivElement>(),
  type: 'idle' as const,
};

/**
 * Create the base state required to render OverlayDrawer without design-specific props.
 *
 * The returned state can be composed with `useOverlayDrawer_unstable` or used directly
 * to build custom-styled OverlayDrawer variants.
 *
 * @param props - props from this instance of OverlayDrawer (without size and position)
 * @param ref - reference to root HTMLElement of OverlayDrawer
 */
export const useOverlayDrawerBase_unstable = (
  props: OverlayDrawerBaseProps,
  ref: React.Ref<HTMLElement>,
): OverlayDrawerBaseState => {
  const { open = false, unmountOnClose = true } = props;
  const { modalType = 'modal', inertTrapFocus, onOpenChange, backdropMotion, surfaceMotion, mountNode } = props;
  const { targetDocument } = useFluent();
  const { element: mountNodeElement } = toMountNodeProps(mountNode);
  const hasMountNodeElement = Boolean(mountNodeElement && targetDocument?.body !== mountNodeElement);

  const backdropProps = slot.resolveShorthand(props.backdrop);
  const hasCustomBackdrop = modalType !== 'non-modal' && backdropProps !== null;

  const root = slot.always(
    {
      ...props,
      ref,
      unmountOnClose,
      backdrop: hasCustomBackdrop ? { ...backdropProps } : null,
      backdropMotion,
    },
    {
      elementType: OverlayDrawerSurface,
    },
  );

  const dialog = slot.always(
    {
      open,
      onOpenChange,
      inertTrapFocus,
      modalType,
      unmountOnClose,
      surfaceMotion,
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
    hasMountNodeElement,
    unmountOnClose,

    // Deprecated props
    mountNode,
  };
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
  const { open, size, position, unmountOnClose } = useDrawerDefaultProps(props);
  const { backdropMotion, surfaceMotion } = props;
  const { dir } = useFluent();

  const state = useOverlayDrawerBase_unstable(props, ref);

  // Override motion slots with position/size-aware defaults
  state.root.backdropMotion = mergePresenceSlots(backdropMotion, OverlaySurfaceBackdropMotion, { size });
  state.dialog.surfaceMotion = mergePresenceSlots(surfaceMotion, OverlayDrawerMotion, { position, size, dir });

  return {
    ...state,
    open,
    size,
    position,
    unmountOnClose,

    // Deprecated props
    motion: STATIC_MOTION,
  };
};
