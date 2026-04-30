'use client';

import * as React from 'react';
import {
  useMergedRefs,
  useEventCallback,
  useControllableState,
  getIntrinsicElementProps,
  slot,
} from '@fluentui/react-utilities';
import {
  useArrowNavigationGroup,
  useFocusFinders,
  TabsterMoveFocusEventName,
  type TabsterMoveFocusEvent,
} from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import { MenuContext } from '../../contexts/menuContext';
import type { MenuListBaseProps, MenuListBaseState, MenuListProps, MenuListState } from './MenuList.types';
import { useValidateNesting } from '../../utils/useValidateNesting';

const MENU_ITEM_ROLES = ['menuitem', 'menuitemcheckbox', 'menuitemradio'];
const MENU_ITEM_ROLES_SELECTOR = MENU_ITEM_ROLES.map(role => `[role="${role}"]`).join(',');

/**
 * Returns the props and state required to render the component.
 *
 * Composes with `useMenuListBase_unstable` and adds Tabster-driven keyboard
 * navigation: circular arrow-key focus, a `TabsterMoveFocusEvent` listener
 * that lets `useMenuPopover_unstable` handle Tab key presses, a focus-aware
 * `setFocusByFirstCharacter`, and the `hasIcons` / `hasCheckmarks` slot
 * alignment hints sourced from the parent `MenuContext`.
 */
export const useMenuList_unstable = (props: MenuListProps, ref: React.Ref<HTMLElement>): MenuListState => {
  const menuContext = useMenuContextSelectors();
  const hasMenuContext = useHasParentContext(MenuContext);

  if (usingPropsAndMenuContext(props, menuContext, hasMenuContext)) {
    // TODO throw warnings in development safely
    // eslint-disable-next-line no-console
    console.warn('You are using both MenuList and Menu props, we recommend you to use Menu props when available');
  }

  const wrapperRef = React.useRef<HTMLElement>(null);
  const { findAllFocusable } = useFocusFinders();
  const { targetDocument } = useFluent();
  const focusAttributes = useArrowNavigationGroup({ circular: true });

  const baseState = useMenuListBase_unstable(props, ref);
  // recreate root non-mutatively: merge wrapperRef so the effect below can
  // observe the rendered DOM element, and add Tabster arrow-nav attributes
  const mergedRootRef = useMergedRefs(baseState.root.ref, wrapperRef) as React.Ref<HTMLDivElement>;

  React.useEffect(() => {
    const element = wrapperRef.current;
    if (!targetDocument || !element) {
      return;
    }

    const onTabsterMoveFocus = (e: TabsterMoveFocusEvent) => {
      const nextElement = e.detail.next;
      if (nextElement && element.contains(targetDocument.activeElement) && !element.contains(nextElement)) {
        // Preventing Tabster from handling Tab press, useMenuPopover will handle it.
        e.preventDefault();
      }
    };

    targetDocument.addEventListener(TabsterMoveFocusEventName, onTabsterMoveFocus);
    return () => {
      targetDocument.removeEventListener(TabsterMoveFocusEventName, onTabsterMoveFocus);
    };
  }, [targetDocument]);

  const setFocusByFirstCharacter = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => {
      if (!wrapperRef.current) {
        return;
      }
      const menuItems = findAllFocusable(
        wrapperRef.current,
        (el: HTMLElement) => el.hasAttribute('role') && MENU_ITEM_ROLES.indexOf(el.getAttribute('role')!) !== -1,
      );
      focusItemMatchingFirstCharacter(menuItems, e.key, itemEl);
    },
    [findAllFocusable],
  );

  return {
    ...baseState,
    root: {
      ...baseState.root,
      ...focusAttributes,
      ref: mergedRootRef,
    },
    setFocusByFirstCharacter,
    hasIcons: menuContext.hasIcons || false,
    hasCheckmarks: menuContext.hasCheckmarks || false,
  };
};

/**
 * Base hook for MenuList component, produces state required to render the component.
 *
 * Tabster-free: this hook does not import from `@fluentui/react-tabster` and does
 * not couple consumers to Tabster's runtime. It drops the design-related slot
 * alignment hints (`hasIcons`, `hasCheckmarks`), the arrow-key navigation
 * data-attributes, the `TabsterMoveFocusEvent` listener that coordinates Tab
 * key handling with `useMenuPopover_unstable`, and uses a native DOM walker
 * for `setFocusByFirstCharacter`.
 *
 * @internal
 */
