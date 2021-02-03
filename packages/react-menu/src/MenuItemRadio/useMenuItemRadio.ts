import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuListContext } from '../menuListContext';
import { useMenuItemSelectable } from '../selectable';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemRadioShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps<MenuItemRadioProps>({ deepMerge: menuItemRadioShorthandProps });

/**
 * Given user props, returns state and render function for a Button.
 */
export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemRadioProps,
): MenuItemRadioState => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef<HTMLElement>();
  const mergedProps = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
      icon: { as: 'span' },
      checkmark: { as: 'span' },
      role: 'menuitemcheckbox',
      tabIndex: 0,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemRadioShorthandProps),
  );

  const { checkedValues: { [mergedProps.name]: checkedItems = [] } = {}, onCheckedValuesChange } = useMenuListContext();

  const state: MenuItemRadioState = {
    checkedItems,
    onCheckedValuesChange: onCheckedValuesChange || (() => null),
    checked: checkedItems[0] === mergedProps.value,
    ...mergedProps,
  };

  useMenuItemSelectable(state, () => [state.value]);
  return state;
};
