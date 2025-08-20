import * as React from 'react';
import {
  resolvePositioningShorthand,
  usePositioningMouseTarget,
  usePositioning,
  useSafeZoneArea,
  type PositioningShorthandValue,
} from '@fluentui/react-positioning';
import {
  useControllableState,
  useId,
  useOnClickOutside,
  useEventCallback,
  useOnScrollOutside,
  elementContains,
  useTimeout,
  useFirstMount,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useFocusFinders } from '@fluentui/react-tabster';

import { useMenuContext_unstable } from '../../contexts/menuContext';
import { MENU_SAFEZONE_TIMEOUT_EVENT, MENU_ENTER_EVENT, useOnMenuMouseEnter, useIsSubmenu } from '../../utils';
import { menuItemClassNames } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuOpenChangeData, MenuOpenEvent, MenuProps, MenuState } from './Menu.types';

// If it's not possible to position the submenu in smaller viewports, try
// and fallback to this order of positions
const submenuFallbackPositions: PositioningShorthandValue[] = [
  'after',
  'after-bottom',
  'before-top',
  'before',
  'before-bottom',
  'above',
];

/**
 * Create the state required to render Menu.
 *
 * The returned state can be modified with hooks such as useMenuStyles,
 * before being passed to renderMenu_unstable.
 *
 * @param props - props from this instance of Menu
 */
export const useMenu_unstable = (props: MenuProps & { safeZone?: boolean | { timeout?: number } }): MenuState => {
  const isSubmenu = useIsSubmenu();
  const {
    hoverDelay = 500,
    inline = false,
    hasCheckmarks = false,
    hasIcons = false,
    closeOnScroll = false,
    openOnContext = false,
    persistOnItemClick = false,
    openOnHover = isSubmenu,
    defaultCheckedValues,
    mountNode = null,
    safeZone,
  } = props;

  const { targetDocument } = useFluent();
  const triggerId = useId('menu');
  const [contextTarget, setContextTarget] = usePositioningMouseTarget();

  const positioningOptions = {
    position: isSubmenu ? 'after' : 'below',
    align: isSubmenu ? 'top' : 'start',
    target: props.openOnContext ? contextTarget : undefined,
    fallbackPositions: isSubmenu ? submenuFallbackPositions : undefined,
    ...resolvePositioningShorthand(props.positioning),
  } as const;

  const children = React.Children.toArray(props.children) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (children.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('Menu must contain at least one child');
    }

    if (children.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('Menu must contain at most two children');
    }
  }

  let menuTrigger: React.ReactElement | undefined = undefined;
  let menuPopover: React.ReactElement | undefined = undefined;
  if (children.length === 2) {
    menuTrigger = children[0];
    menuPopover = children[1];
  } else if (children.length === 1) {
    menuPopover = children[0];
  }

  const { targetRef, containerRef } = usePositioning(positioningOptions);

  const enableSafeZone = safeZone && openOnHover;
  const safeZoneDescriptorRef = React.useRef({
    isInside: false,
    mouseCoordinates: { x: 0, y: 0 },
  });

  const safeZoneHandle = useSafeZoneArea({
    disabled: !enableSafeZone,
    timeout: typeof safeZone === 'object' ? safeZone.timeout : 300,

    onSafeZoneEnter: e => {
      setOpen(e, { open: true, keyboard: false, type: 'menuSafeZoneMouseEnter', event: e });
      safeZoneDescriptorRef.current.isInside = true;
    },
    onSafeZoneLeave: () => {
      safeZoneDescriptorRef.current.isInside = false;
    },
    onSafeZoneMove: e => {
      safeZoneDescriptorRef.current.mouseCoordinates = {
        x: e.clientX,
        y: e.clientY,
      };
    },
    onSafeZoneTimeout: () => {
      const event = new CustomEvent(MENU_SAFEZONE_TIMEOUT_EVENT);

      setOpen(event, { open: false, keyboard: false, type: 'menuSafeZoneTimeout', event });

      if (safeZoneDescriptorRef.current.isInside && targetDocument) {
        const elementsInPoint = targetDocument.elementsFromPoint(
          safeZoneDescriptorRef.current.mouseCoordinates.x,
          safeZoneDescriptorRef.current.mouseCoordinates.y,
        );
        const menuItemEl = elementsInPoint.find(el => {
          return el.classList.contains(menuItemClassNames.root);
        }) as HTMLElement | null;

        menuItemEl?.dispatchEvent(event);
      }
    },
  });

  const triggerRef = useMergedRefs(targetRef, safeZoneHandle.targetRef);
  const menuPopoverRef = useMergedRefs(containerRef, safeZoneHandle.containerRef);

  // TODO Better way to narrow types ?
  const [open, setOpen] = useMenuOpenState({
    hoverDelay,
    isSubmenu,
    setContextTarget,
    closeOnScroll,
    menuPopoverRef,
    triggerRef,
    open: props.open,
    defaultOpen: props.defaultOpen,
    onOpenChange: props.onOpenChange,
    openOnContext,
  });

  const [checkedValues, onCheckedValueChange] = useMenuSelectableState({
    checkedValues: props.checkedValues,
    defaultCheckedValues,
    onCheckedValueChange: props.onCheckedValueChange,
  });

  return {
    inline,
    hoverDelay,
    triggerId,
    isSubmenu,
    openOnHover,
    contextTarget,
    setContextTarget,
    hasCheckmarks,
    hasIcons,
    closeOnScroll,
    menuTrigger,
    menuPopover,
    mountNode,
    triggerRef,
    menuPopoverRef,
    components: {},
    openOnContext,
    open,
    setOpen,
    checkedValues,
    onCheckedValueChange,
    persistOnItemClick,
    safeZone: safeZoneHandle.elementToRender,
  };
};

