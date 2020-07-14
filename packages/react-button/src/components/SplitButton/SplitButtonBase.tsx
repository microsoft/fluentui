import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useMergedRefs } from '@uifabric/react-hooks';
import { SplitButtonProps, SplitButtonSlots, SplitButtonSlotProps } from './SplitButton.types';
import { useSplitButton } from './useSplitButton';

export const SplitButtonBase = compose<'button', SplitButtonProps, SplitButtonProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps<SplitButtonProps, SplitButtonProps, SplitButtonSlots, SplitButtonSlotProps>(
      state,
      options,
    );
    const { buttonRef, children, expanded, icon, iconOnly, iconPosition, loading, menuButtonRef } = state;

    return (
      <slots.root ref={useMergedRefs(ref, buttonRef)} {...slotProps.root}>
        <slots.button {...slotProps.button}>
          {loading && <slots.loader {...slotProps.loader} />}
          {icon && iconPosition !== 'after' && <slots.icon {...slotProps.icon} />}
          {!iconOnly && children && <span>{children}</span>}
          {icon && iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
        </slots.button>
        <slots.divider {...slotProps.divider} />
        <slots.menuButton ref={menuButtonRef} {...slotProps.menuButton}>
          <slots.menuIcon {...slotProps.menuIcon} />
          {expanded && <slots.menu {...slotProps.menu} />}
        </slots.menuButton>
      </slots.root>
    );
  },
  {
    displayName: 'SplitButtonBase',
    handledProps: [
      'circular',
      'fluid',
      'iconOnly',
      'inverted',
      'loading',
      'menu',
      'menuIcon',
      'primary',
      'secondary',
      'size',
      'tokens',
    ],
    slots: {
      button: 'button',
      divider: 'span',
      icon: 'span',
      loader: 'span',
      menu: 'span',
      menuButton: 'button',
      menuIcon: 'span',
    },
    state: useSplitButton,
  },
);

SplitButtonBase.defaultProps = {
  as: 'button',
};
