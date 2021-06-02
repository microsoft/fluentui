# RFC: Creating a structured contract for Trigger - like patterns

@ling1726

## Problem statement

```tsx
<Tooltip>
  <Button />
</Tooltip>

<Menu>
  <MenuTrigger>
    <Button />
  </MenuTrigger>
</Menu>

<Popover>
  <PopoverTrigger>
    <Button />
  </PopoverTrigger>
</Popover>
```

The above examples show the adoption of a `Trigger` pattern that was inspired from [react-spectrum](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html), where the library component will clone the child and add appropriate event handlers/props to handle complex interactions to simplify the lives of our users. These can be:

- `aria-*` and `id` attributes to ensure and a11y friendly experience
- `onClick` `onMouseEnter` `onFocus` event handlers

In the case of `Menu` and `Popover`. There is not really an easy way to know for consumers what exactly is being passed down to children components if they want to create their own components. `Tooltip` has been a great pioneer in this direction by introducing the possibility of using a render prop:

```tsx
<Tooltip content="The trigger button was rendered by a render function" triggerAriaAttribute="describedby">
  {triggerProps => (
    <div>
      <button {...triggerProps}>Custom trigger</button>
    </div>
  )}
</Tooltip>
```

Render props are not the most ergonomic to use and make optimizing the child with `PureComponent` or `memo` harder. since the child which is a function in this case will always be shallow compared. and `PureComponents` inside the render prop will be recreated.

## Detailed Design or Proposal

### Interfaces for Trigger props

All Trigger patterns should introduce an interface for the props that will be passed on to the child. Tooltip already has this interface:

```tsx
export type TooltipTriggerProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby' | 'aria-label'
>;
```

### Should trigger interfaces be hoisted out of component packages ?

```tsx
import { TooltipTriggerProps } from '@fluentui/react-tooltip';

export function CustomTooltipTriggerChild(props: TooltipTriggerProps);
```

```tsx
import { MenuTriggerProps } from '@fluentui/react-menu';

export function CustomMenuTriggerChild(props: MenuTriggerProps);
```

```tsx
import { PopoverTriggerProps } from '@fluentui/react-popover';

export function CustomPopoverTriggerChild(props: PopoverTriggerProps);
```

In each of the above cases we require a **hard dependency** on the component package to be able to access these types, which could create unnecessary coupling if the rest of the component is never used. It can also cause bundle size issues for customers that don't setup tree shaking properly.

To mitigate this we could hoist common type interfaces like this to a separate package so that there is no hard dependency on the component.

### Context vs Cloning

To solve the same problem highlighted in the above section, we could leverage `@fluentui/react-shared-contexts` and either:

- Switch from cloning to context
- Or allow both cloning and context

```tsx
import { useTooltipTriggerContext } from '@fluentui/react-shared-contexts'

export function CustomTooltipTriggerChild(props: TooltipTriggerProps) {
  // Provides all the spreadable DOM handlers and attributes required
  const context = useTooltipTriggerContext();
};

// Clones and provides props
<Tooltip clone>
  <Button />
</Tooltip>

// Does not clone and assumes the child uses context
<Tooltip>
  <CustomTooltipTriggerChild />
</Tooltip>
```

## Pros and Cons

### Hoisted interfaces

This can a good solution for components like `MenuButton` which can have access to the `MenuTriggerProps` interface without needing a hard dependency on `react-menu`as a package. However if breaking changes happen to this interface it could cause be problematic when bumping packages and realizing that the an outdated shared interface is no longer compatible with the `Menu` component.

### Context vs Cloning

Using context can be more flexible for consumers since there is not implicit requirement to receive props. But context generally forces rerenders when updating values. There is nothing really unpredictable with cloning if a defined interface exists for the required props.

## Discarded Solutions

No current discareded issues, as cloning the trigger element is the current way of doing things.
