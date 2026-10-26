'use client';

import * as React from 'react';
import { useTeachingPopoverCarouselFooterButtonBase_unstable } from '@fluentui/react-teaching-popover';
import { slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useFocusFinders } from '@fluentui/react-tabster';
import { TeachingPopoverCarouselFooterContext } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooterContext';
import type {
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';

export const useTeachingPopoverCarouselFooterButton = (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonState => {
  const state = useTeachingPopoverCarouselFooterButtonBase_unstable(props, ref);
  const rootRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const focusedRef = React.useRef(false);
  const buttons = React.useContext(TeachingPopoverCarouselFooterContext);
  const { targetDocument } = useFluent_unstable();
  const { findAllFocusable } = useFocusFinders();
  const isFocusable = (element: HTMLElement) => findAllFocusable(element.parentElement).includes(element);

  const register = React.useCallback(
    (element: HTMLButtonElement | HTMLAnchorElement | null) => {
      buttons?.register(props.navType, element);
    },
    [buttons, props.navType],
  );

  const mergedRef = useMergedRefs(rootRef, state.root.ref, register);
  const onFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    focusedRef.current = true;
    state.root.onFocus?.(event);
  });
  const onBlur = useEventCallback((event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    // Hiding can blur the button before the effect recovers focus.
    if (rootRef.current && isFocusable(rootRef.current)) {
      focusedRef.current = false;
    }
    state.root.onBlur?.(event);
  });

  // Passive effects run after sibling refs have reattached for this commit.
  React.useEffect(() => {
    const root = rootRef.current;
    const ownedFocus = focusedRef.current;
    focusedRef.current = targetDocument?.activeElement === root;
    if (
      ownedFocus &&
      root &&
      !isFocusable(root) &&
      (targetDocument?.activeElement === root || targetDocument?.activeElement === targetDocument?.body)
    ) {
      focusedRef.current = false;
      const destination = buttons?.getButton(props.navType === 'prev' ? 'next' : 'prev');
      if (destination && isFocusable(destination)) {
        destination.focus();
      }
    }
  });

  return {
    ...state,
    root: slot.always(
      {
        ...state.root,
        ref: mergedRef,
        onFocus,
        onBlur,
      },
      { elementType: 'button' },
    ),
  };
};
