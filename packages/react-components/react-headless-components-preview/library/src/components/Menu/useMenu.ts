'use client';

import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useFirstMount,
  useId,
  useMergedRefs,
  useTimeout,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { MENU_ENTER_EVENT } from '@fluentui/react-menu';
import type {
  PositioningShorthandValue,
  PositioningVirtualElement,
  SetVirtualMouseTarget,
} from '@fluentui/react-positioning';

import { useMenuContext } from './menuContext';
import { useHasParentMenuList } from './menuListPresenceContext';
import { usePositioning, resolvePositioningShorthand } from '../../positioning';
import type { MenuOpenChangeData, MenuOpenEvent, MenuProps, MenuState } from './Menu.types';

export const useMenu = (props: MenuProps): MenuState => {
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
  const [contextTarget, setContextTarget] = useContextTargetState();

  const triggerRef = React.useRef<HTMLElement | null>(null);
  const menuPopoverRef = React.useRef<HTMLElement | null>(null);

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

  const [open, setOpen] = useMenuOpenState({
    hoverDelay,
    setContextTarget,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    triggerRef: triggerRef as React.MutableRefObject<HTMLElement | null>,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    menuPopoverRef: menuPopoverRef as React.MutableRefObject<HTMLElement | null>,
    open: props.open,
    defaultOpen: props.defaultOpen,
    onOpenChange: props.onOpenChange,
  });

  const [checkedValues, onCheckedValueChange] = useMenuSelectableState({
    checkedValues: props.checkedValues,
    defaultCheckedValues,
    onCheckedValueChange: props.onCheckedValueChange,
  });

  const resolvedPositioning = resolvePositioningShorthand(props.positioning);
  const positioningOptions = {
    position: isSubmenu ? 'after' : 'below',
    align: isSubmenu ? 'top' : 'start',
    target: openOnContext ? contextTarget : undefined,
    fallbackPositions: isSubmenu ? SUBMENU_FALLBACK_POSITIONS : undefined,
    ...resolvedPositioning,
  } as const;

  const { targetRef, containerRef } = usePositioning(positioningOptions);

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const mergedTriggerRef = useMergedRefs(triggerRef, targetRef) as React.MutableRefObject<HTMLElement | null>;
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const mergedMenuPopoverRef = useMergedRefs(menuPopoverRef, containerRef) as React.MutableRefObject<HTMLElement | null>;

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
    triggerRef: mergedTriggerRef,
    menuPopoverRef: mergedMenuPopoverRef,
    openOnContext,
    open,
    setOpen,
    checkedValues,
    onCheckedValueChange,
    persistOnItemClick,
  } as MenuState;
};

const SUBMENU_FALLBACK_POSITIONS: PositioningShorthandValue[] = [
  'after',
  'after-bottom',
  'before-top',
  'before',
  'before-bottom',
  'above',
];

const useIsSubmenu = (): boolean => {
  const parentIsSubmenu = useMenuContext(ctx => ctx.isSubmenu);
  const hasParentMenuList = useHasParentMenuList();
  return parentIsSubmenu || hasParentMenuList;
};

const useContextTargetState = (): [PositioningVirtualElement | undefined, SetVirtualMouseTarget] => {
  const [virtualElement, setVirtualElement] = React.useState<PositioningVirtualElement | undefined>(undefined);
  const setContextTarget: SetVirtualMouseTarget = useEventCallback(event => {
    if (event === undefined || event === null) {
      setVirtualElement(undefined);
      return;
    }

    const mouseEvent = event instanceof MouseEvent ? event : event.nativeEvent;

    if (process.env.NODE_ENV !== 'production' && !(mouseEvent instanceof MouseEvent)) {
      // eslint-disable-next-line no-console
      console.error('Menu contextTarget should only be set from a MouseEvent');
    }

    setVirtualElement(createVirtualElementFromClick(mouseEvent));
  });

  return [virtualElement, setContextTarget];
};

const createVirtualElementFromClick = (nativeEvent: MouseEvent): PositioningVirtualElement => {
  const left = nativeEvent.clientX;
  const top = nativeEvent.clientY;
  const right = left + 1;
  const bottom = top + 1;

  return {
    getBoundingClientRect() {
      return { left, top, right, bottom, x: left, y: top, height: 1, width: 1 };
    },
  };
};

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
  state: {
    hoverDelay: number;
    setContextTarget: SetVirtualMouseTarget;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    triggerRef: React.MutableRefObject<HTMLElement | null>;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    menuPopoverRef: React.MutableRefObject<HTMLElement | null>;
  } & Pick<MenuProps, 'open' | 'defaultOpen' | 'onOpenChange'>,
) => {
  'use no memo';

  const { targetDocument } = useFluent();
  const parentSetOpen = useMenuContext(ctx => ctx.setOpen);
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

  const firstMount = useFirstMount();

  React.useEffect(() => {
    if (open || firstMount) {
      return;
    }

    if (
      targetDocument?.activeElement === targetDocument?.body ||
      state.menuPopoverRef.current?.contains(targetDocument?.activeElement ?? null)
    ) {
      state.triggerRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, targetDocument, state.menuPopoverRef, state.triggerRef]);

  return [open, setOpen] as const;
};
