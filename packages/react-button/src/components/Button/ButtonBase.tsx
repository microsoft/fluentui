import * as React from 'react';
import { ButtonProps, ButtonSlots, ButtonSlotProps } from './Button.types';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useButton } from './useButton';
import { useMergedRefs } from '@uifabric/react-hooks';

export const ButtonBase = compose<'button', ButtonProps, ButtonProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { children, icon, iconOnly, iconPosition, loading } = state;
    const { slots, slotProps } = mergeProps<ButtonProps, ButtonProps, ButtonSlots, ButtonSlotProps>(state, options);

    return (
      <slots.root ref={useMergedRefs(ref, state.buttonRef)} {...slotProps.root}>
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
      'buttonRef',
      'componentRef',
      'circular',
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
      // tslint:disable-next-line: no-any
    ] as any,
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
