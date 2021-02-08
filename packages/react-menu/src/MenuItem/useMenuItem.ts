import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';
import { MenuItemProps, MenuItemState } from './MenuItem.types';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon'];

const mergeProps = makeMergeProps({ deepMerge: menuItemShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem = (
  props: MenuItemProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemProps,
): MenuItemState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'div',
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  return state;
};
