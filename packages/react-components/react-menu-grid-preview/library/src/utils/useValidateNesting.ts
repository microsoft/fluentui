'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import type { MenuContextValue } from '@fluentui/react-menu';
import { useMenuContext_unstable } from '@fluentui/react-menu';

type NestingComponentName = 'MenuGrid' | 'MenuGridCell' | 'MenuGridItem' | 'MenuGridRow';
type MenuItemRoles = 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';

const menuItemRoleToNameMapping = {
  menuitem: 'MenuItem',
  menuitemcheckbox: 'MenuItemCheckbox',
  menuitemradio: 'MenuItemRadio',
};

export const useValidateNesting = (componentName: NestingComponentName): React.RefObject<HTMLElement | null> => {
  'use no memo';

  const { targetDocument } = useFluent();
  const triggerRef = useMenuContext_unstable((context: MenuContextValue) => context.triggerRef);
  const inline = useMenuContext_unstable((context: MenuContextValue) => context.inline);
  const ref = React.useRef<HTMLElement | null>(null);

  if (process.env.NODE_ENV !== 'production') {
    // This check should run only in development mode
    // It's okay to disable the ESLint rule because we ar checking env variable statically (not at runtime)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      let ancestor = ref.current;
      let ancestorRole;

      do {
        ancestor = ancestor?.parentElement ?? null;
        ancestorRole = ancestor?.getAttribute('role');
        if (ancestor?.classList.contains('fui-MenuGrid')) {
          if (componentName === 'MenuGridCell') {
            throw new Error(
              'MenuGridCell is incorrectly nested within MenuGrid. You probably want to wrap it in a MenuGridRow.',
            );
          }
          break;
        }
        if (ancestor?.classList.contains('fui-MenuGridRow') && componentName === 'MenuGridCell') {
          break;
        }
        if (['menuitem', 'menuitemcheckbox', 'menuitemradio'].includes(ancestorRole ?? '')) {
          throw new Error(
            `${componentName} is incorrectly nested within ${
              menuItemRoleToNameMapping[ancestorRole as MenuItemRoles]
            } or within an element with the "${ancestorRole}" role.`,
          );
        }
        if (ancestorRole === 'menu') {
          let message = '';
          let breakAncestorTraversal = false;
          switch (componentName) {
            case 'MenuGrid':
              if (inline && getMenuOfTrigger(triggerRef.current, targetDocument) === ancestor) {
                // Handle the case when MenuGrid is inline next to its menu trigger which is a submenu item of the parent menu
                breakAncestorTraversal = true;
                break;
              }
              message = 'MenuGrid is incorrectly nested within MenuList or within an element with the "menu" role.';
              break;
            case 'MenuGridCell':
              message =
                'MenuGridCell is incorrectly nested within MenuList or within an element with the "menu" role. You probably want to wrap it in a MenuGridRow.';
              break;
            case 'MenuGridItem':
              message =
                'MenuGridItem is incorrectly nested within MenuList or within an element with the "menu" role. You probably want to wrap it in a MenuGrid instead.';
              break;
            case 'MenuGridRow':
              message =
                'MenuGridRow is incorrectly nested within MenuList or within an element with the "menu" role. You probably want to wrap it in a MenuGrid instead.';
              break;
          }
          if (breakAncestorTraversal) {
            break;
          }
          throw new Error(message);
        }
      } while (ancestor && ancestor !== targetDocument?.body);
    }, [componentName, ref, triggerRef, inline, targetDocument]);
  }
  return ref;
};

const getMenuOfTrigger = (trigger: HTMLElement | null, targetDocument?: Document): HTMLElement | null => {
  let ancestor = trigger?.parentElement;
  while (ancestor && ancestor !== targetDocument?.body) {
    if (ancestor?.getAttribute('role') === 'menu') {
      return ancestor;
    }
    ancestor = ancestor?.parentElement ?? null;
  }
  return null;
};
