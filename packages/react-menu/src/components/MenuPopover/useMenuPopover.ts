import * as React from 'react';
import { getCode, ArrowLeftKey, TabKey, ArrowRightKey } from '@fluentui/keyboard-key';
import { makeMergeProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { MenuPopoverProps, MenuPopoverState } from './MenuPopover.types';
import { useMenuContext } from '../../contexts/menuContext';
import { dispatchMenuEnterEvent } from '../../utils/index';
import { useFluent } from '@fluentui/react-shared-contexts';

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
  const isSubmenu = useMenuContext(context => context.isSubmenu);
  const canDispatchCustomEventRef = React.useRef(true);
  const throttleDispatchTimerRef = React.useRef(0);

  const { dir } = useFluent();
  const CloseArrowKey = dir === 'ltr' ? ArrowLeftKey : ArrowRightKey;

  // use DOM listener since react events propagate up the react tree
  // no need to do `contains` logic as menus are all positioned in different portals
  const mouseOverListenerCallbackRef = React.useCallback(
    (node: HTMLElement) => {
      if (node) {
        // Dispatches the custom menu mouse enter event with throttling
        // Needs to trigger on mouseover to support keyboard + mouse together
        // i.e. keyboard opens submenus while cursor is still on the parent
        node.addEventListener('mouseover', e => {
          if (canDispatchCustomEventRef.current) {
            canDispatchCustomEventRef.current = false;
            dispatchMenuEnterEvent(popoverRef.current as HTMLElement, e);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore #16889 Node setTimeout type leaking
            throttleDispatchTimerRef.current = setTimeout(() => (canDispatchCustomEventRef.current = true), 250);
          }
        });
      }
    },
    [popoverRef, throttleDispatchTimerRef],
  );

  React.useEffect(() => {
    () => clearTimeout(throttleDispatchTimerRef.current);
  }, []);

  const state = mergeProps(
    {
      role: 'presentation',
      children: null,
      inline: false,
      ref: useMergedRefs(ref, popoverRef, mouseOverListenerCallbackRef),
    },
    defaultProps,
    props,
  );

  state.inline = useMenuContext(context => context.inline);

  const { onMouseEnter: onMouseEnterOriginal, onKeyDown: onKeyDownOriginal } = state;

  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, { open: true, keyboard: false });
    }

    onMouseEnterOriginal?.(e);
  });

  state.onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    const keyCode = getCode(e);
    if (keyCode === 27 /* Escape */ || (isSubmenu && keyCode === CloseArrowKey)) {
      if (popoverRef.current?.contains(e.target as HTMLElement)) {
        setOpen(e, { open: false, keyboard: true });
      }
    }

    if (keyCode === TabKey) {
      setOpen(e, { open: false, keyboard: true });
      e.preventDefault();
    }

    onKeyDownOriginal?.(e);
  });

  return state;
};
