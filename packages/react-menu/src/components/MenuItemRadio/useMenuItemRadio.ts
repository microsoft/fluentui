import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuItemSelectable } from '../../selectable/index';

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
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef<HTMLElement>();
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
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
