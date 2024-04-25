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

/**
 * @internal
 *
 * Get the current scroll state of the DrawerBody.
 *
 * @param param0 - HTMLElement to check scroll state of
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
  const { setScrollState } = useDrawerContext_unstable();

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [setAnimationFrame, cancelAnimationFrame] = useAnimationFrame();

  const onScroll = React.useCallback(() => {
    cancelAnimationFrame();
    setAnimationFrame(() => {
      if (!scrollRef.current) {
        return;
      }

      setScrollState(getScrollState(scrollRef.current));
    });
  }, [cancelAnimationFrame, setAnimationFrame, setScrollState]);

  useIsomorphicLayoutEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    setScrollState(getScrollState(scrollRef.current));

    return () => cancelAnimationFrame();
  }, [cancelAnimationFrame, setScrollState]);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps<DrawerBodyProps>('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs<HTMLDivElement>(ref as React.Ref<HTMLDivElement>, scrollRef),
        ...props,
        onScroll: mergeCallbacks(props.onScroll, onScroll),
      }),
      { elementType: 'div' },
    ),
  };
};
