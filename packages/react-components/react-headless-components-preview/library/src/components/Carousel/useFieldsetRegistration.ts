'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

function getFieldsets(node: HTMLElement): HTMLFieldSetElement[] {
  const fieldsets: HTMLFieldSetElement[] = [];
  for (
    let fieldset = node.closest('fieldset');
    fieldset;
    fieldset = fieldset.parentElement?.closest('fieldset') ?? null
  ) {
    fieldsets.push(fieldset);
  }
  return fieldsets;
}

/** Re-register in a single layout commit when the fieldsets at the control's DOM location change its availability. */
export function useFieldsetRegistration(
  location: React.RefObject<HTMLElement | null> | undefined,
  register: (enabled: boolean) => (() => void) | undefined,
): void {
  const [revision, refresh] = React.useReducer((value: number) => value + 1, 0);
  useIsomorphicLayoutEffect(() => {
    const node = location?.current;
    if (!node) {
      return location ? undefined : register(true);
    }
    const fieldsets = getFieldsets(node);
    if (!fieldsets.length) {
      return register(true);
    }

    // Only the first direct legend is exempt; an outer fieldset can still disable an inner legend's controls.
    const isEnabled = () =>
      fieldsets.every(fieldset => !fieldset.disabled || fieldset.querySelector(':scope > legend')?.contains(node));
    const enabled = isEnabled();
    const unregister = register(enabled);
    const Observer = node.ownerDocument.defaultView?.MutationObserver;
    const observer =
      Observer &&
      new Observer(() => {
        if (isEnabled() !== enabled) {
          refresh();
        }
      });
    fieldsets.forEach(fieldset => observer?.observe(fieldset, { attributeFilter: ['disabled'], childList: true }));
    return () => {
      observer?.disconnect();
      unregister?.();
    };
  }, [location, register, revision]);
}
