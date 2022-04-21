import * as React from 'react';
import { ContextualMenuItemType } from './ContextualMenu.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '../../FocusZone';
import {
  divProperties,
  getNativeProps,
  shallowCompare,
  Async,
  assign,
  classNamesFunction,
  css,
  getFirstFocusable,
  getLastFocusable,
  getRTL,
  KeyCodes,
  shouldWrapFocus,
  isIOS,
  isMac,
  memoizeFunction,
  getPropsWithDefaults,
  getDocument,
} from '../../Utilities';
import { hasSubmenu, getIsChecked, isItemDisabled } from '../../utilities/contextualMenu/index';
import { Callout } from '../../Callout';
import { ContextualMenuItem } from './ContextualMenuItem';
import {
  ContextualMenuSplitButton,
  ContextualMenuButton,
  ContextualMenuAnchor,
} from './ContextualMenuItemWrapper/index';
import { concatStyleSetsWithProps } from '../../Styling';
import { getItemStyles } from './ContextualMenu.classNames';
import {
  useTarget,
  usePrevious,
  useAsync,
  useWarnings,
  useId,
  Target,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-hooks';
import { useResponsiveMode, ResponsiveMode } from '../../ResponsiveMode';
import { MenuContext } from '../../utilities/MenuContext/index';
import type {
  IContextualMenuProps,
  IContextualMenuItem,
  IContextualMenuListProps,
  IContextualMenuStyleProps,
  IContextualMenuStyles,
  IContextualMenuItemRenderProps,
} from './ContextualMenu.types';
import type { IFocusZoneProps } from '../../FocusZone';
import type { IMenuItemClassNames, IContextualMenuClassNames } from './ContextualMenu.classNames';
import type { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import type { ICalloutContentStyleProps, ICalloutContentStyles } from '../../Callout';
import type { IProcessedStyleSet } from '../../Styling';
import type { IContextualMenuItemStyleProps, IContextualMenuItemStyles } from './ContextualMenuItem.types';
import type { IPopupRestoreFocusParams } from '../../Popup';

const getClassNames = classNamesFunction<IContextualMenuStyleProps, IContextualMenuStyles>();
const getContextualMenuItemClassNames = classNamesFunction<IContextualMenuItemStyleProps, IContextualMenuItemStyles>();

// The default ContextualMenu properties have no items and beak, the default submenu direction is right and top.
const DEFAULT_PROPS: Partial<IContextualMenuProps> = {
  items: [],
  shouldFocusOnMount: true,
  gapSpace: 0,
  directionalHint: DirectionalHint.bottomAutoEdge,
  beakWidth: 16,
};

export function getSubmenuItems(
  item: IContextualMenuItem,
  options?: {
    target?: Target;
  },
): IContextualMenuItem[] | undefined {
  const target = options?.target;

  // eslint-disable-next-line deprecation/deprecation
  const items = item.subMenuProps ? item.subMenuProps.items : item.items;

  if (items) {
    const overrideItems: typeof items = [];

    for (const subItem of items) {
      if (subItem.preferMenuTargetAsEventTarget) {
        // For sub-items which need an overridden target, intercept `onClick`
        const { onClick, ...contextItem } = subItem;

        overrideItems.push({
          ...contextItem,
          onClick: getOnClickWithOverrideTarget(onClick, target),
        });
      } else {
        overrideItems.push(subItem);
      }
    }

    return overrideItems;
  }
}

/**
 * Returns true if a list of menu items can contain a checkbox
 */
export function canAnyMenuItemsCheck(items: IContextualMenuItem[]): boolean {
  return items.some(item => {
    if (item.canCheck) {
      return true;
    }

    // If the item is a section, check if any of the items in the section can check.
    if (item.sectionProps && item.sectionProps.items.some(submenuItem => submenuItem.canCheck === true)) {
      return true;
    }

    return false;
  });
}

const NavigationIdleDelay = 250; /* ms */

const COMPONENT_NAME = 'ContextualMenu';

const _getMenuItemStylesFunction = memoizeFunction(
  (
    ...styles: (IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles> | undefined)[]
  ): IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles> => {
    return (styleProps: IContextualMenuItemStyleProps) =>
      concatStyleSetsWithProps(styleProps, getItemStyles, ...styles);
  },
);

//#region Custom hooks
function useVisibility(props: IContextualMenuProps, targetWindow: Window | undefined) {
  const { hidden = false, onMenuDismissed, onMenuOpened } = props;
  const previousHidden = usePrevious(hidden);

  const onMenuOpenedRef = React.useRef(onMenuOpened);
  const onMenuClosedRef = React.useRef(onMenuDismissed);
  const propsRef = React.useRef(props);

  onMenuOpenedRef.current = onMenuOpened;
  onMenuClosedRef.current = onMenuDismissed;
  propsRef.current = props;

  React.useEffect(() => {
    // Don't issue dismissed callbacks on initial mount
    if (hidden && previousHidden === false) {
      onMenuClosedRef.current?.(propsRef.current);
    } else if (!hidden && previousHidden !== false) {
      onMenuOpenedRef.current?.(propsRef.current);
    }
  }, [hidden, previousHidden]);

  // Issue onDismissedCallback on unmount
  React.useEffect(() => () => onMenuClosedRef.current?.(propsRef.current), []);
}

function useSubMenuState(
  { hidden, items, theme, className, id, target: menuTarget }: IContextualMenuProps,
  dismiss: () => void,
) {
  const [expandedMenuItemKey, setExpandedMenuItemKey] = React.useState<string>();
  const [submenuTarget, setSubmenuTarget] = React.useState<HTMLElement>();
  /** True if the menu was expanded by mouse click OR hover (as opposed to by keyboard) */
  const [shouldFocusOnContainer, setShouldFocusOnContainer] = React.useState<boolean>();
  const subMenuId = useId(COMPONENT_NAME, id);

  const closeSubMenu = React.useCallback(() => {
    setShouldFocusOnContainer(undefined);
    setExpandedMenuItemKey(undefined);
    setSubmenuTarget(undefined);
  }, []);

  const openSubMenu = React.useCallback(
    ({ key: submenuItemKey }: IContextualMenuItem, target: HTMLElement, focusContainer?: boolean) => {
      if (expandedMenuItemKey === submenuItemKey) {
        return;
      }

      target.focus();

      setShouldFocusOnContainer(focusContainer);
      setExpandedMenuItemKey(submenuItemKey);
      setSubmenuTarget(target);
    },
    [expandedMenuItemKey],
  );

  React.useEffect(() => {
    if (hidden) {
      closeSubMenu();
    }
  }, [hidden, closeSubMenu]);

  const onSubMenuDismiss = useOnSubmenuDismiss(dismiss, closeSubMenu);

  const getSubmenuProps = (): IContextualMenuProps | null => {
    const item = findItemByKeyFromItems(expandedMenuItemKey!, items);
    let submenuProps: IContextualMenuProps | null = null;

    if (item) {
      submenuProps = {
        items: getSubmenuItems(item, { target: menuTarget })!,
        target: submenuTarget,
        onDismiss: onSubMenuDismiss,
        isSubMenu: true,
        id: subMenuId,
        shouldFocusOnMount: true,
        shouldFocusOnContainer,
        directionalHint: getRTL(theme) ? DirectionalHint.leftTopEdge : DirectionalHint.rightTopEdge,
        className,
        gapSpace: 0,
        isBeakVisible: false,
      };

      if (item.subMenuProps) {
        assign(submenuProps, item.subMenuProps);
      }

      if (item.preferMenuTargetAsEventTarget) {
        const { onItemClick } = item;

        submenuProps.onItemClick = getOnClickWithOverrideTarget(onItemClick, menuTarget);
      }
    }
    return submenuProps;
  };

  return [expandedMenuItemKey, openSubMenu, getSubmenuProps, onSubMenuDismiss] as const;
}

function useShouldUpdateFocusOnMouseMove({ delayUpdateFocusOnHover, hidden }: IContextualMenuProps) {
  const shouldUpdateFocusOnMouseEvent = React.useRef<boolean>(!delayUpdateFocusOnHover);
  const gotMouseMove = React.useRef<boolean>(false);

  React.useEffect(() => {
    shouldUpdateFocusOnMouseEvent.current = !delayUpdateFocusOnHover;
    gotMouseMove.current = hidden ? false : !delayUpdateFocusOnHover && gotMouseMove.current;
  }, [delayUpdateFocusOnHover, hidden]);

  const onMenuFocusCapture = React.useCallback(() => {
    if (delayUpdateFocusOnHover) {
      shouldUpdateFocusOnMouseEvent.current = false;
    }
  }, [delayUpdateFocusOnHover]);

  return [shouldUpdateFocusOnMouseEvent, gotMouseMove, onMenuFocusCapture] as const;
}

function usePreviousActiveElement({ hidden, onRestoreFocus }: IContextualMenuProps, targetWindow: Window | undefined) {
  const previousActiveElement = React.useRef<undefined | HTMLElement>();

  const tryFocusPreviousActiveElement = React.useCallback(
    (options: IPopupRestoreFocusParams) => {
      if (onRestoreFocus) {
        onRestoreFocus(options);
      } else if (options?.documentContainsFocus) {
        // Make sure that the focus method actually exists
        // In some cases the object might exist but not be a real element.
        // This is primarily for IE 11 and should be removed once IE 11 is no longer in use.
        previousActiveElement.current?.focus?.();
      }
    },
    [onRestoreFocus],
  );

  useIsomorphicLayoutEffect(() => {
    if (!hidden) {
      previousActiveElement.current = targetWindow?.document.activeElement as HTMLElement;
    } else if (previousActiveElement.current) {
      tryFocusPreviousActiveElement({
        originalElement: previousActiveElement.current,
        containsFocus: true,
        documentContainsFocus: getDocument()?.hasFocus() || false,
      });

      previousActiveElement.current = undefined;
    }
  }, [hidden, targetWindow?.document.activeElement, tryFocusPreviousActiveElement]);

  return [tryFocusPreviousActiveElement] as const;
}

function useKeyHandlers(
  {
    theme,
    isSubMenu,
    focusZoneProps: { checkForNoWrap, direction: focusZoneDirection = FocusZoneDirection.vertical } = {},
  }: IContextualMenuProps,
  dismiss: (ev?: any, dismissAll?: boolean | undefined) => void | undefined,
  hostElement: React.RefObject<HTMLDivElement>,
  openSubMenu: (submenuItemKey: IContextualMenuItem, target: HTMLElement) => void,
) {
  /** True if the most recent keydown event was for alt (option) or meta (command). */
  const lastKeyDownWasAltOrMeta = React.useRef<boolean | undefined>();

  /**
   * Calls `shouldHandleKey` to determine whether the keyboard event should be handled;
   * if so, stops event propagation and dismisses menu(s).
   * @param ev - The keyboard event.
   * @param shouldHandleKey - Returns whether we should handle this keyboard event.
   * @param dismissAllMenus - If true, dismiss all menus. Otherwise, dismiss only the current menu.
   * Only does anything if `shouldHandleKey` returns true.
   * @returns Whether the event was handled.
   */
  const keyHandler = (
    ev: React.KeyboardEvent<HTMLElement>,
    shouldHandleKey: (ev: React.KeyboardEvent<HTMLElement>) => boolean,
    dismissAllMenus?: boolean,
  ): boolean => {
    let handled = false;

    if (shouldHandleKey(ev)) {
      dismiss(ev, dismissAllMenus);
      ev.preventDefault();
      ev.stopPropagation();
      handled = true;
    }

    return handled;
  };

  /**
   * Checks if the submenu should be closed
   */
  const shouldCloseSubMenu = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    const submenuCloseKey = getRTL(theme) ? KeyCodes.right : KeyCodes.left;

    // eslint-disable-next-line deprecation/deprecation
    if (ev.which !== submenuCloseKey || !isSubMenu) {
      return false;
    }

    return !!(
      focusZoneDirection === FocusZoneDirection.vertical ||
      (checkForNoWrap && !shouldWrapFocus(ev.target as HTMLElement, 'data-no-horizontal-wrap'))
    );
  };

  const shouldHandleKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    return (
      // eslint-disable-next-line deprecation/deprecation
      ev.which === KeyCodes.escape ||
      shouldCloseSubMenu(ev) ||
      // eslint-disable-next-line deprecation/deprecation
      (ev.which === KeyCodes.up && (ev.altKey || ev.metaKey))
    );
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    // Take note if we are processing an alt (option) or meta (command) keydown.
    // See comment in shouldHandleKeyUp for reasoning.
    lastKeyDownWasAltOrMeta.current = isAltOrMeta(ev);

    // On Mac, pressing escape dismisses all levels of native context menus
    // eslint-disable-next-line deprecation/deprecation
    const dismissAllMenus = ev.which === KeyCodes.escape && (isMac() || isIOS());

    return keyHandler(ev, shouldHandleKeyDown, dismissAllMenus);
  };

  /**
   * We close the menu on key up only if ALL of the following are true:
   * - Most recent key down was alt or meta (command)
   * - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
   *   expand/collapse the menu)
   * - We're not on a Mac (or iOS)
   *
   * This is because on Windows, pressing alt moves focus to the application menu bar or similar,
   * closing any open context menus. There is not a similar behavior on Macs.
   */
  const shouldHandleKeyUp = (ev: React.KeyboardEvent<HTMLElement>) => {
    const keyPressIsAltOrMetaAlone = lastKeyDownWasAltOrMeta.current && isAltOrMeta(ev);
    lastKeyDownWasAltOrMeta.current = false;
    return !!keyPressIsAltOrMetaAlone && !(isIOS() || isMac());
  };

  const onKeyUp = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    return keyHandler(ev, shouldHandleKeyUp, true /* dismissAllMenus */);
  };

  const onMenuKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    // Mark as handled if onKeyDown returns true (for handling collapse cases)
    // or if we are attempting to expand a submenu
    const handled = onKeyDown(ev);

    if (handled || !hostElement.current) {
      return;
    }

    // If we have a modifier key being pressed, we do not want to move focus.
    // Otherwise, handle up and down keys.
    const hasModifier = !!(ev.altKey || ev.metaKey);
    // eslint-disable-next-line deprecation/deprecation
    const isUp = ev.which === KeyCodes.up;
    // eslint-disable-next-line deprecation/deprecation
    const isDown = ev.which === KeyCodes.down;
    if (!hasModifier && (isUp || isDown)) {
      const elementToFocus = isUp
        ? getLastFocusable(hostElement.current, hostElement.current.lastChild as HTMLElement, true)
        : getFirstFocusable(hostElement.current, hostElement.current.firstChild as HTMLElement, true);

      if (elementToFocus) {
        elementToFocus.focus();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

  const onItemKeyDown = (item: any, ev: React.KeyboardEvent<HTMLElement>): void => {
    const openKey = getRTL(theme) ? KeyCodes.left : KeyCodes.right;

    if (
      !item.disabled &&
      // eslint-disable-next-line deprecation/deprecation
      (ev.which === openKey || ev.which === KeyCodes.enter || (ev.which === KeyCodes.down && (ev.altKey || ev.metaKey)))
    ) {
      openSubMenu(item, ev.currentTarget as HTMLElement);
      ev.preventDefault();
    }
  };

  return [onKeyDown, onKeyUp, onMenuKeyDown, onItemKeyDown] as const;
}

function useScrollHandler(asyncTracker: Async) {
  const isScrollIdle = React.useRef<boolean>(true);
  const scrollIdleTimeoutId = React.useRef<number | undefined>();

  /**
   * Scroll handler for the callout to make sure the mouse events
   * for updating focus are not interacting during scroll
   */
  const onScroll = (): void => {
    if (!isScrollIdle.current && scrollIdleTimeoutId.current !== undefined) {
      asyncTracker.clearTimeout(scrollIdleTimeoutId.current);
      scrollIdleTimeoutId.current = undefined;
    } else {
      isScrollIdle.current = false;
    }

    scrollIdleTimeoutId.current = asyncTracker.setTimeout(() => {
      isScrollIdle.current = true;
    }, NavigationIdleDelay);
  };

  return [onScroll, isScrollIdle] as const;
}

function useOnSubmenuDismiss(dismiss: (ev?: any, dismissAll?: boolean) => void, closeSubMenu: () => void) {
  const isMountedRef = React.useRef(false);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * This function is called ASYNCHRONOUSLY, and so there is a chance it is called
   * after the component is unmounted. The isMountedRef is added to prevent
   * from calling setState() after unmount. Do NOT copy this pattern in synchronous
   * code.
   */
  const onSubMenuDismiss = (ev?: any, dismissAll?: boolean): void => {
    if (dismissAll) {
      dismiss(ev, dismissAll);
    } else if (isMountedRef.current) {
      closeSubMenu();
    }
  };

  return onSubMenuDismiss;
}

function useSubmenuEnterTimer({ subMenuHoverDelay = NavigationIdleDelay }: IContextualMenuProps, asyncTracker: Async) {
  const enterTimerRef = React.useRef<number | undefined>(undefined);

  const cancelSubMenuTimer = () => {
    if (enterTimerRef.current !== undefined) {
      asyncTracker.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = undefined;
    }
  };

  const startSubmenuTimer = (onTimerExpired: () => void) => {
    enterTimerRef.current = asyncTracker.setTimeout(() => {
      onTimerExpired();
      cancelSubMenuTimer();
    }, subMenuHoverDelay);
  };

  return [cancelSubMenuTimer, startSubmenuTimer, enterTimerRef as React.RefObject<number | undefined>] as const;
}

function useMouseHandlers(
  props: IContextualMenuProps,
  isScrollIdle: React.MutableRefObject<boolean>,
  subMenuEntryTimer: React.RefObject<number | undefined>,
  targetWindow: Window | undefined,
  shouldUpdateFocusOnMouseEvent: React.MutableRefObject<boolean>,
  gotMouseMove: React.MutableRefObject<boolean>,
  expandedMenuItemKey: string | undefined,
  hostElement: React.RefObject<HTMLDivElement>,
  startSubmenuTimer: (onTimerExpired: () => void) => void,
  cancelSubMenuTimer: () => void,
  openSubMenu: (submenuItemKey: IContextualMenuItem, target: HTMLElement, openedByMouseClick?: boolean) => void,
  onSubMenuDismiss: (ev?: any, dismissAll?: boolean) => void,
  dismiss: (ev?: any, dismissAll?: boolean) => void,
) {
  const { target: menuTarget } = props;

  const onItemMouseEnterBase = (item: any, ev: React.MouseEvent<HTMLElement>, target?: HTMLElement): void => {
    if (shouldUpdateFocusOnMouseEvent.current) {
      gotMouseMove.current = true;
    }

    if (shouldIgnoreMouseEvent()) {
      return;
    }

    updateFocusOnMouseEvent(item, ev, target);
  };

  const onItemMouseMoveBase = (item: any, ev: React.MouseEvent<HTMLElement>, target: HTMLElement): void => {
    const targetElement = ev.currentTarget as HTMLElement;

    // Always do this check to make sure we record a mouseMove if needed (even if we are timed out)
    if (shouldUpdateFocusOnMouseEvent.current) {
      gotMouseMove.current = true;
    } else {
      return;
    }

    if (
      !isScrollIdle.current ||
      subMenuEntryTimer.current !== undefined ||
      targetElement === (targetWindow?.document.activeElement as HTMLElement)
    ) {
      return;
    }

    updateFocusOnMouseEvent(item, ev, target);
  };

  const shouldIgnoreMouseEvent = (): boolean => {
    return !isScrollIdle.current || !gotMouseMove.current;
  };

  const onMouseItemLeave = (item: any, ev: React.MouseEvent<HTMLElement>): void => {
    if (shouldIgnoreMouseEvent()) {
      return;
    }

    cancelSubMenuTimer();

    if (expandedMenuItemKey !== undefined) {
      return;
    }

    /**
     * IE11 focus() method forces parents to scroll to top of element.
     * Edge and IE expose a setActive() function for focusable divs that
     * sets the page focus but does not scroll the parent element.
     */
    if ((hostElement.current as any).setActive) {
      try {
        (hostElement.current as any).setActive();
      } catch (e) {
        /* no-op */
      }
    } else {
      hostElement.current?.focus();
    }
  };

  /**
   * Handles updating focus when mouseEnter or mouseMove fire.
   * As part of updating focus, This function will also update
   * the expand/collapse state accordingly.
   */
  const updateFocusOnMouseEvent = (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement>,
    target?: HTMLElement,
  ) => {
    const targetElement = target ? target : (ev.currentTarget as HTMLElement);

    if (item.key === expandedMenuItemKey) {
      return;
    }

    cancelSubMenuTimer();

    // If the menu is not expanded we can update focus without any delay
    if (expandedMenuItemKey === undefined) {
      targetElement.focus();
    }

    // Delay updating expanding/dismissing the submenu
    // and only set focus if we have not already done so
    if (hasSubmenu(item)) {
      ev.stopPropagation();
      startSubmenuTimer(() => {
        targetElement.focus();
        openSubMenu(item, targetElement, true);
      });
    } else {
      startSubmenuTimer(() => {
        onSubMenuDismiss(ev);
        targetElement.focus();
      });
    }
  };

  const onItemClick = (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ): void => {
    onItemClickBase(item, ev, ev.currentTarget as HTMLElement);
  };

  const onItemClickBase = (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    target: HTMLElement,
  ): void => {
    const items = getSubmenuItems(item, { target: menuTarget });

    // Cancel an async menu item hover timeout action from being taken and instead
    // just trigger the click event instead.
    cancelSubMenuTimer();

    if (!hasSubmenu(item) && (!items || !items.length)) {
      // This is an item without a menu. Click it.
      executeItemClick(item, ev);
    } else {
      if (item.key !== expandedMenuItemKey) {
        // This has a collapsed sub menu. Expand it.

        // focus on the container by default when the menu is opened with a click event
        // this differentiates from a keyboard interaction triggering the click event
        const shouldFocusOnContainer =
          typeof props.shouldFocusOnContainer === 'boolean'
            ? props.shouldFocusOnContainer
            : (ev.nativeEvent as PointerEvent).pointerType === 'mouse';
        openSubMenu(item, target, shouldFocusOnContainer);
      }
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  const onAnchorClick = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => {
    executeItemClick(item, ev);
    ev.stopPropagation();
  };

  const executeItemClick = (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ): void => {
    if (item.disabled || item.isDisabled) {
      return;
    }

    if (item.preferMenuTargetAsEventTarget) {
      overrideTarget(ev, menuTarget);
    }

    let shouldDismiss = false;
    if (item.onClick) {
      shouldDismiss = !!item.onClick(ev, item);
    } else if (props.onItemClick) {
      shouldDismiss = !!props.onItemClick(ev, item);
    }

    if (shouldDismiss || !ev.defaultPrevented) {
      dismiss(ev, true);
    }
  };

  return [
    onItemMouseEnterBase,
    onItemMouseMoveBase,
    onMouseItemLeave,
    onItemClick,
    onAnchorClick,
    executeItemClick,
    onItemClickBase,
  ] as const;
}
//#endregion

export const ContextualMenuBase: React.FunctionComponent<IContextualMenuProps> = React.memo(
  React.forwardRef<HTMLDivElement, IContextualMenuProps>((propsWithoutDefaults, forwardedRef) => {
    const { ref, ...props } = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);
    const hostElement = React.useRef<HTMLDivElement>(null);
    const asyncTracker = useAsync();
    const menuId = useId(COMPONENT_NAME, props.id);

    useWarnings({
      name: COMPONENT_NAME,
      props,
      deprecations: {
        getMenuClassNames: 'styles',
      },
    });

    const dismiss = (ev?: any, dismissAll?: boolean) => props.onDismiss?.(ev, dismissAll);
    const [targetRef, targetWindow] = useTarget(props.target, hostElement);
    const [tryFocusPreviousActiveElement] = usePreviousActiveElement(props, targetWindow);
    const [expandedMenuItemKey, openSubMenu, getSubmenuProps, onSubMenuDismiss] = useSubMenuState(props, dismiss);
    const [shouldUpdateFocusOnMouseEvent, gotMouseMove, onMenuFocusCapture] = useShouldUpdateFocusOnMouseMove(props);
    const [onScroll, isScrollIdle] = useScrollHandler(asyncTracker);
    const [cancelSubMenuTimer, startSubmenuTimer, subMenuEntryTimer] = useSubmenuEnterTimer(props, asyncTracker);

    const responsiveMode = useResponsiveMode(hostElement, props.responsiveMode);

    useVisibility(props, targetWindow);

    const [onKeyDown, onKeyUp, onMenuKeyDown, onItemKeyDown] = useKeyHandlers(props, dismiss, hostElement, openSubMenu);
    const [
      onItemMouseEnterBase,
      onItemMouseMoveBase,
      onMouseItemLeave,
      onItemClick,
      onAnchorClick,
      executeItemClick,
      onItemClickBase,
    ] = useMouseHandlers(
      props,
      isScrollIdle,
      subMenuEntryTimer,
      targetWindow,
      shouldUpdateFocusOnMouseEvent,
      gotMouseMove,
      expandedMenuItemKey,
      hostElement,
      startSubmenuTimer,
      cancelSubMenuTimer,
      openSubMenu,
      onSubMenuDismiss,
      dismiss,
    );

    //#region Render helpers

    const onDefaultRenderMenuList = (
      menuListProps: IContextualMenuListProps,
      // eslint-disable-next-line deprecation/deprecation
      menuClassNames: IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
      defaultRender?: IRenderFunction<IContextualMenuListProps>,
    ): JSX.Element => {
      let indexCorrection = 0;
      const { items, totalItemCount, hasCheckmarks, hasIcons } = menuListProps;

      return (
        <ul className={menuClassNames.list} onKeyDown={onKeyDown} onKeyUp={onKeyUp} role={'presentation'}>
          {items.map((item, index) => {
            const menuItem = renderMenuItem(
              item,
              index,
              indexCorrection,
              totalItemCount,
              hasCheckmarks,
              hasIcons,
              menuClassNames,
            );
            if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
              const indexIncrease = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
              indexCorrection += indexIncrease;
            }
            return menuItem;
          })}
        </ul>
      );
    };

    const renderFocusZone = (children: JSX.Element | null, adjustedFocusZoneProps: IFocusZoneProps): JSX.Element => {
      const { focusZoneAs: ChildrenRenderer = FocusZone } = props;
      return <ChildrenRenderer {...adjustedFocusZoneProps}>{children}</ChildrenRenderer>;
    };

    /**
     * !!!IMPORTANT!!! Avoid mutating `item: IContextualMenuItem` argument. It will
     * cause the menu items to always re-render because the component update is based on shallow comparison.
     */
    const renderMenuItem = (
      item: IContextualMenuItem,
      index: number,
      focusableElementIndex: number,
      totalItemCount: number,
      hasCheckmarks: boolean,
      hasIcons: boolean,
      // eslint-disable-next-line deprecation/deprecation
      menuClassNames: IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
    ): JSX.Element => {
      const renderedItems: React.ReactNode[] = [];
      const iconProps = item.iconProps || { iconName: 'None' };
      const {
        getItemClassNames, // eslint-disable-line deprecation/deprecation
        itemProps,
      } = item;
      const styles = itemProps ? itemProps.styles : undefined;

      // We only send a dividerClassName when the item to be rendered is a divider.
      // For all other cases, the default divider style is used.
      const dividerClassName = item.itemType === ContextualMenuItemType.Divider ? item.className : undefined;
      const subMenuIconClassName = item.submenuIconProps ? item.submenuIconProps.className : '';

      // eslint-disable-next-line deprecation/deprecation
      let itemClassNames: IMenuItemClassNames;

      // IContextualMenuItem#getItemClassNames for backwards compatibility
      // otherwise uses mergeStyles for class names.
      if (getItemClassNames) {
        itemClassNames = getItemClassNames(
          props.theme!,
          isItemDisabled(item),
          expandedMenuItemKey === item.key,
          !!getIsChecked(item),
          !!item.href,
          iconProps.iconName !== 'None',
          item.className,
          dividerClassName,
          iconProps.className,
          subMenuIconClassName,
          item.primaryDisabled,
        );
      } else {
        const itemStyleProps: IContextualMenuItemStyleProps = {
          theme: props.theme!,
          disabled: isItemDisabled(item),
          expanded: expandedMenuItemKey === item.key,
          checked: !!getIsChecked(item),
          isAnchorLink: !!item.href,
          knownIcon: iconProps.iconName !== 'None',
          itemClassName: item.className,
          dividerClassName,
          iconClassName: iconProps.className,
          subMenuClassName: subMenuIconClassName,
          primaryDisabled: item.primaryDisabled,
        };

        // We need to generate default styles then override if styles are provided
        // since the ContextualMenu currently handles item classNames.
        itemClassNames = getContextualMenuItemClassNames(
          _getMenuItemStylesFunction(menuClassNames.subComponentStyles?.menuItem, styles),
          itemStyleProps,
        );
      }

      // eslint-disable-next-line deprecation/deprecation
      if (item.text === '-' || item.name === '-') {
        item.itemType = ContextualMenuItemType.Divider;
      }
      switch (item.itemType) {
        case ContextualMenuItemType.Divider:
          renderedItems.push(renderSeparator(index, itemClassNames));
          break;
        case ContextualMenuItemType.Header:
          renderedItems.push(renderSeparator(index, itemClassNames));
          const headerItem = renderHeaderMenuItem(item, itemClassNames, menuClassNames, index, hasCheckmarks, hasIcons);
          renderedItems.push(renderListItem(headerItem, item.key || index, itemClassNames, item.title));
          break;
        case ContextualMenuItemType.Section:
          renderedItems.push(renderSectionItem(item, itemClassNames, menuClassNames, index, hasCheckmarks, hasIcons));
          break;
        default:
          const defaultRenderNormalItem = () =>
            renderNormalItem(
              item,
              itemClassNames,
              index,
              focusableElementIndex,
              totalItemCount,
              hasCheckmarks,
              hasIcons,
            ) as JSX.Element;

          const menuItem = props.onRenderContextualMenuItem
            ? props.onRenderContextualMenuItem(item, defaultRenderNormalItem)
            : defaultRenderNormalItem();
          renderedItems.push(renderListItem(menuItem, item.key || index, itemClassNames, item.title));
          break;
      }

      // Since multiple nodes *could* be rendered, wrap them all in a fragment with this item's key.
      // This ensures the reconciler handles multi-item output per-node correctly and does not re-mount content.
      return <React.Fragment key={item.key}>{renderedItems}</React.Fragment>;
    };

    const defaultMenuItemRenderer = (
      item: IContextualMenuItemRenderProps,
      // eslint-disable-next-line deprecation/deprecation
      menuClassNames: IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
    ): React.ReactNode => {
      const { index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons } = item;
      return renderMenuItem(
        item,
        index,
        focusableElementIndex,
        totalItemCount,
        hasCheckmarks,
        hasIcons,
        menuClassNames,
      );
    };

    const renderSectionItem = (
      sectionItem: IContextualMenuItem,
      // eslint-disable-next-line deprecation/deprecation
      itemClassNames: IMenuItemClassNames,
      // eslint-disable-next-line deprecation/deprecation
      menuClassNames: IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
      index: number,
      hasCheckmarks: boolean,
      hasIcons: boolean,
    ) => {
      const sectionProps = sectionItem.sectionProps;
      if (!sectionProps) {
        return;
      }

      let headerItem;
      let groupProps;
      if (sectionProps.title) {
        let headerContextualMenuItem: IContextualMenuItem | undefined = undefined;
        let ariaLabelledby = '';
        if (typeof sectionProps.title === 'string') {
          // Since title is a user-facing string, it needs to be stripped
          // of whitespace in order to build a valid element ID
          const id = menuId + sectionProps.title.replace(/\s/g, '');
          headerContextualMenuItem = {
            key: `section-${sectionProps.title}-title`,
            itemType: ContextualMenuItemType.Header,
            text: sectionProps.title,
            id: id,
          };
          ariaLabelledby = id;
        } else {
          const id = sectionProps.title.id || menuId + sectionProps.title.key.replace(/\s/g, '');
          headerContextualMenuItem = { ...sectionProps.title, id };
          ariaLabelledby = id;
        }

        if (headerContextualMenuItem) {
          groupProps = {
            role: 'group',
            'aria-labelledby': ariaLabelledby,
          };
          headerItem = renderHeaderMenuItem(
            headerContextualMenuItem,
            itemClassNames,
            menuClassNames,
            index,
            hasCheckmarks,
            hasIcons,
          );
        }
      }

      if (sectionProps.items && sectionProps.items.length > 0) {
        return (
          <li role="presentation" key={sectionProps.key || sectionItem.key || `section-${index}`}>
            <div {...groupProps}>
              <ul className={menuClassNames.list} role="presentation">
                {sectionProps.topDivider && renderSeparator(index, itemClassNames, true, true)}
                {headerItem && renderListItem(headerItem, sectionItem.key || index, itemClassNames, sectionItem.title)}
                {sectionProps.items.map((contextualMenuItem, itemsIndex) =>
                  renderMenuItem(
                    contextualMenuItem,
                    itemsIndex,
                    itemsIndex,
                    sectionProps.items.length,
                    hasCheckmarks,
                    hasIcons,
                    menuClassNames,
                  ),
                )}
                {sectionProps.bottomDivider && renderSeparator(index, itemClassNames, false, true)}
              </ul>
            </div>
          </li>
        );
      }
    };

    const renderListItem = (
      content: React.ReactNode,
      key: string | number,
      classNames: IMenuItemClassNames, // eslint-disable-line deprecation/deprecation
      title?: string,
    ) => {
      return (
        <li role="presentation" title={title} key={key} className={classNames.item}>
          {content}
        </li>
      );
    };

    const renderSeparator = (
      index: number,
      classNames: IMenuItemClassNames, // eslint-disable-line deprecation/deprecation
      top?: boolean,
      fromSection?: boolean,
    ): React.ReactNode => {
      if (fromSection || index > 0) {
        return (
          <li
            role="separator"
            key={'separator-' + index + (top === undefined ? '' : top ? '-top' : '-bottom')}
            className={classNames.divider}
            aria-hidden="true"
          />
        );
      }
      return null;
    };

    const renderNormalItem = (
      item: IContextualMenuItem,
      classNames: IMenuItemClassNames, // eslint-disable-line deprecation/deprecation
      index: number,
      focusableElementIndex: number,
      totalItemCount: number,
      hasCheckmarks: boolean,
      hasIcons: boolean,
    ): React.ReactNode => {
      if (item.onRender) {
        return item.onRender(
          { 'aria-posinset': focusableElementIndex + 1, 'aria-setsize': totalItemCount, ...item },
          dismiss,
        );
      }

      const { contextualMenuItemAs } = props;

      const commonProps = {
        item,
        classNames,
        index,
        focusableElementIndex,
        totalItemCount,
        hasCheckmarks,
        hasIcons,
        contextualMenuItemAs,
        onItemMouseEnter: onItemMouseEnterBase,
        onItemMouseLeave: onMouseItemLeave,
        onItemMouseMove: onItemMouseMoveBase,
        onItemMouseDown: onItemMouseDown,
        executeItemClick: executeItemClick,
        onItemKeyDown: onItemKeyDown,
        expandedMenuItemKey,
        openSubMenu,
        dismissSubMenu: onSubMenuDismiss,
        dismissMenu: dismiss,
      } as const;

      if (item.href) {
        return <ContextualMenuAnchor {...commonProps} onItemClick={onAnchorClick} />;
      }

      if (item.split && hasSubmenu(item)) {
        return (
          <ContextualMenuSplitButton
            {...commonProps}
            onItemClick={onItemClick}
            onItemClickBase={onItemClickBase}
            onTap={cancelSubMenuTimer}
          />
        );
      }

      return <ContextualMenuButton {...commonProps} onItemClick={onItemClick} onItemClickBase={onItemClickBase} />;
    };

    const renderHeaderMenuItem = (
      item: IContextualMenuItem,
      // eslint-disable-next-line deprecation/deprecation
      itemClassNames: IMenuItemClassNames,
      // eslint-disable-next-line deprecation/deprecation
      menuClassNames: IProcessedStyleSet<IContextualMenuStyles> | IContextualMenuClassNames,
      index: number,
      hasCheckmarks: boolean,
      hasIcons: boolean,
    ): React.ReactNode => {
      const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem } = props;
      const { itemProps, id } = item;
      const divHtmlProperties =
        itemProps && getNativeProps<React.HTMLAttributes<HTMLDivElement>>(itemProps, divProperties);
      return (
        // eslint-disable-next-line deprecation/deprecation
        <div id={id} className={menuClassNames.header} {...divHtmlProperties} style={item.style}>
          <ChildrenRenderer
            item={item}
            classNames={itemClassNames}
            index={index}
            onCheckmarkClick={hasCheckmarks ? onItemClick : undefined}
            hasIcons={hasIcons}
            {...itemProps}
          />
        </div>
      );
    };
    //#endregion

    //#region Main render
    let { isBeakVisible } = props;

    const {
      items,
      labelElementId,
      id,
      className,
      beakWidth,
      directionalHint,
      directionalHintForRTL,
      alignTargetEdge,
      gapSpace,
      coverTarget,
      ariaLabel,
      doNotLayer,
      target,
      bounds,
      useTargetWidth,
      useTargetAsMinWidth,
      directionalHintFixed,
      shouldFocusOnMount,
      shouldFocusOnContainer,
      title,
      styles,
      theme,
      calloutProps,
      onRenderSubMenu = onDefaultRenderSubMenu,
      onRenderMenuList = (
        menuListProps: IContextualMenuListProps,
        defaultRender?: IRenderFunction<IContextualMenuListProps>,
      ) => onDefaultRenderMenuList(menuListProps, classNames, defaultRender),
      focusZoneProps,
      // eslint-disable-next-line deprecation/deprecation
      getMenuClassNames,
    } = props;

    const classNames = getMenuClassNames
      ? getMenuClassNames(theme!, className)
      : getClassNames(styles, {
          theme: theme!,
          className: className,
        });

    const hasIcons = itemsHaveIcons(items);

    function itemsHaveIcons(contextualMenuItems: IContextualMenuItem[]): boolean {
      for (const item of contextualMenuItems) {
        if (item.iconProps) {
          return true;
        }

        if (
          item.itemType === ContextualMenuItemType.Section &&
          item.sectionProps &&
          itemsHaveIcons(item.sectionProps.items)
        ) {
          return true;
        }
      }

      return false;
    }

    const adjustedFocusZoneProps = {
      direction: FocusZoneDirection.vertical,
      handleTabKey: FocusZoneTabbableElements.all,
      isCircularNavigation: true,
      ...focusZoneProps,
      className: css(classNames.root, props.focusZoneProps?.className),
    };

    const hasCheckmarks = canAnyMenuItemsCheck(items);
    const submenuProps = expandedMenuItemKey && props.hidden !== true ? getSubmenuProps() : null;

    isBeakVisible = isBeakVisible === undefined ? responsiveMode! <= ResponsiveMode.medium : isBeakVisible;
    /**
     * When useTargetWidth is true, get the width of the target element and apply it for the context menu container
     */
    let contextMenuStyle: React.CSSProperties;
    const targetAsHtmlElement = targetRef.current as HTMLElement;
    if ((useTargetWidth || useTargetAsMinWidth) && targetAsHtmlElement && targetAsHtmlElement.offsetWidth) {
      const targetBoundingRect = targetAsHtmlElement.getBoundingClientRect();
      const targetWidth = targetBoundingRect.width - 2; /* Accounts for 1px border */

      if (useTargetWidth) {
        contextMenuStyle = {
          width: targetWidth,
        };
      } else if (useTargetAsMinWidth) {
        contextMenuStyle = {
          minWidth: targetWidth,
        };
      }
    }

    // The menu should only return if items were provided, if no items were provided then it should not appear.
    if (items && items.length > 0) {
      let totalItemCount = 0;
      for (const item of items) {
        if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
          const itemCount = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
          totalItemCount += itemCount;
        }
      }

      const calloutStyles = classNames.subComponentStyles
        ? (classNames.subComponentStyles.callout as IStyleFunctionOrObject<
            ICalloutContentStyleProps,
            ICalloutContentStyles
          >)
        : undefined;

      return (
        <MenuContext.Consumer>
          {menuContext => (
            <Callout
              styles={calloutStyles}
              onRestoreFocus={tryFocusPreviousActiveElement}
              {...calloutProps}
              target={target || (menuContext.target as IContextualMenuProps['target'])}
              isBeakVisible={isBeakVisible}
              beakWidth={beakWidth}
              directionalHint={directionalHint}
              directionalHintForRTL={directionalHintForRTL}
              gapSpace={gapSpace}
              coverTarget={coverTarget}
              doNotLayer={doNotLayer}
              className={css('ms-ContextualMenu-Callout', calloutProps && calloutProps.className)}
              setInitialFocus={shouldFocusOnMount}
              onDismiss={props.onDismiss || menuContext.onDismiss}
              onScroll={onScroll}
              bounds={bounds}
              directionalHintFixed={directionalHintFixed}
              alignTargetEdge={alignTargetEdge}
              hidden={props.hidden || menuContext.hidden}
              ref={forwardedRef}
            >
              <div
                style={contextMenuStyle}
                ref={hostElement}
                id={id}
                className={classNames.container}
                tabIndex={shouldFocusOnContainer ? 0 : -1}
                onKeyDown={onMenuKeyDown}
                onKeyUp={onKeyUp}
                onFocusCapture={onMenuFocusCapture}
                aria-label={ariaLabel}
                aria-labelledby={labelElementId}
                role={'menu'}
              >
                {title && <div className={classNames.title}> {title} </div>}
                {items && items.length
                  ? renderFocusZone(
                      onRenderMenuList(
                        {
                          ariaLabel,
                          items,
                          totalItemCount,
                          hasCheckmarks,
                          hasIcons,
                          defaultMenuItemRenderer: (item: IContextualMenuItemRenderProps) =>
                            defaultMenuItemRenderer(item, classNames),
                          labelElementId,
                        },
                        (
                          menuListProps: IContextualMenuListProps,
                          defaultRender?: IRenderFunction<IContextualMenuListProps>,
                        ) => onDefaultRenderMenuList(menuListProps, classNames, defaultRender),
                      ),
                      adjustedFocusZoneProps,
                    )
                  : null}
                {submenuProps && onRenderSubMenu(submenuProps, onDefaultRenderSubMenu)}
              </div>
            </Callout>
          )}
        </MenuContext.Consumer>
      );
    } else {
      return null;
    }
    //#endregion
  }),
  (prevProps, newProps) => {
    if (!newProps.shouldUpdateWhenHidden && prevProps.hidden && newProps.hidden) {
      // Do not update when hidden.
      return true;
    }

    return shallowCompare(prevProps, newProps);
  },
);
ContextualMenuBase.displayName = 'ContextualMenuBase';

