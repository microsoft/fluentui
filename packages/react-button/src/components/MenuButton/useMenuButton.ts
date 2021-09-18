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
 * Given user props, defines default props for the MenuButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the MenuButton component.
 * @param ref - User provided ref to be passed to the MenuButton component.
 */
export const useMenuButton = (props: MenuButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuButtonProps) => {
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
  );

  useMenuButtonState(state);

  return state;
};
