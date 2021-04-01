import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuListContext } from '../../menuListContext';
import { useMenuItem, menuItemShorthandProps } from '../MenuItem/useMenuItem';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemRadioShorthandProps = [...menuItemShorthandProps, 'checkmark'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuItemRadioState>({ deepMerge: menuItemRadioShorthandProps });

/**
 * Given user props, returns state and render function for a MenuItemRadio.
 */
export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemRadioProps,
): MenuItemRadioState => {
  const baseState = useMenuItem(props, ref, {
    role: 'menuitemradio',
  });

  // React elements cannot be extended and will break `resolveShorthandProps`
  // set to undefined since it will be resolved again anyway
  ((baseState as unknown) as MenuItemRadioProps).checkmark = undefined;
  const state = mergeProps(baseState, defaultProps, resolveShorthandProps(props, menuItemRadioShorthandProps));

  const selectRadio = useMenuListContext(context => context.selectRadio);
  const { onClick: onClickOriginal } = state;
  const checked = useMenuListContext(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  state.checked = checked;
  state['aria-checked'] = state.checked;

  // MenuItem state already transforms keyDown to click events
  state.onClick = e => {
    if (state.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    selectRadio?.(e, state.name, state.value, state.checked);
    onClickOriginal?.(e);
  };

  return state;
};
