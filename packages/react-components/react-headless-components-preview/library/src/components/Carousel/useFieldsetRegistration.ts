'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';

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
  // A new consumer ref can detach and reattach the same node in one commit. Key the subscription
  // on the final node, not on how many times the merged ref was called.
  const [committedNode, setNode] = React.useState<T | null>(null);
  const location = useMergedRefs<T>(setNode);
  const [fieldsetRevision, refresh] = React.useReducer((value: number) => value + 1, 0);
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
  }, [location, committedNode, register, fieldsetRevision]);
  return location;
}