/**
 * Adds appropriate state values and handlers for selectable items
 * i.e checkboxes and radios
 */
const useMenuSelectableState = (
  props: Pick<MenuProps, 'checkedValues' | 'defaultCheckedValues' | 'onCheckedValueChange'>,
) => {
  const [checkedValues, setCheckedValues] = useControllableState({
    state: props.checkedValues,
    defaultState: props.defaultCheckedValues,
    initialState: {},
  });
  const onCheckedValueChange: MenuState['onCheckedValueChange'] = useEventCallback((e, { name, checkedItems }) => {
    props.onCheckedValueChange?.(e, { name, checkedItems });

    setCheckedValues(currentValue => ({
      ...currentValue,
      [name]: checkedItems,
    }));
  });

  return [checkedValues, onCheckedValueChange] as const;
};

const useMenuOpenState = (
  state: Pick<
    MenuState,
    | 'isSubmenu'
    | 'menuPopoverRef'
    | 'setContextTarget'
    | 'triggerRef'
    | 'openOnContext'
    | 'closeOnScroll'
    | 'hoverDelay'
  > &
    Pick<MenuProps, 'open' | 'defaultOpen' | 'onOpenChange'>,
) => {
  'use no memo';

  const { targetDocument } = useFluent();
  const parentSetOpen = useMenuContext_unstable(context => context.setOpen);
  const onOpenChange: MenuProps['onOpenChange'] = useEventCallback((e, data) => state.onOpenChange?.(e, data));

  const enteringTriggerRef = React.useRef(false);

  const [open, setOpenState] = useControllableState({
    state: state.open,
    defaultState: state.defaultOpen,
    initialState: false,
  });

  const trySetOpen = useEventCallback((e: MenuOpenEvent, data: MenuOpenChangeData) => {
    const event = e instanceof CustomEvent && e.type === MENU_ENTER_EVENT ? e.detail.nativeEvent : e;
    onOpenChange?.(event, { ...data });
    if (data.open && e.type === 'contextmenu') {
      state.setContextTarget(e as React.MouseEvent);
    }

    if (!data.open) {
      state.setContextTarget(undefined);
    }

    if (data.bubble) {
      parentSetOpen(e, { ...data });
    }

    setOpenState(data.open);
  });

  const [setOpenTimeout, clearOpenTimeout] = useTimeout();

  const setOpen = useEventCallback((e: MenuOpenEvent, data: MenuOpenChangeData & { ignoreHoverDelay?: boolean }) => {
    clearOpenTimeout();
    if (!(e instanceof Event) && e.persist) {
      // < React 17 still uses pooled synthetic events
      e.persist();
    }

    const shouldUseDelay =
      !data.ignoreHoverDelay &&
      (e.type === 'mouseleave' || e.type === 'mouseover' || e.type === 'mousemove' || e.type === MENU_ENTER_EVENT);

    if (shouldUseDelay) {
      if (state.triggerRef.current?.contains(e.target as HTMLElement)) {
        enteringTriggerRef.current = e.type === 'mouseover' || e.type === 'mousemove';
      }

      setOpenTimeout(() => trySetOpen(e, data), state.hoverDelay);
    } else {
      trySetOpen(e, data);
    }
  });

  useOnClickOutside({
    contains: elementContains,
    disabled: !open,
    element: targetDocument,
    refs: [state.menuPopoverRef, !state.openOnContext && state.triggerRef].filter(
      Boolean,
    ) as React.MutableRefObject<HTMLElement | null>[],
    callback: event => setOpen(event, { open: false, type: 'clickOutside', event }),
  });

  // only close on scroll for context, or when closeOnScroll is specified
  const closeOnScroll = state.openOnContext || state.closeOnScroll;
  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: event => setOpen(event, { open: false, type: 'scrollOutside', event }),
    refs: [state.menuPopoverRef, !state.openOnContext && state.triggerRef].filter(
      Boolean,
    ) as React.MutableRefObject<HTMLElement | null>[],
    disabled: !open || !closeOnScroll,
  });

  useOnMenuMouseEnter({
    element: targetDocument,
    callback: event => {
      // When moving from a menu directly back to its trigger, this handler can close the menu
      // Explicitly check a flag to see if this situation happens
      if (!enteringTriggerRef.current) {
        setOpen(event, { open: false, type: 'menuMouseEnter', event });
      }
    },
    disabled: !open,
    refs: [state.menuPopoverRef],
  });

  // Manage focus for open state
  const { findFirstFocusable } = useFocusFinders();
  const focusFirst = React.useCallback(() => {
    const firstFocusable = findFirstFocusable(state.menuPopoverRef.current);
    firstFocusable?.focus();
  }, [findFirstFocusable, state.menuPopoverRef]);

  const firstMount = useFirstMount();
  React.useEffect(() => {
    if (open) {
      focusFirst();
    } else {
      if (!firstMount) {
        if (targetDocument?.activeElement === targetDocument?.body) {
          // We know that React effects are sync so we focus the trigger here
          // after any event handler (event handlers will update state and re-render).
          // Since the browser only performs the default behaviour for the Tab key once
          // keyboard events have fully bubbled up the window, the browser will move
          // focus to the next tabbable element before/after the trigger if needed.
          // If the Tab key was not pressed, focus will remain on the trigger as expected.
          state.triggerRef.current?.focus();
        }
      }
    }
    // firstMount change should not re-run this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.triggerRef, state.isSubmenu, open, focusFirst, targetDocument, state.menuPopoverRef]);

  return [open, setOpen] as const;
};
