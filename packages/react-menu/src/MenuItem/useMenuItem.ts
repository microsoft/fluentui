import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuItemProps, MenuItemState } from './MenuItem.types';
import { useMenuListContext } from '../menuListContext';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps({ deepMerge: menuItemShorthandProps });

/** Returns the props and state required to render the component */
export const useMenuItem = (
  props: MenuItemProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemProps,
): MenuItemState => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const { checkedValues, onCheckedValuesChange } = useMenuListContext();

  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  if (checkedValues || onCheckedValuesChange) {
    state.hasCheckMark = true;
  }

  return state;
};
