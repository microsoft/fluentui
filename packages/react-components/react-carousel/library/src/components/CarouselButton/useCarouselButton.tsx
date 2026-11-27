'use client';

import { type ARIAButtonElement } from '@fluentui/react-aria';
import { useButton_unstable } from '@fluentui/react-button';
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';
import {
  mergeCallbacks,
  useEventCallback,
  slot,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  useAnimationFrame,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselButtonProps, CarouselButtonState } from './CarouselButton.types';
import type { CarouselUpdateData } from '../Carousel/Carousel.types';
import { carouselClassNames } from '../Carousel/useCarouselStyles.styles';
import { carouselButtonClassNames } from './useCarouselButtonStyles.styles';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * Create the state required to render CarouselButton.
 *
 * The returned state can be modified with hooks such as useCarouselButtonStyles_unstable,
 * before being passed to renderCarouselButton_unstable.
 *
 * @param props - props from this instance of CarouselButton
 * @param ref - reference to root HTMLDivElement of CarouselButton
 */
export const useCarouselButton_unstable = (
  props: CarouselButtonProps,
  ref: React.Ref<ARIAButtonElement>,
): CarouselButtonState => {
  const { navType = 'next', ...buttonProps } = props;

  // Locally tracks the total number of slides, will only update if this changes.
  const [totalSlides, setTotalSlides] = React.useState(0);

  const { dir, targetDocument } = useFluent();
  const [scheduleFocus, cancelFocus] = useAnimationFrame();
  const buttonRef = React.useRef<HTMLButtonElement>(undefined);
  const focusMovedRef = React.useRef(false);
  const circular = useCarouselContext(ctx => ctx.circular);
  const [canLoop, setCanLoop] = React.useState(circular);
  const containerRef = useCarouselContext(ctx => ctx.containerRef);
  const selectPageByDirection = useCarouselContext(ctx => ctx.selectPageByDirection);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);
  const resetAutoplay = useCarouselContext(ctx => ctx.resetAutoplay);

  const isTrailing = useCarouselContext(ctx => {
    if (circular && canLoop) {
      return false;
    }

    if (navType === 'prev') {
      return ctx.activeIndex === 0;
    }

    return ctx.activeIndex === totalSlides - 1;
  });

  const handleBlur = useEventCallback((event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    // Disabling a focused button can blur it without a new focus target.
    if (event.relatedTarget !== null) {
      focusMovedRef.current = true;
      cancelFocus();
    }
    props.onBlur?.(event);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    cancelFocus();
    focusMovedRef.current = false;
    if (event.isDefaultPrevented()) {
      return;
    }

    const source = buttonRef.current;
    const sourceDocument = source?.ownerDocument ?? targetDocument;
    const root = source?.getRootNode();
    const ShadowRootConstructor = sourceDocument?.defaultView?.ShadowRoot;
    const shadowRoot = ShadowRootConstructor && root instanceof ShadowRootConstructor ? root : undefined;
    const getActiveElement = () => shadowRoot?.activeElement ?? sourceDocument?.activeElement;
    const wasFocused = source !== undefined && getActiveElement() === source;
    const nextIndex = selectPageByDirection(event, navType);

    let _trailing = false;
    if (navType === 'prev') {
      _trailing = nextIndex === 0;
    } else {
      _trailing = nextIndex === totalSlides - 1;
    }

    if (!circular && _trailing && source && wasFocused && !focusMovedRef.current) {
      // Wait for both navigation buttons' disabled states to reach the DOM.
      scheduleFocus(() => {
        const activeElement = getActiveElement();
        if (
          !source.isConnected ||
          source.getRootNode() !== root ||
          !containerRef?.current?.contains(source) ||
          !source.matches(':disabled, [aria-disabled="true"]') ||
          (activeElement !== source && activeElement !== sourceDocument?.body && activeElement !== shadowRoot?.host)
        ) {
          return;
        }

        const buttons = containerRef.current.querySelectorAll<HTMLElement>(`.${carouselButtonClassNames.root}`);
        const carousel = source.closest(`.${carouselClassNames.root}`);
        for (const button of Array.from(buttons)) {
          if (
            button !== source &&
            button.closest(`.${carouselClassNames.root}`) === carousel &&
            !button.matches(':disabled, [aria-disabled="true"]')
          ) {
            button.focus();
            // A hidden control leaves focus unchanged; a consumer redirect must be respected.
            if (getActiveElement() !== activeElement) {
              break;
            }
          }
        }
      });
    }

    resetAutoplay();
  };

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues((data: CarouselUpdateData) => {
      if (data.canLoop !== undefined) {
        // Only update canLoop if it has been defined by the carousel engine
        setCanLoop(data.canLoop);
      }
      setTotalSlides(data.navItemsCount);
    });
  }, [subscribeForValues]);

  const nextArrowIcon = dir === 'ltr' ? <ChevronRightRegular /> : <ChevronLeftRegular />;
  const prevArrowIcon = dir === 'ltr' ? <ChevronLeftRegular /> : <ChevronRightRegular />;

  return {
    navType,
    // We lean on react-button class to handle styling and icon enhancements
    ...useButton_unstable(
      {
        icon: slot.optional(props.icon, {
          defaultProps: {
            children: navType === 'next' ? nextArrowIcon : prevArrowIcon,
          },
          renderByDefault: true,
          elementType: 'span',
        }),
        disabled: isTrailing,
        tabIndex: isTrailing ? -1 : 0,
        'aria-disabled': isTrailing,
        appearance: 'subtle',
        ...buttonProps,
        onBlur: handleBlur,
        // eslint-disable-next-line react-hooks/refs
        onClick: useEventCallback(mergeCallbacks(handleClick, props.onClick)),
      },
      useMergedRefs(ref, buttonRef) as React.Ref<HTMLButtonElement>,
    ),
  };
};
