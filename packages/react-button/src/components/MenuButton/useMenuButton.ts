import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { useMenuButtonState } from './useMenuButtonState';
import type { MenuButtonProps, MenuButtonShorthandPropsCompat, MenuButtonState } from './MenuButton.types';

/**
 * Consts listing which props are shorthand props.
 */
export const menuButtonShorthandPropsCompat: MenuButtonShorthandPropsCompat[] = ['icon', 'menuIcon'];

const mergeProps = makeMergeProps<MenuButtonState>({ deepMerge: menuButtonShorthandPropsCompat });

/**
 * Given user props, returns the final state for a MenuButton.
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
      type: 'button', // This is added because the default for type is 'submit'
    },
    defaultProps && resolveShorthandProps(defaultProps, menuButtonShorthandPropsCompat),
    resolveShorthandProps(props, menuButtonShorthandPropsCompat),
  ) as MenuButtonState;

  useMenuButtonState(state);

  return state;
};
