import type * as React from 'react';
import { mergeCallbacks } from '@fluentui/react-utilities';
import type { RefAttributes } from '@fluentui/react-utilities';

/**
 * Applies defined consumer overrides over default element props, including roles, focus, ARIA and data attributes.
 * Undefined overrides are omitted; explicit null content is preserved. Classes and styles are merged,
 * refs are composed, and consumer event handlers run before default handlers. Calling `preventDefault()`
 * in a consumer handler skips the default handler.
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
      const defaultValue = defaults[key as keyof A];
      if (key.startsWith('on') && typeof value === 'function' && typeof defaultValue === 'function') {
        const callHandler =
          (handler: (...args: never[]) => void) =>
          (...args: unknown[]) => {
            Reflect.apply(handler, undefined, args);
          };
        const defaultHandler = callHandler(defaultValue as (...args: never[]) => void);
        Object.assign(result, {
          [key]: mergeCallbacks(callHandler(value as (...args: never[]) => void), (...args: unknown[]) => {
            const event = args[0] as { defaultPrevented?: boolean; isDefaultPrevented?: () => boolean } | undefined;
            if (!event?.defaultPrevented && !event?.isDefaultPrevented?.()) {
              defaultHandler(...args);
            }
          }),
        });
      } else {
        Object.assign(result, { [key]: value });
      }
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
