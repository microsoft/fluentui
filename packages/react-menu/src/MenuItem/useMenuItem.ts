import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMenuItemState } from './useMenuItemState';
import { MenuItemProps, MenuItemState } from './MenuItem.types';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps({ deepMerge: menuItemShorthandProps });

/**
 * Given user props, returns state and render function for a Button.
 */
export const useMenuItem = (props: MenuItemProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuItemProps) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
      icon: { as: 'span' },
      checkmark: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, menuItemShorthandProps),
  );

  useMenuItemState(state);

  return state as MenuItemState;
};
