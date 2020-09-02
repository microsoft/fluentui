import * as React from 'react';
import { resolveShorthandProps, mergeProps } from '@fluentui/react-compose/lib/next/index';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';
import { useSplitButtonState } from './useSplitButtonState';
import { renderSplitButton } from './renderSplitButton';

export const splitButtonShorthandProps = ['button', 'divider', 'menuButton'];

/**
 * Redefine the component factory, reusing button factory.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: SplitButtonProps,
) => {
  const state = mergeProps(
    {
      ref,
      as: 'button',

      button: { as: 'span', children: null },
      divider: { as: 'span', children: null },
      menuButton: { as: 'span', children: null },
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
