'use client';

import * as React from 'react';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import { createPresenceComponentVariant, motionTokens, presenceMotionSlot } from '@fluentui/react-motion';
import { Rotate } from '@fluentui/react-motion-components-preview';
import { slot } from '@fluentui/react-utilities';
import {
  useNavCategoryItem as useNavCategoryItemBase,
  useNavCategoryItemContext,
  useNavCategoryItemContextValues,
  useNavContext,
} from '@fluentui/react-headless-components-preview/nav';
import type { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';

export { useNavCategoryItemContext, useNavCategoryItemContextValues };

const ExpandIconMotion = createPresenceComponentVariant(Rotate, {
  animateOpacity: false,
  duration: motionTokens.durationFast,
  easing: motionTokens.curveEasyEase,
  inAngle: 180,
  outAngle: 0,
});

export const useNavCategoryItem = (
  props: NavCategoryItemProps,
  ref: React.Ref<HTMLButtonElement>,
): NavCategoryItemState => {
  const { density = 'medium' } = useNavContext();
  const { expandIconMotion, ...rest } = props;
  const state = useNavCategoryItemBase(rest, ref);

  return {
    ...state,
    components: {
      root: 'button',
      icon: 'span',
      expandIcon: 'span',
      expandIconMotion: ExpandIconMotion,
    },
    density,
    root: {
      ...state.root,
      'data-density': density,
    },
    expandIcon: slot.always(props.expandIcon ?? undefined, {
      defaultProps: {
        'aria-hidden': true,
        children: <ChevronDown20Regular />,
      },
      elementType: 'span',
    }) as NavCategoryItemState['expandIcon'],
    expandIconMotion: presenceMotionSlot(expandIconMotion, {
      elementType: ExpandIconMotion,
      defaultProps: {
        visible: state.open,
      },
    }),
  };
};
