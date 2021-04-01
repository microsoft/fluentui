import * as React from 'react';
import { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuListContext } from '../../contexts/menuListContext';
import { useMenuItem, menuItemShorthandProps } from '../MenuItem/useMenuItem';
import { AcceptIcon } from '../../utils/DefaultIcons';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemRadioShorthandProps = [...menuItemShorthandProps] as const;

/**
 * Given user props, returns state and render function for a MenuItemRadio.
 */
export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemRadioProps,
): MenuItemRadioState => {
  const state = useMenuItem(props, ref, {
    checkmark: { as: 'span', children: <AcceptIcon /> },
    ...defaultProps,
  }) as MenuItemRadioState;

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
