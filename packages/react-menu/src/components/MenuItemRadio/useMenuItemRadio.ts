import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuItemSelectable } from '../../selectable/index';
import { useMergedRefs } from '@fluentui/react-hooks';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemRadioShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps<MenuItemRadioState>({ deepMerge: menuItemRadioShorthandProps });

/**
 * Given user props, returns state and render function for a MenuItemRadio.
 */
export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemRadioProps,
): MenuItemRadioState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      icon: { as: 'span' },
      checkmark: { as: 'span' },
      role: 'menuitemradio',
      tabIndex: 0,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemRadioShorthandProps),
  );

  useMenuItemSelectable(state, () => [state.value]);
  return state;
};
