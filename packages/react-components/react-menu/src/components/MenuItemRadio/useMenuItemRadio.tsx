import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { Checkmark16Filled } from '@fluentui/react-icons';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import { useMenuItem_unstable } from '../MenuItem/useMenuItem';
import type { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';

/**
 * Given user props, returns state and render function for a MenuItemRadio.
 */
export const useMenuItemRadio_unstable = (
  props: MenuItemRadioProps,
  ref: React.Ref<HTMLElement>,
): MenuItemRadioState => {
  const radioProps = {
    role: 'menuitemradio',
  };

  const state = useMenuItem_unstable(
    {
      ...radioProps,
      ...props,
      checkmark: resolveShorthand(props.checkmark, {
        defaultProps: { children: <Checkmark16Filled /> },
        required: true,
      }),
    },
    ref,
  ) as MenuItemRadioState;

  const selectRadio = useMenuListContext_unstable(context => context.selectRadio);
  const { onClick: onClickOriginal } = state.root;
  const checked = useMenuListContext_unstable(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  state.checked = checked;
  state.root['aria-checked'] = state.checked;

  // MenuItem state already transforms keyDown to click events
  state.root.onClick = e => {
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
