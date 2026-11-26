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
export function useFieldsetRegistration<T extends HTMLElement>(
  register: (enabled: boolean, node: T) => (() => void) | undefined,
): React.RefCallback<T> {
  const location = React.useRef<T | null>(null);
  const [revision, refresh] = React.useReducer((value: number) => value + 1, 0);
  const ref = React.useCallback((node: T | null) => {
    if (location.current !== node) {
      location.current = node;
      refresh();
    }
  }, []);
  useIsomorphicLayoutEffect(() => {
    // Read the committed ref even on the first pass, before the parent nav resolves autofocus.
    const node = location.current;
    if (!node) {
      return;
    }
    const fieldsets = getFieldsets(node);
    if (!fieldsets.length) {
      return register(true, node);
    }

    // Only the first direct legend is exempt; an outer fieldset can still disable an inner legend's controls.
    const isEnabled = () =>
      fieldsets.every(fieldset => !fieldset.disabled || fieldset.querySelector(':scope > legend')?.contains(node));
    const enabled = isEnabled();
    const unregister = register(enabled, node);
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
  }, [register, revision]);
  return ref;
}
