import * as React from 'react';
import { ButtonProps } from './Button.types';
import { compose, ComposePreparedOptions } from '@fluentui/react-compose';
import { useButton } from './useButton';

export const ButtonBase = compose<'button', ButtonProps, ButtonProps, {}, {}>(
  (props: ButtonProps, ref: React.Ref<HTMLButtonElement>, composeOptions: ComposePreparedOptions<ButtonProps>) => {
    const { slots, slotProps } = useButton(props, composeOptions);

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {props.loading && <slots.loader {...slotProps.loader} />}
        {props.icon && props.iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
        {!props.iconOnly && props.content && <slots.content {...slotProps.content} />}
        {props.icon && props.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
      </slots.root>
    );
  },
  {
    slots: {
      icon: 'span',
      content: 'span',
      loader: 'span',
    },
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
  },
);

ButtonBase.defaultProps = {
  as: 'button',
};
