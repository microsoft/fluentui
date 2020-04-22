import * as React from 'react';
import { ButtonProps, ButtonOptions, ButtonSlots, ButtonSlotProps } from './Button.types';
import { compose, ComposeStandardStatics } from '../utils/compose';
import { useButton } from './useButton';

export const ButtonBase = compose<ButtonProps, ButtonSlots, ButtonSlotProps, ComposeStandardStatics>(
  // render function
  (props: ButtonProps, ref: React.RefObject<HTMLElement>, options: ButtonOptions) => {
    const { slots, slotProps } = useButton(props, options);

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
    defaultProps: {
      as: 'button',
    },
    slots: {
      icon: 'span',
      content: 'span',
      loader: null,
    },
    statics: {
      displayName: 'ButtonBase',
    },
  },
);
