import * as React from 'react';
// TODO
// getId() is a temporary approach, useId() should be reimplemented to properly support SSR & scenarios with
// different globals (document, window)
let id = 0;

export function getId(prefix?: string): string {
  return (prefix || '') + id++;
}

export function resetIds(): void {
  id = 0;
}

/**
 * Hook to generate a unique ID in the global scope (spanning across duplicate copies of the same library).
 *
 * @param prefix - Optional prefix for the ID
 * @param providedId - Optional id provided by a parent component. Defaults to the provided value if present,
 *  without conditioning the hook call
 * @returns The ID
 */
export function useId(prefix?: string, providedId?: string): string {
  // getId should only be called once since it updates the global constant for the next ID value.
  // (While an extra update isn't likely to cause problems in practice, it's better to avoid it.)
  const ref = React.useRef<string | undefined>(providedId);
  if (!ref.current) {
    ref.current = getId(prefix);
  }
  return ref.current;
}
