'use client';

import * as React from 'react';
import { useTeachingPopoverCarouselFooterButtonBase_unstable } from '@fluentui/react-teaching-popover';
import { slot, useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { TeachingPopoverCarouselFooterContext } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooterContext';
import type {
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';

export const useTeachingPopoverCarouselFooterButton = (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonState => {
  const { hideOnBoundary = false, ...buttonProps } = props;
  const state = useTeachingPopoverCarouselFooterButtonBase_unstable(buttonProps, ref);
  const rootRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const focusedRef = React.useRef(false);
  const focusOnBoundary = React.useContext(TeachingPopoverCarouselFooterContext);
  const { targetDocument } = useFluent_unstable();
  const hiddenOnBoundary = hideOnBoundary && state.isAtBoundary;
  const wasHiddenRef = React.useRef(hiddenOnBoundary);

  const mergedRef = useMergedRefs(rootRef, state.root.ref);
  const onFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    focusedRef.current = true;
    state.root.onFocus?.(event);
  });
  const onBlur = useEventCallback((event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    // Browsers can blur a button as soon as its hidden attribute commits.
    if (!rootRef.current?.hidden) {
      focusedRef.current = false;
    }
    state.root.onBlur?.(event);
  });

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (
      hiddenOnBoundary &&
      !wasHiddenRef.current &&
      focusedRef.current &&
      root &&
      (targetDocument?.activeElement === root || targetDocument?.activeElement === targetDocument?.body)
    ) {
      focusedRef.current = false;
      focusOnBoundary?.(root);
    }
    wasHiddenRef.current = hiddenOnBoundary;
  }, [hiddenOnBoundary, focusOnBoundary, targetDocument]);

  return {
    ...state,
    root: slot.always(
      {
        ...state.root,
        ref: mergedRef,
        hidden: state.root.hidden || hiddenOnBoundary,
        onFocus,
        onBlur,
      },
      { elementType: 'button' },
    ),
  };
};
