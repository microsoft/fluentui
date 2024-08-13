import * as React from 'react';
import { ArrowLeft, Tab, ArrowRight, Escape } from '@fluentui/keyboard-keys';
import { getIntrinsicElementProps, useEventCallback, useMergedRefs, slot, useTimeout } from '@fluentui/react-utilities';
import { MenuPopoverProps, MenuPopoverState } from './MenuPopover.types';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import { dispatchMenuEnterEvent } from '../../utils/index';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsSubmenu } from '../../utils/useIsSubmenu';
import { useRestoreFocusSource } from '@fluentui/react-tabster';

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
  'use no memo';

  const popoverRef = useMenuContext_unstable(context => context.menuPopoverRef);
  const setOpen = useMenuContext_unstable(context => context.setOpen);
  const open = useMenuContext_unstable(context => context.open);
  const openOnHover = useMenuContext_unstable(context => context.openOnHover);
  const triggerRef = useMenuContext_unstable(context => context.triggerRef);
  const isSubmenu = useIsSubmenu();
  const canDispatchCustomEventRef = React.useRef(true);
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  const [setThrottleTimeout, clearThrottleTimeout] = useTimeout();

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
            setThrottleTimeout(() => (canDispatchCustomEventRef.current = true), 250);
          }
        });
      }
    },
    [popoverRef, setThrottleTimeout],
  );

  React.useEffect(() => {
    () => clearThrottleTimeout();
  }, [clearThrottleTimeout]);

  const inline = useMenuContext_unstable(context => context.inline) ?? false;
  const mountNode = useMenuContext_unstable(context => context.mountNode);

  const rootProps = slot.always(
    getIntrinsicElementProps('div', {
      role: 'presentation',
      ...restoreFocusSourceAttributes,
      ...props,
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: useMergedRefs(ref, popoverRef, mouseOverListenerCallbackRef) as React.Ref<HTMLDivElement>,
    }),
    { elementType: 'div' },
  );
  const { onMouseEnter: onMouseEnterOriginal, onKeyDown: onKeyDownOriginal } = rootProps;
  rootProps.onMouseEnter = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover || isSubmenu) {
      setOpen(event, { open: true, keyboard: false, type: 'menuPopoverMouseEnter', event });
    }
    onMouseEnterOriginal?.(event);
  });
  rootProps.onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    if (key === Escape || (isSubmenu && key === CloseArrowKey)) {
      if (open && popoverRef.current?.contains(event.target as HTMLElement) && !event.isDefaultPrevented()) {
        setOpen(event, { open: false, keyboard: true, type: 'menuPopoverKeyDown', event });
        // stop propagation to avoid conflicting with other elements that listen for `Escape`
        // e,g: Dialog, Popover, Menu and Tooltip
        event.preventDefault();
      }
    }
    if (key === Tab) {
      setOpen(event, { open: false, keyboard: true, type: 'menuPopoverKeyDown', event });
      if (!isSubmenu) {
        triggerRef.current?.focus();
      }
    }
    onKeyDownOriginal?.(event);
  });
  return { inline, mountNode, components: { root: 'div' }, root: rootProps };
};
