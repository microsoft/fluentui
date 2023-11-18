# RFC: Triggers and multiple layers of button handling

---

_@bsunderhus_

## Summary

The trigger API is an elegant solution for the problem of how to provide properties to a button-like element.

Currently most triggers will ensure its direct children has the proper handler and properties of a button, by using `useARIAButtonProps` behind the scenes.

In the case of a `div` as triggers child, `useARIAButtonProps` will ensure that this `div` will have proper `button` ARIA attributes

```tsx
<Trigger>
  <div>Trigger something</div>
</Trigger>
```

```html
<div onclick="fn" onkeydown="fn" onkeyup="fn" role="button" tabindex="0">Trigger something</div>
```

`useARIAButtonProps` also ensure that on the case a `button` as trigger children, then no extra attributes are necessary.

```tsx
<Trigger>
  <button>Trigger something</button>
</Trigger>
```

```html
<button>Trigger something</button>
```

## Problem statement

On the case of a custom component on the other hand, it's impossible for `useARIAButtonProps` to find out if the returned element will be an actual button or not.

```tsx
<Trigger>
  <Button>Trigger something</Button>
</Trigger>
```

That way, even for `Button`, `useARIAButtonProps` will end up providing a bunch of unnecessary props.

```html
<button onclick="fn" onkeydown="fn" onkeyup="fn" role="button" tabindex="0">Trigger something</button>
```

## Detailed Design or Proposal

### Mark `Button` component

The Trigger API has a type called [FluentTriggerComponent](https://github.com/microsoft/fluentui/blob/92bc886e6e3e5ec43847752941456666eb69d32b/packages/react-components/react-utilities/src/trigger/types.ts#L15-L17), this type is used to mark every Trigger compliant component as a Trigger, take [MenuTrigger](https://github.com/microsoft/fluentui/blob/92bc886e6e3e5ec43847752941456666eb69d32b/packages/react-components/react-menu/src/components/MenuTrigger/MenuTrigger.tsx#L7-L18) as an example. This was required by the Trigger API to ensure traversing down multiple triggers:

```tsx
<Tooltip>
  <MenuTrigger>
    <button>trigger</button>
  </MenuTrigger>
</Tooltip>
```

By providing something like `ARIAButtonComponent`, we could mark `Button` component the same way trigger components are marked, but in this case to ensure `useARIAButtonProps` are not unnecessarily reused.

```tsx
/**
 * Buttons give people a way to trigger an action.
 */
export const Button: ForwardRefComponent<ButtonProps> & ARIAButtonComponent = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);

  useButtonStyles_unstable(state);

  return renderButton_unstable(state);
});

Button.displayName = 'Button';
Button.isARIAButtonComponent = true; // this will ensure that `useARIAButtonProps` doesn't repeat itself
```

Then inside `useARIAButtonProps`:

```tsx
// if its a marked component, than do nothing, just return original props
if (isARIAButtonComponent(element)) {
  return props;
}
```

#### Pros

1. Straight forward solution, `Button` will work with triggers out of the box

#### Cons

1. won't work with `CustomButton` wrapping `Button`

### Add isARIAButton property to Triggers

Another possible solution is to have a property that indicates to a trigger that its child component will ensure button behavior by itself,
passing the responsibility to use `useARIAButtonProps` to the child.

```tsx
<Trigger isARIAButton>
  <Button>Trigger something</Button>
</Trigger>
```

```html
<button>Trigger something</button>
```

#### Props

1. Straight forward solution
2. works with `CustomButton`

#### Cons

1. the notion of the problem will be passed down to user requiring it to add the prop by itself

### Do nothing

Technically everything will work just fine if we don't do nothing, the only thing that will happen is extra unnecessary properties and handlers being added to `button` element

#### Pros

1. Straight forward solution

#### Cons

1. extra properties and handlers being added for no reason

### Add disableButtonEnhancement property to Triggers

Similar to [`Add isARIAButton property to Triggers`](#add-isariabutton-property-to-triggers) but diametrically opposed.
This proposal introduces the idea of adding a property to explicit that a trigger will stop ensuring button behavior throughout `useARIAButtonProps` internally to whatever child is provided.

The Trigger API **should not** provide button enhancement behavior, instead it should expect the user to provide a button-like compatible child, but since removing the behavior would be a breaking change, it's simpler to hide it behind a property flag and advise users to use it for now.

```tsx
<Trigger>
  <Button>Trigger something</Button>
</Trigger>
<Trigger>
  <div>Trigger something</div>
</Trigger>
<Trigger>
  <button>Trigger something</button>
</Trigger>

<Trigger disableButtonEnhancement>
  <Button>Trigger something</Button>
</Trigger>
<Trigger disableButtonEnhancement>
  <div>Trigger something</div>
</Trigger>
<Trigger disableButtonEnhancement>
  <button>Trigger something</button>
</Trigger>
```

```html
<button onclick="fn" onkeydown="fn" onkeyup="fn" role="button" tabindex="0">Trigger something</button>
<div onclick="fn" onkeydown="fn" onkeyup="fn" role="button" tabindex="0">Trigger something</div>
<button>Trigger something</button>

<button>Trigger something</button>
<div>Trigger something</div>
<button>Trigger something</button>
```

#### Props

1. Straight forward solution
2. Works with `CustomButton`
3. Simplifies Trigger API

#### Cons

1. leaks the problem to the user requiring it to add the prop by itself
