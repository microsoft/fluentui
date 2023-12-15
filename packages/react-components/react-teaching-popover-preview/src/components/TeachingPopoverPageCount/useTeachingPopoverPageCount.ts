import * as React from 'react';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  isResolvedShorthand,
  mergeCallbacks,
  slot,
  useEventCallback,
} from '@fluentui/react-utilities';
import type {
  TeachingPopoverPageCountChildRenderFunction,
  TeachingPopoverPageCountProps,
  TeachingPopoverPageCountState,
} from './TeachingPopoverPageCount.types';

import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { useFocusableGroup } from '@fluentui/react-tabster';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverPageCount properties
 * @param ref - reference to root HTMLElement of TeachingPopoverPageCount
 */
export const useTeachingPopoverPageCount_unstable = (
  props: TeachingPopoverPageCountProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverPageCountState => {
  const { carouselIcon, carouselSelectedIcon } = props;
  const focusableGroupAttr = useFocusableGroup({ tabBehavior: 'limited' });

  const totalPages = useTeachingPopoverContext_unstable(context => context.totalPages);
  const currentPage = useTeachingPopoverContext_unstable(context => context.currentPage);
  const setCurrentPage = useTeachingPopoverContext_unstable(context => context.setCurrentPage);
  const appearance = useTeachingPopoverContext_unstable(context => context.appearance);

  const _carouselIcon = slot.always(carouselIcon, {
    elementType: 'button',
    defaultProps: {
      type: 'button',
    },
  });

  const onClickIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      const index = parseInt(event.target.dataset.index || '0', 10);
      if (!isNaN(index)) {
        setCurrentPage(index);
      }
    }
  };

  _carouselIcon.onClick = mergeCallbacks(_carouselIcon.onClick, onClickIcon);

  const carouselIconShorthand = useARIAButtonProps(_carouselIcon?.as, _carouselIcon);

  const _carouselSelectedIcon = slot.always(carouselSelectedIcon, {
    elementType: 'button',
    defaultProps: {
      type: 'button',
    },
  });

  _carouselSelectedIcon.onClick = mergeCallbacks(_carouselSelectedIcon.onClick, onClickIcon);

  const carouselSelectedIconShorthand = useARIAButtonProps(_carouselSelectedIcon?.as, { ..._carouselSelectedIcon });

  const tabsterMod =
    props.countStyle === 'icon'
      ? {
          role: 'list',
          tabIndex: 0,
          ...focusableGroupAttr,
        }
      : {};

  let renderChildMod = {};
  if (props.countStyle === 'text') {
    if (typeof props.children === 'function') {
      const renderFunc = props.children as TeachingPopoverPageCountChildRenderFunction;
      renderChildMod = { children: renderFunc(currentPage, totalPages) };
    } else {
      renderChildMod = { children: `${currentPage + 1} ${props.children} ${totalPages}` };
    }
  }

  return {
    appearance,
    totalPages,
    currentPage,
    setCurrentPage,
    countStyle: props.countStyle ?? 'text',
    components: {
      root: 'div',
      carouselIcon: 'button',
      carouselSelectedIcon: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        ...tabsterMod,
        ...renderChildMod,
      }),
      { elementType: 'div' },
    ),
    carouselIcon: carouselIconShorthand,
    carouselSelectedIcon: carouselSelectedIconShorthand,
  };
};
