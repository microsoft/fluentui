import * as React from 'react';
import { makeMergeProps } from '@fluentui/react-utils';
import { useMenuListState } from './useMenuListState';
import { MenuListProps, MenuListState } from './MenuList.types';

const mergeProps = makeMergeProps();

/**
 * Given user props, returns state and render function for a Button.
 */
export const useMenuList = (props: MenuListProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuListProps) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
    },
    defaultProps,
  );

  useMenuListState(state);

  return state as MenuListState;
};
