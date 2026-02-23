# Migrate Custom Accessibility

This guide provides instructions for migrating custom accessibility applied on stardust components to v9 components.

## Migrate aria attributes

Aria attributes should be kept during migration. They can be applied as props to the new component directly.

## Migrate custom `accessibility` prop

Custom `accessibility` prop has 4 properties:

- `attributes`, contains aria attributes that can be applied directly to v9 components.
- `keyActions` and `childBehaviors` are specific to @fluentui/react-northstar. The functionality is usually included in the components, for special cases contact Fluent UI team.
- `focusZone` adds arrow key navigation to the container and child components. Consider replacing them with [react-tabster](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-tabster)

## Migrate arrow key navigation

Before:

After:

## Migrate focus on mount

Before:

After:
