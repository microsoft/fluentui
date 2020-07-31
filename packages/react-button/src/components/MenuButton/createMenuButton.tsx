import * as React from 'react';
import { getSlots, simplifyShorthand, mergeProps } from '@fluentui/react-compose/lib/next/index';
import { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { useButton } from '../Button/useButton';
import { useExpanded } from './useExpanded';

/* eslint-disable react-hooks/rules-of-hooks */

const menuButtonShorthandProps = ['icon', 'children', 'menuIcon', 'menu'];

/**
 * Redefine the render function to add slots. Reuse the button structure but add
 * slots to children.
 * @param state
 */
const renderMenuButton = (state: MenuButtonState) => {
  const { slots, slotProps } = getSlots(state, menuButtonShorthandProps);
  const { iconOnly, expanded } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {!iconOnly && <slots.children {...slotProps.children} />}
      {!iconOnly && <slots.menuIcon {...slotProps.menuIcon} />}
      {expanded && <slots.menu {...slotProps.menu} />}
    </slots.root>
  );
};

/**
 * Redefine the component factory, reusing button factory.
 */
export const createMenuButton = (
  props: MenuButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuButtonProps,
) => {
  const state = mergeProps(
    {
      ref,
      as: props.href ? 'a' : 'button',
      icon: { as: 'span' },
      children: { as: 'span' },
      menuIcon: { as: 'span' },
      menu: { as: 'span' },
    },
    defaultProps,
    simplifyShorthand(props, menuButtonShorthandProps),
  ) as MenuButtonState;

  // It behaves like a button.
  useButton(state);

  // It can be expanded.
  useExpanded(state);

  return {
    state,
    render: renderMenuButton,
  };
};
