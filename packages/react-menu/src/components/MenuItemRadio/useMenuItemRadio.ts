import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuItemSelectable } from '../../selectable/index';
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
  useMenuItemSelectable(state, selectRadio);
  return state;
};
