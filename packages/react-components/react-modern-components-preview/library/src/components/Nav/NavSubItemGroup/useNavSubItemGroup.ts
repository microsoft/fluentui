'use client';

import type * as React from 'react';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { useNavSubItemGroup as useNavSubItemGroupBase } from '@fluentui/react-headless-components-preview/nav';
import type { NavSubItemGroupProps, NavSubItemGroupState } from './NavSubItemGroup.types';

export const useNavSubItemGroup = (
  props: NavSubItemGroupProps,
  ref: React.Ref<HTMLDivElement>,
): NavSubItemGroupState => {
  const { collapseMotion, ...rest } = props;
  const state = useNavSubItemGroupBase(rest, ref);

  return {
    ...state,
    components: {
      root: 'div',
      collapseMotion: Collapse,
    },
    collapseMotion: presenceMotionSlot(collapseMotion, {
      elementType: Collapse,
      defaultProps: {
        unmountOnExit: true,
        visible: state.open,
      },
    }),
  };
};
