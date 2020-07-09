import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useMergedRefs } from '@uifabric/react-hooks';
import { ButtonProps, ButtonSlots, ButtonSlotProps } from './Button.types';
import { useButton } from './useButton';

export const ButtonBase = compose<'button', ButtonProps, ButtonProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps<ButtonProps, ButtonProps, ButtonSlots, ButtonSlotProps>(state, options);

    const { buttonRef, children, icon, iconOnly, iconPosition, loading } = state;

    return (
      <slots.root ref={useMergedRefs(ref, buttonRef)} {...slotProps.root}>
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
