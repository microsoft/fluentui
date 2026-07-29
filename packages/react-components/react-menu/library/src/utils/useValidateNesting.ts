'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import type { MenuContextValue } from '../contexts/menuContext';
import { useMenuContext_unstable } from '../contexts/menuContext';
import { menuListClassNames } from '../components/MenuList/useMenuListStyles.styles';

type NestingComponentName = 'MenuList' | 'MenuItem' | 'MenuItemCheckbox' | 'MenuItemRadio';

export const useValidateNesting = (componentName: NestingComponentName): React.RefObject<HTMLElement | null> => {
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
      let ancestorComponentName = '';
      do {
        ancestor = ancestor?.parentElement ?? null;
        // `menuListClassNames.root` is the group marker after DECISIONS.md D16.1/D16.5.
        // `classList.contains` takes a class TOKEN, so the `/` needs no escaping (only a
        // SELECTOR would — that is what `fuiSelector()` is for).
        //
        // The `fui-MenuGrid*` literals below are @fluentui/react-menu-grid-preview's statics,
        // NOT this package's: that package is `needs-conversion` in the migration ledger and
        // still renders them. They stay verbatim until it converts — the same
        // reach-into-an-unconverted-package exception the `:global(.fui-Icon-*)` rules take.
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained identity constant (D16.5)
        if (ancestor?.classList.contains(menuListClassNames.root)) {
          break;
        } else if (ancestor?.classList.contains('fui-MenuGrid')) {
          ancestorComponentName = 'MenuGrid';
        } else if (ancestor?.classList.contains('fui-MenuGridItem')) {
          ancestorComponentName = 'MenuGridItem';
        } else if (ancestor?.classList.contains('fui-MenuGridRow')) {
          ancestorComponentName = 'MenuGridRow';
        } else if (ancestor?.classList.contains('fui-MenuGridCell')) {
          ancestorComponentName = 'MenuGridCell';
        }
        if (['MenuItem', 'MenuItemCheckbox', 'MenuItemRadio'].includes(componentName)) {
          if (['MenuGrid', 'MenuGridItem', 'MenuGridRow', 'MenuGridCell'].includes(ancestorComponentName)) {
            throw new Error(
              `${componentName} is incorrectly nested within ${ancestorComponentName}. You probably want to wrap it in a MenuList instead.`,
            );
          }
        } else if (componentName === 'MenuList') {
          if (ancestorComponentName === 'MenuGridCell') {
            if (inline && getCellOfTrigger(triggerRef.current, targetDocument) === ancestor) {
              break;
            }
            throw new Error(`MenuList is incorrectly nested within MenuGridCell.`);
          } else if (['MenuGrid', 'MenuGridItem', 'MenuGridRow'].includes(ancestorComponentName)) {
            throw new Error(`MenuList is incorrectly nested within ${ancestorComponentName}.`);
          }
        }
      } while (ancestor && ancestor !== targetDocument?.body);
    }, [componentName, ref, triggerRef, inline, targetDocument]);
  }
  return ref;
};

const getCellOfTrigger = (trigger: HTMLElement | null, targetDocument?: Document): HTMLElement | null => {
  let ancestor = trigger?.parentElement;
  while (ancestor && ancestor !== targetDocument?.body) {
    if (ancestor?.classList.contains('fui-MenuGridCell')) {
      return ancestor;
    }
    ancestor = ancestor?.parentElement ?? null;
  }
  return null;
};
