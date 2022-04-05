import * as React from 'react';
import { ArrowLeft, Tab, ArrowRight, Escape } from '@fluentui/keyboard-keys';
import { getNativeElementProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { MenuPopoverProps, MenuPopoverState } from './MenuPopover.types';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import { dispatchMenuEnterEvent } from '../../utils/index';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useIsSubmenu } from '../../utils/useIsSubmenu';

/**
 * Create the state required to render MenuPopover.
 *
 * The returned state can be modified with hooks such as useMenuPopoverStyles_unstable,
 * before being passed to renderMenuPopover_unstable.
 *
 * @param props - props from this instance of MenuPopover
 * @param ref - reference to root HTMLElement of MenuPopover
 */
export const useMenuPopover_unstable = (props: MenuPopoverProps, ref: React.Ref<HTMLElement>): MenuPopoverState => {
  const popoverRef = useMenuContext_unstable(context => context.menuPopoverRef);
  const setOpen = useMenuContext_unstable(context => context.setOpen);
  const openOnHover = useMenuContext_unstable(context => context.openOnHover);
  const isSubmenu = useIsSubmenu();
  const canDispatchCustomEventRef = React.useRef(true);
  const throttleDispatchTimerRef = React.useRef(0);

  const { dir } = useFluent();
  const CloseArrowKey = dir === 'ltr' ? ArrowLeft : ArrowRight;

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

  const inline = useMenuContext_unstable(context => context.inline) ?? false;
  const rootProps = getNativeElementProps('div', {
    role: 'presentation',
    ...props,
    ref: useMergedRefs(ref, popoverRef, mouseOverListenerCallbackRef),
  });

  const { onMouseEnter: onMouseEnterOriginal, onKeyDown: onKeyDownOriginal } = rootProps;

  rootProps.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, { open: true, keyboard: false });
    }

    onMouseEnterOriginal?.(e);
  });

  rootProps.onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    const key = e.key;

    if (key === Escape || (isSubmenu && key === CloseArrowKey)) {
      if (popoverRef.current?.contains(e.target as HTMLElement)) {
        setOpen(e, { open: false, keyboard: true });
      }
    }

    if (key === Tab) {
      setOpen(e, { open: false, keyboard: true });
      e.preventDefault();
    }

    onKeyDownOriginal?.(e);
  });

  return {
    inline,
    components: {
      root: 'div',
    },
    root: rootProps,
  };
};
