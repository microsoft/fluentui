import * as React from 'react';
import type { FluentTriggerComponent, TriggerProps } from './types';

/**
 * @internal
 * Checks if a given element is a FluentUI trigger (e.g. `MenuTrigger` or `Tooltip`).
 * See the {@link FluentTriggerComponent} type for more info.
 */
export function isFluentTrigger(element: React.ReactElement): element is React.ReactElement<TriggerProps> {
  return Boolean((element.type as FluentTriggerComponent).isFluentTriggerComponent);
}
