import * as React from 'react';
import { ButtonProps } from './Button.types';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useButton } from './useButton';

export const ButtonBase = compose<'button', ButtonProps, ButtonProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { children, icon, iconOnly, iconPosition, loading } = state;
    const { slots, slotProps } = mergeProps(state, options);

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {loading && <slots.loader {...slotProps.loader} />}
        {icon && iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
        {!iconOnly && children && <span>{children}</span>}
        {icon && iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
      </slots.root>
    );
  },
  {
    displayName: 'ButtonBase',
    handledProps: [
      'circular',
      'disabled',
      'fluid',
      'iconOnly',
      'iconPosition',
      'inverted',
      'loader',
      'loading',
      'primary',
      'secondary',
      'size',
    ],
    slots: {
      icon: 'span',
      loader: 'span',
    },
    state: useButton,
  },
);

ButtonBase.defaultProps = {
  as: 'button',
};
