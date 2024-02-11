import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
import type { MenuItemLinkProps, MenuItemLinkState } from './MenuItemLink.types';
import { useMenuItem_unstable } from '../MenuItem/useMenuItem';
import { MenuItemProps } from '../MenuItem/MenuItem.types';
import { useMenuContext_unstable } from '../../index';

/**
 * Create the state required to render MenuItemLink.
 *
 * The returned state can be modified with hooks such as useMenuItemLinkStyles_unstable,
 * before being passed to renderMenuItemLink_unstable.
 *
 * @param props - props from this instance of MenuItemLink
 * @param ref - reference to root HTMLElement of MenuItemLink
 */
export const useMenuItemLink_unstable = (
  props: MenuItemLinkProps,
  ref: React.Ref<HTMLAnchorElement>,
): MenuItemLinkState => {
  // casting because the root slot changes from div to a
  const baseState = useMenuItem_unstable(props as MenuItemProps, null);
  const setOpen = useMenuContext_unstable(context => context.setOpen);
  const open = useMenuContext_unstable(context => context.open);

  const _props = { ...props };
  _props.onClick = useEventCallback(event => {
    if (open) {
      setOpen(event, { open: false, type: 'menuItemClick', event });
    }
    props.onClick?.(event);
  });

  return {
    ...baseState,
    components: {
      ...baseState.components,
      root: 'a',
    },
    root: slot.always(
      getIntrinsicElementProps('a', {
        ref,
        role: 'menuitem',
       // FIXME: casting because the root slot changes from div to a,
        // ideal solution would be to extract common logic from useMenuItem_unstable root
        // and use it in both without assuming element type
        ...(baseState.root as ExtractSlotProps<Slot<'a'>>),
      }),
      { elementType: 'a' },
    ),
  };
};
