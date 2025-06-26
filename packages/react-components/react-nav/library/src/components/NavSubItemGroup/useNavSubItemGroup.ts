import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { createPresenceComponent, motionTokens, presenceMotionSlot } from '@fluentui/react-motion';

import type {
  NavSubItemGroupCollapseMotionParams,
  NavSubItemGroupProps,
  NavSubItemGroupState,
} from './NavSubItemGroup.types';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';
import { useNavContext_unstable } from '../NavContext';

const smallSize = 28; // 28px for small density
const largeSize = 40; // 40px for large density

const NavGroupMotion = createPresenceComponent(({ items, density }: NavSubItemGroupCollapseMotionParams) => {
  const isSmallDensity = density === 'small';
  const height = items ? (isSmallDensity ? items * smallSize : items * largeSize) : 0;
  const durationPerItem = isSmallDensity ? 15 : 25; // 15ms per item for small, 25ms for large
  const keyframes: Keyframe[] = [
    {
      opacity: 0,
      minHeight: 0,
      height: 0,
    },
    {
      opacity: 1,
      minHeight: `${height}px`,
      height: `${height}px`,
    },
  ];
  const baseDuration = motionTokens.durationFast + (items || 0) * durationPerItem;
  const maxDuration = motionTokens.durationUltraSlow;
  const duration = baseDuration > maxDuration ? maxDuration : baseDuration;

  return {
    enter: {
      keyframes,
      duration,
      easing: motionTokens.curveDecelerateMid,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

/**
 * Create the state required to render NavSubItemGroup.
 *
 * The returned state can be modified with hooks such as useNavSubItemGroupStyles_unstable,
 * before being passed to renderNavSubItemGroup_unstable.
 *
 * @param props - props from this instance of NavSubItemGroup
 * @param ref - reference to root HTMLDivElement of NavSubItemGroup
 */
export const useNavSubItemGroup_unstable = (
  props: NavSubItemGroupProps,
  ref: React.Ref<HTMLDivElement>,
): NavSubItemGroupState => {
  const { open } = useNavCategoryContext_unstable();
  const { density } = useNavContext_unstable();

  return {
    open,
    components: {
      root: 'div',
      collapseMotion: NavGroupMotion,
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        ref,
      }),
      { elementType: 'div' },
    ),

    collapseMotion: presenceMotionSlot(props.collapseMotion, {
      elementType: NavGroupMotion,
      defaultProps: {
        visible: open,
        unmountOnExit: true,
        items: React.Children.count(props.children),
        density,
      },
    }),
  };
};
