import * as React from 'react';
import { ButtonProps } from './Button.types';
import { compose } from '@fluentui/react-compose';
import { useButton } from './useButton';

export const ButtonBase = compose<'button', ButtonProps, ButtonProps, {}, {}>(
  // render function
  (props, ref, composeOptions) => {
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
  },
);

ButtonBase.defaultProps = {
  as: 'button',
};
