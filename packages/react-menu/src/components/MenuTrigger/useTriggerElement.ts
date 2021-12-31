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

interface ReactSyntheticEvent extends React.SyntheticEvent<HTMLElement> {
  // React 17
  _reactName: string | undefined;

  // React 16
  dispatchConfig:
    | {
        phasedRegistrationNames: {
          bubbled: string;
          captured: string;
        };
      }
    | undefined;
}

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

  const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

    if (openOnContext) {
      e.preventDefault();
      setOpen(e, { open: true, keyboard: false });
    }
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

    if (!openOnContext) {
      setOpen(e, { open: !open, keyboard: openedWithKeyboardRef.current });
      openedWithKeyboardRef.current = false;
    }
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
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }
    if (openOnHover && hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
    }
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

  // const mergedCallbacks = mergeSharedCallbacks(child?.props, rest, triggerProps);
  // const universalCallback = useUniversalEventCallback(mergedCallbacks);
  // const universalCallbacks: Record<string, typeof universalCallback> = {};
  // Object.keys(mergedCallbacks).forEach(callbackName => {
  //   universalCallbacks[callbackName] = universalCallback;
  // });

  // state.children = applyTriggerPropsToChildren(state.children, {
  //   ...rest,
  //   ...triggerProps,
  //   ...universalCallbacks,
  //   ref: useMergedRefs((typeof state.children !== 'function' && state.children.ref) || null, triggerRef, ref),
  // }) as React.ReactElement;

  state.children = useGenericTriggerElement(state.children, [triggerRef, ref], [rest, triggerProps]);

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

const useUniversalEventCallback = (callbacks: Record<string, React.EventHandler<React.SyntheticEvent>>) => {
  return useEventCallback((e: ReactSyntheticEvent) => {
    if (e.dispatchConfig) {
      callbacks[e.dispatchConfig.phasedRegistrationNames.bubbled]?.(e);
      callbacks[e.dispatchConfig.phasedRegistrationNames.captured]?.(e);
    }

    if (e._reactName) {
      const callbackName: string = e._reactName;
      callbacks[callbackName]?.(e);
    }
  });
};

const mergeCallbacks = (...args: (React.EventHandler<React.SyntheticEvent> | undefined)[]) => {
  const filtered = args.filter(cb => cb !== undefined) as React.EventHandler<React.SyntheticEvent>[];

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

const useGenericTriggerElement = (children: React.ReactNode, refs: React.Ref<unknown>[], overrideProps: {}[]) => {
  const child = onlyChild(children);
  const childRef = ((child as unknown) as { ref?: React.Ref<unknown> }).ref || null;

  const mergedCallbacks = mergeSharedCallbacks(child?.props, ...overrideProps);
  const universalCallback = useUniversalEventCallback(mergedCallbacks);
  const universalCallbacks: Record<string, typeof universalCallback> = {};
  Object.keys(mergedCallbacks).forEach(callbackName => {
    universalCallbacks[callbackName] = universalCallback;
  });

  const props = Object.assign({}, ...overrideProps, universalCallbacks);
  props.ref = useMergedRefs(childRef, ...refs);

  return applyTriggerPropsToChildren(child, props) as React.ReactElement;
};

/**
 * Accepts multiple props and merges event handler callbacks like `onClick` or `onBlur`
 * @param propsCollection - collection of props which can contain React event handler callbacks
 * @returns Map of event handler callback names to the merged event callback
 */
const mergeSharedCallbacks = (...propsCollection: React.DOMAttributes<Element>[]) => {
  const mergedCallbacks: Record<string, React.EventHandler<React.SyntheticEvent>> = {};

  propsCollection.forEach(props => {
    if (!props) {
      return;
    }

    for (const key in props) {
      if (
        typeof key === 'string' &&
        key.startsWith('on') &&
        typeof props[key as keyof React.DOMAttributes<HTMLElement>] === 'function'
      ) {
        const callback = props[
          key as keyof React.DOMAttributes<HTMLElement>
        ] as React.EventHandler<React.SyntheticEvent>;
        if (!mergedCallbacks[key]) {
          mergedCallbacks[key] = callback;
        } else {
          mergedCallbacks[key] = mergeCallbacks(mergedCallbacks[key], callback);
        }
      }
    }
  });

  return mergedCallbacks;
};
