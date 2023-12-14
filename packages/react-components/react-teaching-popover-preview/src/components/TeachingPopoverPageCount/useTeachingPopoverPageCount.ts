import * as React from 'react';
import { getIntrinsicElementProps } from '@fluentui/react-utilities';
import type { TeachingPopoverPageCountProps, TeachingPopoverPageCountState } from './TeachingPopoverPageCount.types';

import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';
import { useARIAButtonShorthand } from '@fluentui/react-aria';
import { useFocusableGroup } from '@fluentui/react-tabster';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverPageCount properties
 * @param ref - reference to root HTMLElement of TeachingPopoverPageCount
 */
export const useTeachingPopoverPageCount_unstable = (
  props: TeachingPopoverPageCountProps,
  ref: React.Ref<HTMLElement>,
): TeachingPopoverPageCountState => {
  const { as, carouselIcon, carouselSelectedIcon } = props;
  const focusableGroupAttr = useFocusableGroup({ tabBehavior: 'limited' });

  const totalPages = useTeachingPopoverContext_unstable(context => context.totalPages);
  const currentPage = useTeachingPopoverContext_unstable(context => context.currentPage);
  const setCurrentPage = useTeachingPopoverContext_unstable(context => context.setCurrentPage);

  const carouselIconShorthand = useARIAButtonShorthand(carouselIcon, {
    required: true,
    defaultProps: {
      role: 'button',
    },
  });

  const carouselSelectedIconShorthand = useARIAButtonShorthand(carouselSelectedIcon, {
    required: true,
    defaultProps: {
      role: 'button',
    },
  });
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
    root: getIntrinsicElementProps(as || 'div', {
      ref: ref as React.Ref<HTMLDivElement>,
      ...props,
      ...tabsterMod,
    }),
    carouselIcon: carouselIconShorthand,
    carouselSelectedIcon: carouselSelectedIconShorthand,
  };
};
