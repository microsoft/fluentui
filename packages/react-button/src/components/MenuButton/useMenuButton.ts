import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { MenuButtonProps, MenuButtonShorthandProps, MenuButtonState } from './MenuButton.types';
import { useMenuButtonState } from './useMenuButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const menuButtonShorthandProps: MenuButtonShorthandProps[] = ['children', 'icon', 'menuIcon'];

const mergeProps = makeMergeProps<MenuButtonState>({ deepMerge: menuButtonShorthandProps });

/**
 * Redefine the component factory, reusing button factory.
 */
export const useMenuButton = (props: MenuButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuButtonProps) => {
  // Note: because menu button's template and slots are different, we can't reuse
  // those, but the useMenuButtonState hook can reuse useButtonState.
  const state = mergeProps(
    {
      ref,
      as: 'button',
      // Button slots
      icon: { as: 'span' },
      // MenuButton slots
      menuIcon: { as: 'span' },
      // Non-slot props
      size: 'medium',
    },
    defaultProps && resolveShorthandProps(defaultProps, menuButtonShorthandProps),
    resolveShorthandProps(props, menuButtonShorthandProps),
  ) as MenuButtonState;

  useMenuButtonState(state);

  return state;
};
