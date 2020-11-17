import * as React from 'react';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-compose/lib/next/index';
import { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { useMenuButtonState } from './useMenuButtonState';
import { renderMenuButton } from './renderMenuButton';

export const menuButtonShorthandProps = ['icon', 'content', 'menuIcon', 'menu'];

const mergeProps = makeMergeProps({ deepMerge: menuButtonShorthandProps });

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
      content: { as: 'span', children: props.children },
      menuIcon: { as: 'span' },
      menu: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, menuButtonShorthandProps),
  ) as MenuButtonState;

  useMenuButtonState(state);

  return {
    state,
    render: renderMenuButton,
  };
};