/**
 * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
 */
function isAltOrMeta(ev: React.KeyboardEvent<HTMLElement>): boolean {
  // eslint-disable-next-line deprecation/deprecation
  return ev.which === KeyCodes.alt || ev.key === 'Meta';
}

function onItemMouseDown(item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>): void {
  item.onMouseDown?.(item, ev);
}

function onDefaultRenderSubMenu(
  subMenuProps: IContextualMenuProps,
  defaultRender?: IRenderFunction<IContextualMenuProps>,
): JSX.Element {
  throw Error(
    'ContextualMenuBase: onRenderSubMenu callback is null or undefined. ' +
      'Please ensure to set `onRenderSubMenu` property either manually or with `styled` helper.',
  );
}

/**
 * Returns the item that matches a given key if any.
 * @param key - The key of the item to match
 * @param items - The items to look for the key
 */
function findItemByKeyFromItems(key: string, items: IContextualMenuItem[]): IContextualMenuItem | undefined {
  for (const item of items) {
    if (item.itemType === ContextualMenuItemType.Section && item.sectionProps) {
      const match = findItemByKeyFromItems(key, item.sectionProps.items);
      if (match) {
        return match;
      }
    } else if (item.key && item.key === key) {
      return item;
    }
  }
}

function getOnClickWithOverrideTarget(
  onClick:
    | ((
        ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined,
        item?: IContextualMenuItem | undefined,
      ) => boolean | void)
    | undefined,
  target: Target | undefined,
) {
  return onClick
    ? (
        ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined,
        item?: IContextualMenuItem | undefined,
      ) => {
        overrideTarget(ev, target);

        return onClick(ev, item);
      }
    : onClick;
}

function overrideTarget(
  ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined,
  target?: Target,
): void {
  if (ev && target) {
    ev.persist();

    if (target instanceof Event) {
      ev.target = target.target as HTMLElement;
    } else if (target instanceof Element) {
      ev.target = target;
    }
  }
}
