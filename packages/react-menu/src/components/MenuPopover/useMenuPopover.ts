import * as React from 'react';
import { makeMergeProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { MenuPopoverProps, MenuPopoverState } from './MenuPopover.types';
import { useMenuContext } from '../../contexts/menuContext';
import { dispatchMenuEnterEvent } from '../../utils/index';

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
  const openOnHover = useMenuContext(context => context.openOnHover);
  const openOnContext = useMenuContext(context => context.openOnContext);
  const isSubmenu = useMenuContext(context => context.isSubmenu);

  // use the native mouseenter for dispatching custom event since it does not bubble
  // https://reactjs.org/docs/events.html#mouse-events
  const mouseEnterListenerRef = React.useCallback((node: HTMLElement) => {
    if (node) {
      node.addEventListener('mouseenter', e => {
        dispatchMenuEnterEvent(e.target as HTMLElement, e);
      });
    }
  }, []);

  const state = mergeProps(
    {
      role: 'presentation',
      children: null,
      inline: false,
      ref: useMergedRefs(ref, popoverRef, mouseEnterListenerRef),
    },
    defaultProps,
    props,
  );

  state.inline = useMenuContext(context => context.inline);

  const { onMouseEnter: onMouseEnterOriginal, onKeyDown: onKeyDownOriginal } = state;

  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !openOnContext) {
      setOpen(e, { open: true, keyboard: false });
    }

    onMouseEnterOriginal?.(e);
  });

  state.onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' || (isSubmenu && e.key === 'ArrowLeft')) {
      if (popoverRef.current?.contains(e.target as HTMLElement)) {
        setOpen(e, { open: false, keyboard: true });
      }
    }

    if (e.key === 'Tab') {
      setOpen(e, { open: false, keyboard: true });
      e.preventDefault();
    }

    onKeyDownOriginal?.(e);
  });

  return state;
};
