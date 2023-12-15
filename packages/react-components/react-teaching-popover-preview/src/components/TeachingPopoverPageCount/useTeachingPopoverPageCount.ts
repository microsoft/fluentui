import * as React from 'react';
import { getIntrinsicElementProps, isResolvedShorthand, slot, useEventCallback } from '@fluentui/react-utilities';
import type { TeachingPopoverPageCountProps, TeachingPopoverPageCountState } from './TeachingPopoverPageCount.types';

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
  const { as, carouselIcon, carouselSelectedIcon } = props;
  const focusableGroupAttr = useFocusableGroup({ tabBehavior: 'limited' });

  const totalPages = useTeachingPopoverContext_unstable(context => context.totalPages);
  const currentPage = useTeachingPopoverContext_unstable(context => context.currentPage);
  const setCurrentPage = useTeachingPopoverContext_unstable(context => context.setCurrentPage);

  const _carouselIcon = slot.always(carouselIcon, {
    elementType: 'button',
    defaultProps: {
      type: 'button',
    },
  });

  _carouselIcon.onClick = useEventCallback(event => {
    if (isResolvedShorthand(carouselIcon)) {
      carouselIcon.onClick?.(event);
    }
    if (!event.defaultPrevented) {
      setCurrentPage(0);
    }
  });

  const carouselIconShorthand = useARIAButtonProps(_carouselIcon?.as, _carouselIcon);

  const _carouselSelectedIcon = slot.always(carouselSelectedIcon, {
    elementType: 'button',
    defaultProps: {
      type: 'button',
    },
  });

  _carouselSelectedIcon.onClick = useEventCallback(event => {
    if (isResolvedShorthand(carouselSelectedIcon)) {
      carouselSelectedIcon.onClick?.(event);
    }
    if (!event.defaultPrevented) {
      setCurrentPage(0);
    }
  });
  const carouselSelectedIconShorthand = useARIAButtonProps(_carouselSelectedIcon?.as, { ..._carouselSelectedIcon });

  const tabsterMod =
    props.countStyle === 'icon'
      ? {
          role: 'list',
          tabIndex: 0,
          ...focusableGroupAttr,
        }
      : {};

  return {
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
      }),
      { elementType: 'div' },
    ),
    carouselIcon: carouselIconShorthand,
    carouselSelectedIcon: carouselSelectedIconShorthand,
  };
};
