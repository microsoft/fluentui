import * as React from 'react';
import { ButtonProps } from './Button.types';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useButton } from './useButton';

export const ButtonBase = compose<'button', ButtonProps, ButtonProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps(state, options);

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {state.children ? (
          state.children
        ) : (
          <>
            {props.loading && <slots.loader {...slotProps.loader} />}
            {props.icon && props.iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
            {!props.iconOnly && props.content && <slots.content {...slotProps.content} />}
            {props.icon && props.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
          </>
        )}
      </slots.root>
    );
  },
  {
    displayName: 'ButtonBase',
    handledProps: [
      'circular',
      'content',
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
      content: 'span',
      loader: 'span',
    },
    state: useButton,
  },
);

ButtonBase.defaultProps = {
  as: 'button',
};
