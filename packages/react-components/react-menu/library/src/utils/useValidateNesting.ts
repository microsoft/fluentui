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
        // The `group/fui-menu-grid*` literals below are @fluentui/react-menu-grid-preview's
        // markers, NOT this package's. They are written as LITERALS rather than imported
        // because that package depends on this one — importing its `menuGrid*ClassNames`
        // here would close a package cycle. They were the BEM statics `fui-MenuGrid*` until
        // menu-grid-preview converted in BATCH-5; re-pointing them is the design-sanctioned
        // cross-package half of that conversion.
        //
        // Marker tokens are compared whole, so `group/fui-menu-grid` does NOT match a
        // `group/fui-menu-grid-row` element — the same non-prefix semantics the old
        // `fui-MenuGrid` / `fui-MenuGridRow` statics had. The branch ORDER is load-bearing
        // and unchanged: a MenuGridItem root IS a MenuGridRow root and carries both markers,
        // so `MenuGridItem` must be tested before `MenuGridRow` to keep winning, exactly as
        // it did when the element carried both statics.
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained identity constant (D16.5)
        if (ancestor?.classList.contains(menuListClassNames.root)) {
          break;
        } else if (ancestor?.classList.contains('group/fui-menu-grid')) {
          ancestorComponentName = 'MenuGrid';
        } else if (ancestor?.classList.contains('group/fui-menu-grid-item')) {
          ancestorComponentName = 'MenuGridItem';
        } else if (ancestor?.classList.contains('group/fui-menu-grid-row')) {
          ancestorComponentName = 'MenuGridRow';
        } else if (ancestor?.classList.contains('group/fui-menu-grid-cell')) {
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
    // @fluentui/react-menu-grid-preview's marker (D16.1/D16.5), a literal for the same
    // package-cycle reason as the chain above.
    if (ancestor?.classList.contains('group/fui-menu-grid-cell')) {
      return ancestor;
    }
    ancestor = ancestor?.parentElement ?? null;
  }
  return null;
};