export const useMenuListBase_unstable = (props: MenuListBaseProps, ref: React.Ref<HTMLElement>): MenuListBaseState => {
  const triggerId = useMenuContext_unstable(context => context.triggerId);
  const checkedValuesContext = useMenuContext_unstable(context => context.checkedValues);
  const onCheckedValueChangeContext = useMenuContext_unstable(context => context.onCheckedValueChange);
  const hasMenuContext = useHasParentContext(MenuContext);

  const innerRef = React.useRef<HTMLElement>(null);
  const validateNestingRef = useValidateNesting('MenuList');

  const setFocusByFirstCharacter = React.useCallback((e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => {
    if (!innerRef.current) {
      return;
    }
    const menuItems = Array.from(innerRef.current.querySelectorAll<HTMLElement>(MENU_ITEM_ROLES_SELECTOR));
    focusItemMatchingFirstCharacter(menuItems, e.key, itemEl);
  }, []);

  const [checkedValues, setCheckedValues] = useControllableState({
    state: props.checkedValues ?? (hasMenuContext ? checkedValuesContext : undefined),
    defaultState: props.defaultCheckedValues,
    initialState: {},
  });

  const handleCheckedValueChange =
    props.onCheckedValueChange ?? (hasMenuContext ? onCheckedValueChangeContext : undefined);

  const toggleCheckbox = useEventCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string, checked: boolean) => {
      const checkedItems = checkedValues?.[name] || [];
      const newCheckedItems = [...checkedItems];
      if (checked) {
        newCheckedItems.splice(newCheckedItems.indexOf(value), 1);
      } else {
        newCheckedItems.push(value);
      }

      handleCheckedValueChange?.(e, { name, checkedItems: newCheckedItems });
      setCheckedValues(s => ({ ...s, [name]: newCheckedItems }));
    },
  );

  const selectRadio = useEventCallback((e: React.MouseEvent | React.KeyboardEvent, name: string, value: string) => {
    const newCheckedItems = [value];
    setCheckedValues(s => ({ ...s, [name]: newCheckedItems }));
    handleCheckedValueChange?.(e, { name, checkedItems: newCheckedItems });
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, innerRef, validateNestingRef) as React.Ref<HTMLDivElement>,
        role: 'menu',
        'aria-labelledby': triggerId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    checkedValues,
    hasMenuContext,
    setFocusByFirstCharacter,
    selectRadio,
    toggleCheckbox,
  };
};

/**
 * Focuses the next menu item whose textContent starts with the typed character,
 * wrapping around the list. Shared between the Tabster-free base impl and the
 * Tabster-aware wrapper.
 */
const focusItemMatchingFirstCharacter = (menuItems: HTMLElement[], key: string, current: HTMLElement) => {
  let startIndex = menuItems.indexOf(current) + 1;
  if (startIndex === menuItems.length) {
    startIndex = 0;
  }

  const firstChars = menuItems.map(menuItem => menuItem.textContent?.charAt(0).toLowerCase());
  const char = key.toLowerCase();

  const getIndexFirstChars = (start: number) => {
    for (let i = start; i < firstChars.length; i++) {
      if (char === firstChars[i]) {
        return i;
      }
    }
    return -1;
  };

  let index = getIndexFirstChars(startIndex);
  if (index === -1) {
    index = getIndexFirstChars(0);
  }
  if (index > -1) {
    menuItems[index].focus();
  }
};

/**
 * Adds some sugar to fetching multiple context selector values
 */
const useMenuContextSelectors = () => {
  const checkedValues = useMenuContext_unstable(context => context.checkedValues);
  const onCheckedValueChange = useMenuContext_unstable(context => context.onCheckedValueChange);
  const triggerId = useMenuContext_unstable(context => context.triggerId);
  const hasIcons = useMenuContext_unstable(context => context.hasIcons);
  const hasCheckmarks = useMenuContext_unstable(context => context.hasCheckmarks);

  return {
    checkedValues,
    onCheckedValueChange,
    triggerId,
    hasIcons,
    hasCheckmarks,
  };
};

/**
 * Helper function to detect if props and MenuContext values are both used
 */
const usingPropsAndMenuContext = (
  props: MenuListProps,
  contextValue: ReturnType<typeof useMenuContextSelectors>,
  hasMenuContext: boolean,
) => {
  let isUsingPropsAndContext = false;
  for (const val in contextValue) {
    if (props[val as keyof Omit<typeof contextValue, 'hasMenuContext' | 'onCheckedValueChange' | 'triggerId'>]) {
      isUsingPropsAndContext = true;
    }
  }

  return hasMenuContext && isUsingPropsAndContext;
};
