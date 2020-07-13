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
    const { buttonRef, children, expanded, iconOnly } = state;

    return (
      <slots.root ref={useMergedRefs(ref, buttonRef)} {...slotProps.root}>
        {!iconOnly && children && <span>{children}</span>}
        <slots.menuIcon {...slotProps.menuIcon} />
        {expanded && <slots.menu {...slotProps.menu} />}
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
      menu: 'span',
      menuIcon: 'span',
    },
    state: useSplitButton,
  },
);

SplitButtonBase.defaultProps = {
  as: 'button',
};
