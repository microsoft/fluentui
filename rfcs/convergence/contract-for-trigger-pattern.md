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

All Trigger patterns should introduce an interface for the props that will be passed on to the child. Tooltip already has this interface:

```tsx
export type TooltipTriggerProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby' | 'aria-label'
>;
```

For internal components, for example:

- MenuButton
- SplitButton

We expect these components to need to support the `MenuTrigger` contract. However, `react-button` importing `react-menu` might not be a good idea since we should not force consumers to pull in a dependency for `react-menu` just to use default `Button` component.

## Detailed Design or Proposal

### Support render functions for `Trigger` components

This API is already supported by `Tooltip`, this section of the RFC proposes to formalize this API across v9 components.

All `Trigger` like components that rely on cloning a component should also allow children as a render
function. This kind of API is well known in the React ecosystem, in many cases it has been replaced by using
React context and hooks, but provides an easy API for simple components variants.

```tsx
import { MenuButton } from '@fluentui/react-menu-button';
import { Menu } from '@fluentui/react-menu';

<Tooltip content="Trigger button using a render function">
  {triggerProps => (
    <div>
      <button {...triggerProps}>Custom trigger</button>
    </div>
  )}
</Tooltip>

<Menu>
  <MenuTrigger>
    {triggerProps => (
      <div>
        <button {...triggerProps}>Custom trigger</button>
      </div>
    )}
  </MenuTrigger>
  ...
</Menu>;
```

### Extract compound components to separate packages

We can evaluate on a case by case basis whether to move these kinds of components to another package

```tsx
import { MenuButton } from '@fluentui/react-menu-button';
import { Menu } from '@fluentui/react-menu';

<Menu>
  <MenuTrigger>
    <MenuButton />
  </MenuTrigger>
  ...
</Menu>;
```

Here is a sample implementation that can be used for a `MenuButton` component that expects a specific set of
`props` from the trigger component.

```tsx
import { MenuTriggerChildProps } from '@fluentui/react-menu';

interface MenuButtonProps extends React.ReactHTMLAttributes<HTMLButtonElement>, MenuTriggerChildProps {}

function MenuButton(props: MenuButtonProps) {}
```

For components that will potentially contain different slots as HTML elements, the above solution is no longer feasible.

```tsx
import { MenuTriggerChildProps } from '@fluentui/react-menu';

interface SplitButtonProps extends React.ReactHTMLAttributes<HTMLButtonElement> {
  // ⚠️ Expected to clone this element and apply trigger props to a specific slot
  menuButton: React.HTMLAttributes<HTMLButtonElement> & MenuTriggerChildProps;
}

// ⚠️ the trigger props are actually a part of the main props
function SplitButton(props: SplitButtonProps) {
  return (
    <div>
      {/* ⚠️ No way to distinguish both values */}
      <button onKeyDown={props.onKeyDown}> Action </button>
      <button onKeyDown={props.onKeyDown}> Trigger </button>
    </div>
  );
}
```

## Pros and Cons

This can a good solution for components like `MenuButton` which can have access to the `MenuTriggerProps` interface without needing a hard dependency on `react-menu`as a package. However if breaking changes happen to this interface it could be problematic when bumping packages and realizing that the an outdated shared interface is no longer compatible with the `Menu` component.

## Discarded Solutions

To solve the same problem highlighted in the above section, we could leverage `@fluentui/react-shared-contexts` and either:

- Switch from cloning to context
- Or allow both cloning and context

```tsx
import { useTooltipTriggerContext } from '@fluentui/react-shared-contexts';

export function CustomTooltipTriggerChild(props: TooltipTriggerProps) {
  // Provides all the spreadable DOM handlers and attributes required
  const context = useTooltipTriggerContext();
}

// Does not clone and assumes the child uses context
<Tooltip>
  // triggers a rerender when context changes
  <CustomTooltipTriggerChild />
</Tooltip>;
```

Using context can be more flexible for consumers since there is not implicit requirement to receive props. But context generally forces rerenders when updating values. There is nothing really unpredictable with cloning if a defined interface exists for the required props and during cloning props and refs and always preserved.
