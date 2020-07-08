import * as React from 'react';
import { ButtonProps, ButtonSlots, ButtonSlotProps } from './Button.types';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useButton } from './useButton';
import { useMergedRefs } from '@uifabric/react-hooks';

export const ButtonBase = compose<'button', ButtonProps, ButtonProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps<ButtonProps, ButtonProps, ButtonSlots, ButtonSlotProps>(state, options);

    return (
      <slots.root ref={useMergedRefs(ref, state.buttonRef)} {...slotProps.root}>
        {props.loading && <slots.loader {...slotProps.loader} />}
        {props.icon && props.iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
        {!props.iconOnly && props.content && <slots.content {...slotProps.content} />}
        {props.icon && props.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
      </slots.root>
    );
  },
  {
    displayName: 'ButtonBase',
    handledProps: [
      'buttonRef',
      'componentRef',
      'circular',
      'content',
      'fluid',
      'iconOnly',
      'iconPosition',
      'inverted',
      'loader',
      'loading',
      'primary',
      'secondary',
      'size',
      'tokens',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
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
