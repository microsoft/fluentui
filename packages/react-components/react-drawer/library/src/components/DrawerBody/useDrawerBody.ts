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
import { DrawerScrollState } from '../../shared/DrawerBase.types';

import type { DrawerBodyProps, DrawerBodyState } from './DrawerBody.types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * @internal
 *
 * Get the current scroll state of the DrawerBody.
 *
 * @param element - HTMLElement to check scroll state of
 */
const getScrollState = ({ scrollTop, scrollHeight, clientHeight }: HTMLElement): DrawerScrollState => {
  if (scrollHeight <= clientHeight) {
    return 'none';
  }

  if (scrollTop === 0) {
    return 'top';
  }

  if (scrollTop + clientHeight === scrollHeight) {
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
        onScroll: mergeCallbacks(props.onScroll, onScroll),
      }),
      { elementType: 'div' },
    ),
  };
};
