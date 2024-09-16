import * as React from 'react';
import {
  usePositioningMouseTarget,
  usePositioning,
  resolvePositioningShorthand,
  PositioningShorthandValue,
} from '@fluentui/react-positioning';
import {
  useControllableState,
  useId,
  useOnClickOutside,
  useEventCallback,
  useOnScrollOutside,
  elementContains,
  useTimeout,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import { MENU_ENTER_EVENT, useOnMenuMouseEnter } from '../../utils/index';
import { useIsSubmenu } from '../../utils/useIsSubmenu';
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
export const useMenu_unstable = (props: MenuProps): MenuState => {
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
  } = props;
  const triggerId = useId('menu');
  const [contextTarget, setContextTarget] = usePositioningMouseTarget();

  const positioningState = {
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

  const { targetRef: triggerRef, containerRef: menuPopoverRef } = usePositioning(positioningState);

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

  const setOpen = useEventCallback((e: MenuOpenEvent, data: MenuOpenChangeData) => {
    clearOpenTimeout();
    if (!(e instanceof Event) && e.persist) {
      // < React 17 still uses pooled synthetic events
      e.persist();
    }

    if (e.type === 'mouseleave' || e.type === 'mouseenter' || e.type === 'mousemove' || e.type === MENU_ENTER_EVENT) {
      if (state.triggerRef.current?.contains(e.target as HTMLElement)) {
        enteringTriggerRef.current = e.type === 'mouseenter' || e.type === 'mousemove';
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
    ) as React.MutableRefObject<HTMLElement>[],
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
    ) as React.MutableRefObject<HTMLElement>[],
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

  React.useEffect(() => {
    if (open) {
      focusFirst();
    }
  }, [open, focusFirst]);

  return [open, setOpen] as const;
};
