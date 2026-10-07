'use client';

import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { usePopover } from '../Popover/usePopover';
import type { TeachingPopoverProps, TeachingPopoverState } from './TeachingPopover.types';

/**
 * Returns the state for a TeachingPopover component.
 *
 * Built on top of the headless `Popover` and defaults `withArrow` to `true`,
 * matching the v9 TeachingPopover convention.
 */
export const useTeachingPopover = (props: TeachingPopoverProps): TeachingPopoverState => {
  const state = usePopover({ withArrow: true, ...props });
  const { targetDocument } = useFluent_unstable();
  const wasOpen = React.useRef(state.open);
  const focusWasInside = React.useRef(false);

  React.useEffect(() => {
    // React-driven closure can remove the surface before native focus restoration.
    if (
      wasOpen.current &&
      !state.open &&
      focusWasInside.current &&
      targetDocument &&
      (targetDocument.activeElement === targetDocument.body || targetDocument.activeElement === null)
    ) {
      const trigger = state.triggerRef.current;
      if (trigger?.isConnected) {
        trigger.focus();
      }
    }

    wasOpen.current = state.open;
    focusWasInside.current = false;
    if (!state.open || !targetDocument) {
      return;
    }

    const trackFocus = () => {
      // Native close can emit focusin while focus is still on the body.
      if (targetDocument.activeElement !== targetDocument.body) {
        const surface = state.contentRef.current;
        const root = surface?.getRootNode();
        const ShadowRootConstructor = targetDocument.defaultView?.ShadowRoot;
        // Document focus is retargeted to the host when the surface lives in a shadow root.
        const activeElement =
          ShadowRootConstructor && root instanceof ShadowRootConstructor
            ? root.activeElement
            : targetDocument.activeElement;
        focusWasInside.current = surface?.contains(activeElement) ?? false;
      }
    };
    trackFocus();
    targetDocument.addEventListener('focusin', trackFocus, true);
    return () => targetDocument.removeEventListener('focusin', trackFocus, true);
  }, [state.open, state.contentRef, state.triggerRef, targetDocument]);

  return state;
};
