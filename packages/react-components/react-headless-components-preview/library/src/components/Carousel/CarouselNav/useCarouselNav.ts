'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isControlDisabled, useCarouselContext, useCarouselPart } from '../carouselContext';
import { CarouselNavButton } from '../CarouselNavButton/CarouselNavButton';
import type { CarouselNavProps, CarouselNavState, NavButtonRenderFunction } from './CarouselNav.types';

/** Create the state required to render CarouselNav. */
export const useCarouselNav = (props: CarouselNavProps, ref: React.Ref<HTMLDivElement>): CarouselNavState => {
  const { pageCount } = useCarouselContext();
  const { children, ...rest } = props;
  const tabs = React.useRef(new Set<{ index: number }>());
  const [revision, refresh] = React.useReducer((value: number) => value + 1, 0);
  const [complete, setComplete] = React.useState(false);
  const registerTab = React.useCallback((index: number) => {
    const entry = { index };
    tabs.current.add(entry);
    refresh();
    return () => {
      tabs.current.delete(entry);
      refresh();
    };
  }, []);
  const rendered = pageCount > 1 && !props.hidden && !isControlDisabled(props);
  // Read after child layout effects. A page-count change and its tabs are one commit, not a lost route.
  useIsomorphicLayoutEffect(() => {
    setComplete(
      tabs.current.size === pageCount && new Set(Array.from(tabs.current, tab => tab.index)).size === pageCount,
    );
  }, [pageCount, revision]);
  useCarouselPart('nav', rendered && complete);
  return {
    components: { root: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        'aria-label': 'Choose a page',
        ...rest,
        ref,
        role: 'tablist',
        hidden: !complete,
      }),
      { elementType: 'div' },
    ),
    pageCount,
    rendered,
    registerTab,
    renderNavButton:
      typeof children === 'function'
        ? (children as NavButtonRenderFunction)
        : () => (children === undefined ? React.createElement(CarouselNavButton) : children),
  };
};
