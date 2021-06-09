import * as React from 'react';
import { makeMergeProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { MenuPopoverProps, MenuPopoverState } from './MenuPopover.types';
import { useMenuContext } from '../../contexts/menuContext';
import { isOutsideMenu } from '../../utils/index';

const mergeProps = makeMergeProps<MenuPopoverState>({});

/**
 * Create the state required to render MenuPopover.
 *
 * The returned state can be modified with hooks such as useMenuPopoverStyles,
 * before being passed to renderMenuPopover.
 *
 * @param props - props from this instance of MenuPopover
 * @param ref - reference to root HTMLElement of MenuPopover
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useMenuPopover = (
  props: MenuPopoverProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuPopoverProps,
): MenuPopoverState => {
  const popoverRef = useMenuContext(context => context.menuPopoverRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const triggerRef = useMenuContext(context => context.triggerRef);
  const openOnHover = useMenuContext(context => context.openOnHover);
  const openOnContext = useMenuContext(context => context.openOnContext);

  const state = mergeProps(
    {
      role: 'presentation',
      isSubmenu: false,
      children: null,
      inline: false,
      ref: useMergedRefs(ref, popoverRef),
    },
    defaultProps,
    props,
  );

  state.isSubmenu = useMenuContext(context => context.isSubmenu);
  state.inline = useMenuContext(context => context.inline);

  const { onMouseEnter: onMouseEnterOriginal, onBlur: onBlurOriginal, onKeyDown: onKeyDownOriginal } = state;

  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !openOnContext) {
      setOpen(e, { open: true, keyboard: false });
    }

    onMouseEnterOriginal?.(e);
  });

  state.onBlur = useEventCallback((e: React.FocusEvent<HTMLElement>) => {
    if (isOutsideMenu({ triggerRef, menuPopoverRef: popoverRef, event: e })) {
      setOpen(e, { open: false, keyboard: false });
    }

    onBlurOriginal?.(e);
  });

  state.onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' || (state.isSubmenu && e.key === 'ArrowLeft')) {
      setOpen(e, { open: false, keyboard: true });
      e.stopPropagation(); // Left and Escape should only close one menu at a time
    }

    onKeyDownOriginal?.(e);
  });

  return state;
};
