import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import { createPresenceComponent, motionTokens, presenceMotionSlot } from '@fluentui/react-motion';

import type { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';
import { useNavContext_unstable } from '../NavContext';

const ExpandIconMotion = createPresenceComponent(() => {
  const keyframes: Keyframe[] = [
    {
      transform: 'rotate(0deg) translate3D(0, 0, 0)',
    },
    {
      transform: 'rotate(180deg) translate3D(0, 0, 0)',
    },
  ];
  const duration = motionTokens.durationFast;
  const easing = motionTokens.curveEasyEase;

  return {
    enter: {
      keyframes,
      duration,
      easing,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration,
      easing,
    },
  };
});

/**
 * Create the state required to render NavCategoryItem.
 *
 * The returned state can be modified with hooks such as useNavCategoryItemStyles,
 * before being passed to renderNavCategoryItem.
 *
 * @param props - props from this instance of NavCategoryItem
 * @param ref - reference to root HTMLButtonElement of NavCategoryItem
 */
export const useNavCategoryItem_unstable = (
  props: NavCategoryItemProps,
  ref: React.Ref<HTMLButtonElement>,
): NavCategoryItemState => {
  const { onClick, expandIcon, icon } = props;

  const { open, value } = useNavCategoryContext_unstable();

  const { onRequestNavCategoryItemToggle, selectedCategoryValue, density = 'medium' } = useNavContext_unstable();

  const onNavCategoryItemClick = useEventCallback(
    mergeCallbacks(onClick, event =>
      onRequestNavCategoryItemToggle(event, { type: 'click', event, value: '', categoryValue: value }),
    ),
  );

  // don't fill the icon when it's open
  const selected = selectedCategoryValue === value && !open;
  // there's more than 2 possible values for aria-current, but this is the only one that's used in this component
  const validAriaCurrent: 'page' | 'false' = selected && !open ? 'page' : 'false';

  return {
    open,
    value,
    selected,
    components: {
      root: 'button',
      icon: 'span',
      expandIcon: 'span',
      expandIconMotion: ExpandIconMotion,
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        'aria-current': validAriaCurrent,
        'aria-expanded': open,
        ...props,
        onClick: onNavCategoryItemClick,
      }),
      { elementType: 'button' },
    ),
    expandIcon: slot.always(expandIcon, {
      defaultProps: {
        children: <ChevronDown20Regular />,
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    expandIconMotion: presenceMotionSlot(props.expandIconMotion, {
      elementType: ExpandIconMotion,
      defaultProps: {
        visible: open,
      },
    }),
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
    density,
  };
};
