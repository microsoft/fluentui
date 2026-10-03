'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type {
  TeachingPopoverCarouselFooterButtonBaseProps,
  TeachingPopoverCarouselFooterButtonBaseState,
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useEventCallback } from '@fluentui/react-utilities';
import { useButton_unstable } from '@fluentui/react-button';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';

/**
 * Base hook that builds TeachingPopoverCarouselFooterButton state for behavior and structure only.
 * Does not read `appearance` from the popover context, does not derive the button's
 * appearance from the navType/popoverAppearance combination, and does not call
 * `useButton_unstable` (the styled hook does that with the right appearance).
 * @param props - props from this instance of TeachingPopoverCarouselFooterButton
 * @param ref - reference to root HTMLDivElement of TeachingPopoverCarouselFooterButton
 */
export const useTeachingPopoverCarouselFooterButtonBase_unstable = (
  props: TeachingPopoverCarouselFooterButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonBaseState => {
  const { navType, altText, onFocus, onBlur } = props;

  const selectPageByDirection = useCarouselContext_unstable(c => c.selectPageByDirection);
  const values = useCarouselValues_unstable(snapshot => snapshot);
  const activeValue = useCarouselContext_unstable(c => c.value);
  const footerButtonRefs = useCarouselContext_unstable(c => c.footerButtonRefs);
  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const mergedRef = useMergedRefs(ref, buttonRef);
  const { targetDocument } = useFluent();
  const hasFocus = React.useRef(false);
  const shouldTransferFocus = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    const refs = footerButtonRefs?.[navType];
    refs?.add(buttonRef);
    return () => {
      refs?.delete(buttonRef);
    };
  }, [footerButtonRefs, navType]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }

    selectPageByDirection(event, navType);
  };

  const handleButtonClick = useEventCallback(mergeCallbacks(handleClick, props.onClick));
  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      hasFocus.current = true;
      onFocus?.(event);
    },
    [onFocus],
  );
  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      hasFocus.current = false;
      onBlur?.(event);
    },
    [onBlur],
  );

  const isTrailing = React.useMemo(() => {
    const activeIndex = activeValue === null ? -1 : values.indexOf(activeValue);
    if (activeIndex < 0) {
      return false;
    }

    return navType === 'prev' ? activeIndex === 0 : activeIndex === values.length - 1;
  }, [navType, activeValue, values]);

  /* Handle altText on trailing step */
  let buttonChild = props.children;
  if (isTrailing) {
    buttonChild = altText;
  }

  const hidden = isTrailing && (altText === null || altText === undefined);
  useIsomorphicLayoutEffect(() => {
    const activeElement = targetDocument?.activeElement;
    shouldTransferFocus.current =
      hidden && hasFocus.current && (activeElement === buttonRef.current || activeElement === targetDocument?.body);
  }, [hidden, navType, footerButtonRefs, targetDocument]);

  // Sibling refs may still be detached during our layout effect. Wait for all refs to attach,
  // then check that another component has not deliberately moved focus in the meantime.
  React.useEffect(() => {
    const transferFocus = shouldTransferFocus.current;
    shouldTransferFocus.current = false;
    const activeElement = targetDocument?.activeElement;
    if (transferFocus && hidden && (activeElement === buttonRef.current || activeElement === targetDocument?.body)) {
      const oppositeButtonRefs = footerButtonRefs?.[navType === 'prev' ? 'next' : 'prev'];
      for (const oppositeRef of oppositeButtonRefs ?? []) {
        const button = oppositeRef.current;
        if (!button?.isConnected) {
          continue;
        }
        // Let the browser reject hidden, disabled, or inert destinations.
        button.focus();
        const focusedElement = targetDocument?.activeElement;
        if (focusedElement !== buttonRef.current && focusedElement !== targetDocument?.body) {
          // Preserve successful focus, including deliberate redirection by a focus handler.
          break;
        }
      }
    }
  }, [hidden, navType, footerButtonRefs, targetDocument]);

  const root = slot.always(
    getIntrinsicElementProps('button', {
      ...props,
      ref: mergedRef,
      hidden: hidden || props.hidden,
      onClick: handleButtonClick,
      children: buttonChild,
    }),
    { elementType: 'button' },
  );
  root.onFocus = handleFocus;
  root.onBlur = handleBlur;

  return {
    navType,
    altText,
    components: {
      root: 'button',
    },
    root,
  };
};

/**
 * Create the state required to render TeachingPopoverCarouselFooterButton.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverCarouselFooterButtonStyles_unstable,
 * before being passed to renderTeachingPopoverCarouselFooterButton_unstable.
 *
 * @param props - props from this instance of TeachingPopoverCarouselFooterButton
 * @param ref - reference to root HTMLDivElement of TeachingPopoverCarouselFooterButton
 */
export const useTeachingPopoverCarouselFooterButton_unstable = (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonState => {
  const baseState = useTeachingPopoverCarouselFooterButtonBase_unstable(props, ref);
  const popoverAppearance = usePopoverContext_unstable(context => context.appearance);

  let buttonAppearanceType: 'primary' | 'outline' | undefined;

  if (props.navType === 'next') {
    buttonAppearanceType = popoverAppearance === 'brand' ? undefined : 'primary';
  } else {
    buttonAppearanceType = popoverAppearance === 'brand' ? 'outline' : undefined;
  }

  const buttonState = useButton_unstable({ appearance: buttonAppearanceType, ...props }, ref);

  return {
    ...buttonState,
    navType: baseState.navType,
    altText: baseState.altText,
    root: baseState.root,
    popoverAppearance,
  };
};
