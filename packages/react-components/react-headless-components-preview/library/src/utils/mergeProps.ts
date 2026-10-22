import type * as React from 'react';
import { mergeCallbacks } from '@fluentui/react-utilities';
import type { RefAttributes } from '@fluentui/react-utilities';

/**
 * Applies defined consumer overrides over default element props, including roles, focus, ARIA and data attributes.
 * Undefined overrides are omitted; explicit null content is preserved. Classes and styles are merged,
 * refs are composed, and consumer event handlers replace defaults rather than being composed.
 * @internal
 */
export function mergeProps<E extends HTMLElement, A extends React.HTMLAttributes<E>>(
  defaults: A & RefAttributes<E>,
  overrides?: A & RefAttributes<E>,
): A & RefAttributes<E> {
  if (!overrides) {
    return defaults;
  }

  const result = { ...defaults };
  for (const [key, value] of Object.entries(overrides)) {
    if (value !== undefined) {
      Object.assign(result, { [key]: value });
    }
  }
  if (defaults.className) {
    result.className = overrides.className ? `${defaults.className} ${overrides.className}` : defaults.className;
  }
  if (defaults.style && overrides.style) {
    result.style = { ...defaults.style, ...overrides.style };
  }
  const defaultRef = defaults.ref;
  const overrideRef = overrides.ref;
  if (defaultRef) {
    result.ref = overrideRef
      ? mergeCallbacks(
          value => {
            if (typeof defaultRef === 'function') {
              defaultRef(value);
            } else {
              Object.assign(defaultRef, { current: value });
            }
          },
          value => {
            if (typeof overrideRef === 'function') {
              overrideRef(value);
            } else {
              Object.assign(overrideRef, { current: value });
            }
          },
        )
      : defaultRef;
  }
  return result;
}
