'use client';

import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import { createPresenceComponentVariant, motionTokens, presenceMotionSlot } from '@fluentui/react-motion';

import type {
  NavCategoryItemBaseProps,
  NavCategoryItemBaseState,
  NavCategoryItemProps,
  NavCategoryItemState,
} from './NavCategoryItem.types';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';
import { useNavContext_unstable } from '../NavContext';
import { Rotate } from '@fluentui/react-motion-components-preview';

const ExpandIconMotion = createPresenceComponentVariant(Rotate, {
  duration: motionTokens.durationFast,
  easing: motionTokens.curveEasyEase,
  animateOpacity: false, // Don't fade out the icon
  outAngle: 0,
  inAngle: 180,
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
  const { density = 'medium' } = useNavContext_unstable();

  const state = useNavCategoryItemBase_unstable(props, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      expandIconMotion: ExpandIconMotion,
    },
    expandIcon: slot.always(props.expandIcon, {
      defaultProps: {
        children: <ChevronDown20Regular />,
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    expandIconMotion: presenceMotionSlot(props.expandIconMotion, {
      elementType: ExpandIconMotion,
      defaultProps: {
        visible: state.open,
      },
    }),
    density,
  };
};

/**
 * Create the base state required to render NavCategoryItem.
 *
 * @param props - props from this instance of NavCategoryItem
 * @param ref - reference to root HTMLButtonElement of NavCategoryItem
 */
export const useNavCategoryItemBase_unstable = (
  props: NavCategoryItemBaseProps,
  ref: React.Ref<HTMLButtonElement>,
): NavCategoryItemBaseState => {
  const { onClick, expandIcon, icon } = props;

  const { open, value } = useNavCategoryContext_unstable();

  const { onRequestNavCategoryItemToggle, selectedCategoryValue } = useNavContext_unstable();

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
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
  };
};
