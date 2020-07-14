import * as React from 'react';
import { mergeSlotProp, ComposePreparedOptions } from '@fluentui/react-compose';
import { useMenuButton } from '../MenuButton/useMenuButton';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';

/**
 * The useSplitButton hook processes the SplitButton component props and returns state.
 * @param props - SplitButton props to derive state from.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  options: ComposePreparedOptions,
): SplitButtonState => {
  const { button, menuButton } = props;
  const { onClick, ...menuButtonProps } = props;

  const menuButtonState = useMenuButton(menuButtonProps, ref, options);
  const { expanded, menu, onClick: onMenuButtonClick, onKeyDown, ...rest } = menuButtonState;

  const state = {
    ...rest,
    'aria-expanded': expanded,
    expanded,
    onKeyDown,
    tabIndex: 0,

    // Button slot props.
    button: mergeSlotProp(button, {
      onClick,
      onKeyDown,
      tabIndex: -1,
    }),

    // Menu slot props.
    menu,

    // Menu button slot props.
    menuButton: mergeSlotProp(menuButton, {
      'aria-expanded': expanded,
      onClick: onMenuButtonClick,
      onKeyDown,
      tabIndex: -1,
    }),
  };

  return state;
};
