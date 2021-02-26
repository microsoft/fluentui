# @fluentui/react-tooltip Spec

## Background

Tooltips provide additional information about an element when hovering or focusing on the element.

## Prior Art

- OpenUI [Tooltip resarch](https://open-ui.org/components/tooltip.research)
- Tooltip Convergence Epic Issue [#16735](https://github.com/microsoft/fluentui/issues/16735)

### Tooltips in Fabric (v8)

TODO

### Tooltips in Northstar (v0)

TODO

## Sample Code

There are a few ways to add a tooltip to a component.

### A component with a `tooltip` slot

Components can choose to expose a pseudo-slot `tooltip`, by inheriting props from the `WithTooltipSlot` interface and using the `useTooltipSlot` hook.

While this looks and acts like a normal slot to users, the `Tooltip` is not actually rendered by the component, but rather passed to the `TooltipManager` to render. The `useTooltipSlot` hook is lightweight (small bundle size impact); it does not have a direct dependency on the `Tooltip` or `TooltipManager` classes.

For example, to add the `tooltip` slot to Button:

```typescript
// Button.types.ts:
export interface ButtonProps extends WithTooltipSlot /*...*/ {
  // ...
}

// useButton.ts:
export const useButton = (/*...*/) => {
  const state = mergeProps(/*...*/);

  useTooltipSlot(state);
  // ...
};
```

Example usage:

```jsx
<Button tooltip="Example tooltip" />
<Button tooltip={<>Custom <b>Tooltip</b> Content!</>} />
<Button tooltip={{ children: 'Placed Tooltip', placement: 'right' }} />
<Button tooltip={{ as: MyTooltip, children: 'You can even implement your own tooltip' }} />
```

### On any element using a ref

To attach a tooltip to a component that doesn't have a `tooltip` slot, use the `useTooltipRef` hook. It takes the same shorthand props that the `tooltip` slot does. This is slightly less ergonomic than the tooltip slot, and requires using a ref, but works with any element.

```jsx
<div ref={useTooltipRef('Example tooltip')}>A div with a tooltip</div>
<ThirdPartyComponent ref={useTooltipRef(<>Tooltips <u>everywhere</u>!</>)} />
```

### Render a Tooltip directly (no positioning or layering):

```jsx
<Tooltip>Tooltip text</Tooltip>
```

## Variants

- The tooltip can have a `subtle` style variant with a different background and text color.

## API

The Tooltip API is split among several components and hooks, in two packages:

- **@fluentui/react-tooltip**
  - `Tooltip`
  - `TooltipManager`
- **@fluentui/react-tooltip-provider**
  - `TooltipProvider`
  - `useTooltipSlot`
  - `useTooltipRef`

### @fluentui/react-tooltip

The `react-tooltip` package contains the bulk of the implementation of tooltips, including rendering, styling, positioning, etc. This will be a larger package, but can be lazy-loaded and doesn't need to be included in an app's bundle directly.

#### Tooltip

`Tooltip` renders the tooltip itself when it is visible.

#### TooltipManager

`TooltipManager` handles showing and hiding tooltips, including positioning and tracking the visible tooltip. There is only one instance at the root of the app.

### @fluentui/react-tooltip-provider

The `react-tooltip-provider` is a lightweight package that allows any component to hook into tooltip functionality.

#### TooltipProvider

`TooltipProvider` is responsible for lazy-loading `TooltipManager`. It creates a React context that provides a ref to the `TooltipManager` once it is loaded. This context will also be built into `FluentContext`.

#### useTooltipSlot

The `useTooltipSlot` hook adds React event listeners for pointer and focus events to the component's state. It passes the tooltip props to the `TooltipManager`.

#### useTooltipRef

The `useTooltipRef` hook creates a ref function that adds native event listeners to any element.

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)

```

```
