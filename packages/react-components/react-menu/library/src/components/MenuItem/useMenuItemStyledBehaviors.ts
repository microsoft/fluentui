'use client';

import type * as React from 'react';
import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { useIsInMenuSplitGroup, useMenuSplitGroupContext_unstable } from '../../contexts/menuSplitGroupContext';
import { useValidateNesting } from '../../utils/useValidateNesting';
import type { MenuItemProps } from './MenuItem.types';

/**
 * Adds the parts of MenuItem that only the styled `@fluentui/react-menu` components need on top of a base state:
 * - notifies a parent MenuSplitGroup when the item is in multiline layout mode, so the group can adjust its styles
 * - validates (in development only) that the item is not nested inside a MenuGrid, which relies on `fui-*` classnames
 *
 * Shared by `useMenuItem_unstable`, `useMenuItemCheckbox_unstable`, `useMenuItemRadio_unstable` and
 * `useMenuItemSwitch_unstable`, so that their base hooks stay free of layout-only logic.
 *
 * @internal
 */
export const useMenuItemStyledBehaviors = (
  props: Pick<MenuItemProps, 'subText'>,
  // `hasSubmenu` is optional because `MenuItemSwitchState` doesn't declare it, although it's always present at runtime
  state: { hasSubmenu?: boolean; root: { role?: string; ref?: React.Ref<HTMLDivElement> } },
): void => {
  useNotifySplitItemMultiline({ multiline: !!props.subText, hasSubmenu: !!state.hasSubmenu });

  if (process.env.NODE_ENV !== 'production') {
    // This check should run only in development mode
    // It's okay to disable the ESLint rule because we are checking env variable statically (not at runtime)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const validateNestingRef = useValidateNesting(getValidateNestingComponentName(state.root.role));
    // eslint-disable-next-line react-hooks/immutability, react-hooks/rules-of-hooks -- decorates the base state
    state.root.ref = useMergedRefs(state.root.ref, validateNestingRef as React.Ref<HTMLDivElement>);
  }
};

/**
 * MenuSplitGroup needs to apply extra styles when its main item is in multiline layout mode
 * Notify the parent MenuSplitGroup so that it can handle this case
 */
const useNotifySplitItemMultiline = (options: { hasSubmenu: boolean; multiline: boolean }) => {
  const { hasSubmenu, multiline } = options;
  const isSplitItemTrigger = useIsInMenuSplitGroup() && hasSubmenu;

  const { setMultiline } = useMenuSplitGroupContext_unstable();

  useIsomorphicLayoutEffect(() => {
    if (!isSplitItemTrigger) {
      setMultiline(multiline);
    }
  }, [setMultiline, multiline, isSplitItemTrigger]);
};

const getValidateNestingComponentName = (role?: string) => {
  switch (role) {
    case 'menuitemcheckbox':
      return 'MenuItemCheckbox';
    case 'menuitemradio':
      return 'MenuItemRadio';
  }
  return 'MenuItem';
};
