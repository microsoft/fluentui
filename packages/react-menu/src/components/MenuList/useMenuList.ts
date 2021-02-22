import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuListProps, MenuListState } from './MenuList.types';

const mergeProps = makeMergeProps<MenuListState>();

/**
 * Returns the props and state required to render the component
 */
export const useMenuList = (
  props: MenuListProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuListProps,
): MenuListState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      role: 'menu',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return state;
};
