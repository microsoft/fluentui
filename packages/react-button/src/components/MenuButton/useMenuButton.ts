import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { useMenuButtonState } from './useMenuButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const menuButtonShorthandProps = ['children', 'icon', 'menuIcon'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat({ deepMerge: menuButtonShorthandProps });

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
      icon: { as: 'span' },
      menuIcon: { as: 'span' },
    },
    defaultProps && resolveShorthandProps(defaultProps, menuButtonShorthandProps),
    resolveShorthandProps(props, menuButtonShorthandProps),
  ) as MenuButtonState;

  useMenuButtonState(state);

  return state;
};
