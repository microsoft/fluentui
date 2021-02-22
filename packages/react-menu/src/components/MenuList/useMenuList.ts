import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs, useEventCallback } from '@fluentui/react-utilities';
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

  const { checkedValues, onCheckedValueChange } = state;
  state.toggleCheckbox = useEventCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string, checked: boolean) => {
      const checkedItems = checkedValues?.[name] || [];

      if (checked) {
        const newCheckedItems = [...checkedItems];
        newCheckedItems.splice(newCheckedItems.indexOf(value), 1);
        onCheckedValueChange?.(e, name, newCheckedItems);
      } else {
        onCheckedValueChange?.(e, name, [...checkedItems, value]);
      }
    },
    [onCheckedValueChange, checkedValues],
  );

  state.selectRadio = React.useCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string) => {
      const newCheckedItems = [value];
      onCheckedValueChange?.(e, name, newCheckedItems);
    },
    [onCheckedValueChange],
  );

  return state;
};
