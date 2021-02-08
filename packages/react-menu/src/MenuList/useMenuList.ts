import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';
import { MenuListProps, MenuListState } from './MenuList.types';

const mergeProps = makeMergeProps();

/**
 * Returns the props and state required to render the component
 */
export const useMenuList = (props: MenuListProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuListProps) => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'div',
      role: 'menu',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return state as MenuListState;
};
