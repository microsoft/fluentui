import * as React from 'react';

/**
 * normalizes defaultPrevented to work the same way between synthetic events and regular event
 */
export function normalizeDefaultPrevented(event: React.SyntheticEvent | Event) {
  if (event instanceof Event) {
    return () => event.defaultPrevented;
  }
  return event.isDefaultPrevented;
}
