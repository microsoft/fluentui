import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useMergedRefs } from '@uifabric/react-hooks';
import { MenuButtonProps, MenuButtonSlots, MenuButtonSlotProps } from './MenuButton.types';
import { useMenuButton } from './useMenuButton';

export const MenuButtonBase = compose<'button', MenuButtonProps, MenuButtonProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps<MenuButtonProps, MenuButtonProps, MenuButtonSlots, MenuButtonSlotProps>(
      state,
      options,
    );
    const { buttonRef, children, expanded, iconOnly, loading } = state;

    return (
      <slots.root ref={useMergedRefs(ref, buttonRef)} {...slotProps.root}>
        {loading && <slots.loader {...slotProps.loader} />}
        {!iconOnly && children && <span>{children}</span>}
        <slots.menuIcon {...slotProps.menuIcon} />
        {expanded && <slots.menu {...slotProps.menu} />}
      </slots.root>
    );
  },
  {
    displayName: 'MenuButtonBase',
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
      loader: 'span',
      menu: 'span',
      menuIcon: 'span',
    },
    state: useMenuButton,
  },
);

MenuButtonBase.defaultProps = {
  as: 'button',
};
