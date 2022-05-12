import * as React from 'react';

/**
 * Allows a component to be tagged as a FluentUI trigger component.
 *
 * Triggers are special-case components: they attach event listeners and other props on their child,
 * and use them to trigger another component to show. Examples include `MenuTrigger` and `Tooltip`.
 *
 * A component can be tagged as a trigger as follows:
 * ```ts
 * const MyComponent: React.FC<MyComponentProps> & FluentTriggerComponent = ...;
 *
 * MyComponent.isFluentTriggerComponent = true; // MUST also set this to true
 * ```
 */
export type FluentTriggerComponent = {
  isFluentTriggerComponent?: boolean;
};

/**
 * Checks if a given element is a FluentUI trigger (e.g. `MenuTrigger` or `Tooltip`).
 * See the {@link FluentTriggerComponent} type for more info.
 */
export const isFluentTrigger = (element: React.ReactElement) => {
  return (element.type as FluentTriggerComponent).isFluentTriggerComponent;
};
