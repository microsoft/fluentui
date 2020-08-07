import * as React from 'react';
import { mergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps } from './Button.types';
import { useButtonState } from './useButtonState';
import { renderButton } from './renderButton';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps = ['icon', 'loader', 'children'];

/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: ButtonProps) => {
  const state = mergeProps(
    {
      ref,
      as: 'button',
      icon: { as: 'span' },
      children: { as: 'span' },
      loader: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, buttonShorthandProps),
  );

  useButtonState(state);

  return { state, render: renderButton };
};
