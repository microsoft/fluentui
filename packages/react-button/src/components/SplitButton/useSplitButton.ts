import * as React from 'react';
import { resolveShorthandProps, mergeProps } from '@fluentui/react-compose/lib/next/index';
import { menuButtonShorthandProps } from '../MenuButton/useMenuButton';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';
import { useSplitButtonState } from './useSplitButtonState';
import { renderSplitButton } from './renderSplitButton';

export const splitButtonShorthandProps = [...menuButtonShorthandProps, 'button', 'divider', 'loader', 'menuButton'];

/**
 * Redefine the component factory, reusing button factory.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: SplitButtonProps,
) => {
  // Note: because menu button's template and slots are different, we can't reuse
  // those, but the useMenuButtonState hook can reuse useButtonState.
  const state = mergeProps(
    {
      ref,
      as: 'button',
      button: { as: 'div', children: null },
      children: { as: 'span' },
      divider: { as: 'span', children: null },
      icon: { as: 'span' },
      loader: { as: 'span' },
      menu: { as: 'span' },
      menuButton: { as: 'div', children: null },
      menuIcon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, splitButtonShorthandProps),
  ) as SplitButtonState;

  useSplitButtonState(state);

  return {
    state,
    render: renderSplitButton,
  };
};
