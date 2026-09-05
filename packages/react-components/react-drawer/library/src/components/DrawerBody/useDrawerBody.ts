'use client';

import * as React from 'react';
import {
  mergeCallbacks,
  slot,
  useAnimationFrame,
  useMergedRefs,
  useIsomorphicLayoutEffect,
  getIntrinsicElementProps,
} from '@fluentui/react-utilities';

import { useDrawerContext_unstable } from '../../contexts/drawerContext';
import type { DrawerScrollState } from '../../shared/DrawerBase.types';

import type { DrawerBodyProps, DrawerBodyState } from './DrawerBody.types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * `clientHeight` and `scrollHeight` are rounded to integers while `scrollTop` is fractional, so
 * scroll positions have to be compared with a tolerance instead of for exact equality. Without it
 * a fully scrolled body reports `middle` whenever the browser zoom is not a whole number.
 *
 * A non-scrollable element can report up to 1px of overflow that it cannot actually scroll, and
 * both values are integers, so a single pixel is enough here.
 */
const OVERFLOW_TOLERANCE = 1;

/**
 * A fully scrolled element can sit short of its own maximum scroll offset because `scrollTop` is
 * fractional while the values it is compared against are rounded.
 */
const SCROLL_BOTTOM_TOLERANCE = 2;

/**
 * Get the current scroll state of the DrawerBody.
 *
 * @internal
 * @param element - HTMLElement to check scroll state of
 */
const getScrollState = ({ scrollTop, scrollHeight, clientHeight }: HTMLElement): DrawerScrollState => {
  if (scrollHeight - clientHeight <= OVERFLOW_TOLERANCE) {
    return 'none';
  }

  if (scrollTop === 0) {
    return 'top';
  }

  if (scrollHeight - clientHeight - scrollTop <= SCROLL_BOTTOM_TOLERANCE) {
    return 'bottom';
  }

  return 'middle';
};

/**
 * Create the state required to render DrawerBody.
 *
 * The returned state can be modified with hooks such as useDrawerBodyStyles_unstable,
 * before being passed to renderDrawerBody_unstable.
 *
 * @param props - props from this instance of DrawerBody
 * @param ref - reference to root HTMLElement of DrawerBody
 */
export const useDrawerBody_unstable = (props: DrawerBodyProps, ref: React.Ref<HTMLElement>): DrawerBodyState => {
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  const { setScrollState } = useDrawerContext_unstable();

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs(ref, scrollRef);

  const [setScrollAnimationFrame, cancelScrollAnimationFrame] = useAnimationFrame();
  const [setResizeAnimationFrame, cancelResizeAnimationFrame] = useAnimationFrame();

  const updateScrollState = React.useCallback(() => {
    if (!scrollRef.current) {
      return;
    }

    setScrollState(getScrollState(scrollRef.current));
  }, [setScrollState]);

  const onScroll = React.useCallback(() => {
    cancelScrollAnimationFrame();
    setScrollAnimationFrame(updateScrollState);
  }, [cancelScrollAnimationFrame, setScrollAnimationFrame, updateScrollState]);

  // Update scroll state on children change
  useIsomorphicLayoutEffect(updateScrollState, [props.children, updateScrollState]);

  // Update scroll state on mount and when resize occurs
  useIsomorphicLayoutEffect(() => {
    if (!scrollRef.current || !win?.ResizeObserver) {
      return;
    }

    const observer = new win.ResizeObserver(() => setResizeAnimationFrame(updateScrollState));

    observer.observe(scrollRef.current);

    return () => {
      observer.disconnect();
      cancelResizeAnimationFrame();
    };
  }, [setResizeAnimationFrame, cancelResizeAnimationFrame, updateScrollState, win]);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps<DrawerBodyProps>('div', {
        ref: mergedRef,
        ...props,
        // eslint-disable-next-line react-hooks/refs
        onScroll: mergeCallbacks(props.onScroll, onScroll),
      }),
      { elementType: 'div' },
    ),
  };
};
