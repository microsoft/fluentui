# RFC: Remove `___Commons` types

---

Contributors: @ecraig12345

## Summary

To make our components' public API contracts clearer to users and improve internal consistency:

- remove `FooCommons` types
- put all props in `FooProps`
- use `Pick` to define `FooState`/`FooContext`

## Background

Currently, we have a pattern of a `FooCommons` interface in a lot of components for things that are shared between props and state (and sometimes context). For example:

```ts
export type InputCommons = {
  // These are optional in props (made required in state)
  size?: 'small' | 'medium' | 'large';
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
};

export type InputProps = InputCommons &
  ComponentProps<InputSlots> & {
    // maybe some other props here
  };

export type InputState =
  // useInput provides defaults for things in InputCommons when creating the state object
  Required<InputCommons> &
    ComponentState<InputSlots> & {
      // maybe some other state here
    };

// Sometimes there's also a Context type which uses Commons
```

Other components use a similar pattern, except with things marked as required in `FooCommons` and using `Partial<FooCommons>` to define `FooProps`. For example:

```ts
export type CheckboxCommons = {
  // These are required in state (made optional in props)
  size: 'medium' | 'large';
};

export type CheckboxProps =
  // Things in CheckboxCommons are optional in props
  Partial<CheckboxCommons> &
    ComponentProps<CheckboxSlots> & {
      // maybe some other props here
    };

export type CheckboxState =
  // Commons are required in state
  CheckboxCommons &
    ComponentState<CheckboxSlots> & {
      // maybe some other state here
    };
```

## Problem statement

Our current use of `FooCommons` interfaces as part of component props could cause unnecessary confusion for a user looking at our types:

- Not straightforward to understand what's optional or required when
- Additional level of indirection to understand what's included in props
- It's an implementation detail that the user shouldn't need to care about when looking at props typings

We're also inconsistent about how required/optional things are handled in commons and props--whether things are:

- optional in commons type (to reflect props) then do `type FooState = Required<FooCommons> & ...`.
- required in commons type (to reflect state) then do `type FooProps = Partial<FooCommons> & ...`

## Detailed Design or Proposal

Rather than making a consistent rule for whether commons should more closely reflect props or state, I think a better solution is to remove the `FooCommons` types entirely. Instead, put everything in `FooProps`, and use `Pick`/`Required` to define `FooState` (and `FooContext` if needed).

This makes the user-facing type (props) very clear/explicit and confines the implementation details to the internal types (state, context).

Modified Input example from above:

```ts
export type InputProps = ComponentProps<InputSlots> & {
  size?: 'small' | 'medium' | 'large';
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  // maybe some other props here
};

export type InputState =
  // If there are things from props which remain optional in state, add another Pick without Required
  Required<Pick<InputProps, 'size' | 'appearance'>> &
    ComponentState<InputSlots> & {
      // maybe some other state here
    };
```

Modified Checkbox example (now using an identical pattern):

```ts
export type CheckboxProps = ComponentProps<CheckboxSlots> & {
  size?: 'medium' | 'large';
  // maybe some other props here
};

export type CheckboxState = Required<Pick<CheckboxProps, 'size'>> &
  ComponentState<CheckboxSlots> & {
    // maybe some other state here
  };
```

### Pros

- User-facing types (props) will be very clear/explicit
- Fewer types for a user to step through when trying to understand available props
- Implementation details that most users don't need to care about are confined to internal types (state, context)

### Cons

- More work to do

## Discarded Solutions

- Make a consistent rule for whether commons should more closely reflect props or state (should probably be props for user-facing clarity)
  - Pros: cheaper than proposed solution; improved internal consistency
  - Cons: there's still an extra layer of types for the user to step through when trying to understand props
- Do nothing
  - Pros: cheaper
  - Cons: remains confusing to users and internally inconsistent

## Open Issues

n/a
