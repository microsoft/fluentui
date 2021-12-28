import * as React from 'react';
import { ArrowRight, ArrowDown, ArrowLeft, Escape } from '@fluentui/keyboard-keys';
import {
  applyTriggerPropsToChildren,
  onlyChild,
  shouldPreventDefaultOnKeyDown,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useMenuContext } from '../../contexts/menuContext';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useIsSubmenu } from '../../utils/useIsSubmenu';
import type { MenuTriggerChildProps, MenuTriggerState } from './MenuTrigger.types';

const isTargetDisabled = (e: React.SyntheticEvent | Event) => {
  const isDisabled = (el: HTMLElement) => el.hasAttribute('disabled') || el.hasAttribute('aria-disabled');
  if (e.target instanceof HTMLElement && isDisabled(e.target)) {
    return true;
  }

  if (e.currentTarget instanceof HTMLElement && isDisabled(e.currentTarget)) {
    return true;
  }

  return false;
};

/**
 * Adds the necessary props to the trigger element
 */
export const useTriggerElement = (state: MenuTriggerState, ref: React.Ref<HTMLElement>): MenuTriggerState => {
  const { children, ...rest } = state;
  const triggerRef = useMenuContext(context => context.triggerRef);
  const menuPopoverRef = useMenuContext(context => context.menuPopoverRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const open = useMenuContext(context => context.open);
  const triggerId = useMenuContext(context => context.triggerId);
  const openOnHover = useMenuContext(context => context.openOnHover);
  const openOnContext = useMenuContext(context => context.openOnContext);
  const isSubmenu = useIsSubmenu();
  const { findFirstFocusable } = useFocusFinders();
  const focusFirst = React.useCallback(() => {
    const firstFocusable = findFirstFocusable(menuPopoverRef.current);
    firstFocusable?.focus();
  }, [findFirstFocusable, menuPopoverRef]);

  const openedWithKeyboardRef = React.useRef(false);
  const hasMouseMoved = React.useRef(false);

  const { dir } = useFluent();
  const OpenArrowKey = dir === 'ltr' ? ArrowRight : ArrowLeft;

  const child = React.isValidElement(state.children) ? onlyChild(state.children) : undefined;

  const onContextMenu = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

    if (openOnContext) {
      e.preventDefault();
      setOpen(e, { open: true, keyboard: false });
    }

    child?.props?.onContextMenu?.(e);
  });

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

    if (!openOnContext) {
      setOpen(e, { open: !open, keyboard: openedWithKeyboardRef.current });
      openedWithKeyboardRef.current = false;
    }

    child?.props?.onClick?.(e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

    if (shouldPreventDefaultOnKeyDown(e)) {
      e.preventDefault();
      openedWithKeyboardRef.current = true;
      (e.target as HTMLElement)?.click();
    }

    const key = e.key;

    if (!openOnContext && ((isSubmenu && key === OpenArrowKey) || (!isSubmenu && key === ArrowDown))) {
      setOpen(e, { open: true, keyboard: true });
    }

    if (key === Escape && !isSubmenu) {
      setOpen(e, { open: false, keyboard: true });
    }

    // if menu is already open, can't rely on effects to focus
    if (open && key === OpenArrowKey && isSubmenu) {
      focusFirst();
    }

    child?.props?.onKeyDown?.(e);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }
    if (openOnHover && hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
    }

    child?.props?.onMouseEnter?.(e);
  };

  // Opening a menu when a mouse hasn't moved and just entering the trigger is a bad a11y experience
  // First time open the mouse using mousemove and then continue with mouseenter
  // Only use once to determine that the user is using the mouse since it is an expensive event to handle
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }
    if (openOnHover && !hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
      hasMouseMoved.current = true;
    }
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }
    if (openOnHover) {
      setOpen(e, { open: false, keyboard: false });
    }

    child?.props?.onMouseLeave?.(e);
  };

  const triggerProps: MenuTriggerChildProps = {
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    id: child?.props?.id || triggerId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onContextMenu,
    onMouseMove,
  };

  if (!open && !isSubmenu) {
    triggerProps['aria-expanded'] = undefined;
  }

  const mergedCallbacks = mergeSharedCallbacks(child?.props, rest, triggerProps);

  state.children = applyTriggerPropsToChildren(state.children, {
    ...rest,
    ...triggerProps,
    ...mergedCallbacks,
    ref: useMergedRefs((typeof state.children !== 'function' && state.children.ref) || null, triggerRef, ref),
  }) as React.ReactElement;

  return state as MenuTriggerState;
};

// Utilities to merge callbacks
const mergeTwoCallbacks = <TEvent extends React.SyntheticEvent>(
  a: React.EventHandler<TEvent> | undefined,
  b: React.EventHandler<TEvent> | undefined,
): React.EventHandler<TEvent> => {
  if ((!a || !b) && (a || b)) {
    if (a) {
      return a;
    }

    if (b) {
      return b;
    }
  }

  return (event: TEvent) => {
    a?.(event);
    b?.(event);
  };
};

const mergeCallbacks = <TEvent extends React.SyntheticEvent>(...args: (React.EventHandler<TEvent> | undefined)[]) => {
  const filtered = args.filter(cb => cb !== undefined) as React.EventHandler<TEvent>[];

  return filtered.reduce(
    (mergedCallback, callback) => {
      if (callback) {
        return mergeTwoCallbacks(mergedCallback, callback);
      }

      return mergedCallback;
    },
    () => null,
  );
};

/**
 * Accepts multiple props and merges shared event handler callback like `onClick` or `onBlur`
 * @param propsCollection - collection of props which can contain React event handler callbacks
 * @returns Map of event handler callback names to the merge event callback
 */
const mergeSharedCallbacks = (...propsCollection: React.DOMAttributes<Element>[]) => {
  const callbacks: Record<string, React.EventHandler<React.SyntheticEvent>[]> = {};

  propsCollection.forEach(props => {
    if (!props) {
      return;
    }

    for (const key in props) {
      if (
        typeof key === 'string' &&
        key.startsWith('on') &&
        typeof props[key as keyof React.DOMAttributes<Element>] === 'function'
      ) {
        callbacks[key] ??= [];
        callbacks[key].push(
          props[key as keyof React.DOMAttributes<Element>] as React.EventHandler<React.SyntheticEvent>,
        );
      }
    }
  });

  Object.keys(callbacks).forEach(callback => {
    if (callbacks[callback].length <= 1) {
      delete callbacks[callback];
    }
  });

  const mergedCallbacks: Record<string, React.EventHandler<React.SyntheticEvent>> = {};
  for (const callback in callbacks) {
    if (Object.prototype.hasOwnProperty.call(callbacks, callback)) {
      mergedCallbacks[callback] = mergeCallbacks(...callbacks[callback]);
    }
  }

  return mergedCallbacks;
};
