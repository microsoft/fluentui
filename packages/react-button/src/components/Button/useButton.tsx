import * as React from 'react';
import { mergeProps, getSlots, simplifyShorthand } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps, ButtonState } from './Button.types';
import { useButtonState } from './useButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonShorthandProps = ['icon', 'loader', 'children'];

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlots(state, buttonShorthandProps);
  const { loading, iconPosition, iconOnly } = state;

  return (
    <slots.root {...slotProps.root}>
      {loading && <slots.loader {...slotProps.loader} />}
      {iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
      {!iconOnly && <slots.children {...slotProps.children} />}
      {iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};

/**
 * Given user props, returns state and render function for a Button.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: ButtonProps) => {
  const state = mergeProps(
    {
      ref,
      as: props.href ? 'a' : 'button',
      icon: { as: 'span' },
      children: { as: 'span' },
      loader: { as: 'span' },
    },
    defaultProps,
    simplifyShorthand(props, buttonShorthandProps),
  );

  useButtonState(state);

  return { state, render: renderButton };
};
