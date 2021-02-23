# @fluentui/react-focus-management Spec

> This spec is under active development as more [ability-helpers](https://github.com/microsoft/ability-helpers) functionality and exposed under the proposed context/hook API.

## Background

This package acts as a facade wrapper around [ability-helpers](https://github.com/microsoft/ability-helpers) and exposes a set of hooks and utilities for focus management

This spec proposes an API based on React hooks pattern. [ability-helpers](https://github.com/microsoft/ability-helpers) works mainly on adding `data-*` attributes to DOM elements to apply configurable behaviours to the 'groups' of focusables.

However some internal behaviours such as `modalizer` or `deloser` require DOM elements during the configuration phase, which will be most easily configured in React using `refs`.

Therefore it must be noted that **although some hooks might not require ref interaction and can simply return attributes to be spread, in an effort to maintain consistency refs are used, which fits the Fluent component design patterns**

## Prior Art

No Open UI research was conducted for this spec because it is not a UI component that should be rendered on DOM.

### Focus Zone

Comparison TBA

## Sample Code

### FocusManagementProvider

The package will export only one component which is a context provider. This provider can be consumed directly if used exclusively as single package but is intended be used within the `FluentProvider`.

```typescript
// Inner FocusManagementProvider should be configured by `FluentProvider`
<FluentProvider>
  ...
</FluentProvider>

<FocusManagementProvider dir="ltr" window={window} ahProps={/** ability-helpers props **/}>
...
</FocusManagementProvider>
```

_Provide some representative example code that uses the proposed API for the component_

### Hooks

This spec proposes an API based on React hooks pattern. [ability-helpers](https://github.com/microsoft/ability-helpers) works mainly on adding `data-*` attributes to DOM elements to apply configurable behaviours to the 'groups' of focusables.

However some internal behaviours such as `modalizer` or `deloser` require DOM elements during the configuration phase, which will be most easily configured in React using `refs`.

Therefore it must be noted that **although some hooks might not require ref interaction and can simply return attributes to be spread, in an effort to maintain consistency refs are used, which fits the Fluent component design patterns**

```typescript
// Basic up/down keyboard navigation
const ref = useKeyboardNavigationGroup();

<div ref={ref}>{props.children}</div>;
```

```typescript
const ref = React.useReact<HTMLElement>();
const {
  findFirst,
  findLast,
  findAll,
} = useFocusable(ref); // All operations are with respect to the given DOM container

findFirst() // first focusable
findLast() // first last focusable
findAll(condition: () => true) // first all focusables with condition

<div ref={ref}>{props.children}</div>
```

## API

### FocusManagementProvider

Context provider that hosts the [ability-helpers](https://github.com/microsoft/ability-helpers) instance and its API objects.

The below table defines what is included in the context value

> Note that this table will increase as more ability-helpers features are included in Fluent

| Name      | Value        | Description                           |
| --------- | ------------ | ------------------------------------- |
| focusable | FocusableAPI | API for traversing focusable elements |

The below table defines the props used by the provider component. All context values can be used as props in the provider component but are optional.

| Name                   | Value              | Description                                                                                                           |
| ---------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| dir                    | 'ltr' \| 'rtl'     | Direction indicator, some keyboard behaviour will need to change based on this value                                  |
| Deloser                | DeloserAPI         | Tools to help automatically restore focus when it gets lost without manually calling `.focus()` from application code |
| internal\_\_ahInstance | AbilityHelpersCore | The ability helpers instance, not expected to be be used directly                                                     |

### useFocusable

A hook that exposes helper methods to traverse focusable elements in the context of a DOM element.

The below table lists the helper functions to support:

| Name      | Value         | Options                  | Description                                         |
| --------- | ------------- | ------------------------ | --------------------------------------------------- |
| findFirst | HTMLElement   |                          | Finds the first focusable element                   |
| findLast  | HTMLElement   |                          | Finds the last focusable element                    |
| findAll   | HTMLElement[] | boolean matcher function | Finds all focusable elements that match a condition |

### useKeyboardNagiationGroup

A hook that returns a `ref` to be assigned to the container of a group of focusable elements that should support keyboard navigation

The below table lists the configuration options that the hook should support:

| Name          | Value                  | Description                                                                                               |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| axis          | vertical \| horizontal | Indicates which direction keyboard navigation should use                                                  |
| enableHomeEnd | boolean                | Enables the use of `Home` and `End` keys to navigate to first and last elements of the group respectively |
| cyclic        | boolean                | Indicates that navigation should not stop at first and last elements respectively                         |

## Migration

Migration guide TBA

## Behaviors

### Keyboard navigation

Provides a hook based API that can be applied to containers to manage common keyboard navigation behaviours such as:

- Arrow keys item navigation
- Cyclic focus navigation in an item group
- Home/End keys for item navigation
- Tab stops for arrow navigable groups

### Focus delosing

TBA for now quote [originial README](https://github.com/microsoft/ability-helpers#deloser)

```
When you remove, for example, a button which has focus from the DOM, the focus gets lost which is confusing for the screen reader and keyboard navigation users. Deloser is a concept which helps to automatically restore the focus when it gets lost without manually calling .focus() method from the application code.
```

### Groupping focusables

TBA for now quote [originial README](https://github.com/microsoft/ability-helpers#deloser)

```
Keyboard navigation for the lists should allow to avoid going through every list item when the users use Tab key (only one item of the list should be tabbable), also the arrow keys and Home/End/PageUp/PageDown keys should be handled to move between the list items. This is an API to easily make properly behaving lists.
```

### Focus outline

TBA for now quote [originial README](https://github.com/microsoft/ability-helpers#outline)

```
When people navigate with the keyboard, the currently focused element should be properly highlighted. There is a CSS property called outline, which is unfortunately insufficient: the outline of an element gets cropped when a parent element has overflow: hidden, there is no way to limit the outline visibility to only the cases when the user is navigating with keyboard. So, we have a custom outline component which is supposed to solve both of the problems.
```

## Accessibility

TBA - ideally to be removed as the rest of the spec should deal specifically with focus management in a11y scenarios
