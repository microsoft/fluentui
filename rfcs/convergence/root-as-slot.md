# RFC: root as a slot

---

_@bsunderhus @layershifter @ling1726_

## Summary

This RFC proposes to treat `root` as a _slot_ to simplify signature, improve `Typings` and avoid conflicts between `root` and other _slots_ signatures.

Main changes would be:

1. `root` becomes a regular slot on component state
2. Support references on every _slot_
3. Supports any React Element on every _slot_
4. Allows a restricted `as` prop on every slot
5. Stops using `getNativeElementProps` on every slot, will be used only for `root`

## Problem statement

There are disparities in how `root` is treated compared to _slots_. Some discussions have popped up due to these divergences between _slots_ and `root`:

1. [Do not support as prop for slots that render native DOM elements] conflicts with [1st rule of ARIA opt-out mechanism]
2. Support for any React Elements on _slots_ but not for _root_
3. Right now `Typings` for `root` aren't available as there's no way to split `root` from internal state.
4. There's no possible way of passing refs to slots but `root` does
5. [Primary slot]

Major differences between `root` (shown below as 🌿) and _slots_ (shown below as 🎰):

1. References 🌿
2. any React Elements as base element 🎰
3. `as` prop 🌿
4. Well defined Types 🎰

## Detailed Design or Proposal

For the user of the component perspective there will be no changes in the signature.

### Converge `root` to a _slot_

This RFC proposes to treat `root` as a _slot_.

Treating `root` as a slot means having to declare `root` _Typings_ together with other _slots_. This will impact in a components state signature, where `root` will have to be declared.

> ⚠️ That doesn't mean `root` will be available in component's properties interface

#### Before

```ts
export type Slots = {
  slot: ObjectShorthandProps<SlotProps>;
};
export interface Props extends ComponentProps<Slots> & React.HTMLAttributes<HTMLElement> {/* ... */}
export interface State extends ComponentState<Slots> {/* ... */}

// use*State hook
function useState({ slot, ...props }: Props): State {
  // ...
  return {
    ...props,
    slot: resolveShorthand(slot),
  };
}
```

With the modifications:

```ts
export type Slots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  slot: ObjectShorthandProps<SlotProps>;
};
export interface Props extends ComponentProps<Slots> {
  /* ... */
}
export interface State extends ComponentState<Slots> {
  /* ... */
}

// use*State hook
function useState({slot, ...props}: Props): State {
  // ...
  return {
    slot: resolveShorthand(slot)
    root: getNativeElementProps(state.components.root, props),
  };
}
```

### Make _slots_ support `as` property (but with restrictions)

Cancels [Do not support as prop for slots that render native DOM elements] as it already conflicts with [1st rule of ARIA opt-out mechanism]. This would add `as` property for `ObjectShorthandProps` signature for all _slots_.

To ensure `as` property is used for opt-out mechanism only native elements will be supported. _Typings_ must be used to ensure which native elements are supported.

`ObjectShorthandProps` should be a model that _shorthand_ properties should extend from, and to ensure `as` property is only provided in cases that opt-out mechanism is required the `never` type should be used to disable `as` property on default cases.

```ts
type ObjectShorthandProps<Props = {}, Ref = unknown, As extends keyof JSX.IntrinsicElements = never> = Props &
  React.RefAttributes<Ref> & {
    as?: As;
    children?: Props['children'] | ShorthandRenderFunction<Props>;
  };
```

The case for `useARIAButton` is a good example of using this signature:

```ts
export type ARIAButtonShorthandProps =
  | ObjectShorthandProps<JSX.IntrinsicElements['button'], HTMLButtonElement, /*as*/ 'button'>
  | ObjectShorthandProps<JSX.IntrinsicElements['div'], HTMLDivElement, /*as*/ 'div'>
  | ObjectShorthandProps<JSX.IntrinsicElements['span'], HTMLSpanElement, /*as*/ 'span'>
  | ObjectShorthandProps<JSX.IntrinsicElements['a'], HTMLAnchorElement, /*as*/ 'a'>;
```

`ARIAButtonProps` is a union between types from `button`, `div`, `span` and `anchor` native elements.

> ⚠️ using union types for declaring properties is not perfect https://catchts.com/unions

### No reason for `getNativeElementProps`

The problem reported on [Widening Types](#⚠️-Widening-types-problem-⚠️), makes this a little bit controversial.

Although types should be enough to ensure that only supported properties will be passed to a _slot_, this is less true for `root` at least due to the [Widening Types problem](#⚠️-Widening-types-problem-⚠️). Aside from `root`, it's safe to say that `getNativeElementProps` is not necessary.

### Add references to all _slots_

Right now `ref` is not supported on _Typings_ for _slots_. This proposes that `ref` should be part of the internal interface of `ObjectShorthandProps` to allow access of references to internal slots of a given component.

```ts
type ObjectShorthandProps<Props = {}, Ref = unknown, As extends keyof JSX.IntrinsicElements = never> = Props &
  React.RefAttributes<Ref> & {
    as?: As;
    children?: Props['children'] | ShorthandRenderFunction<Props>;
  };
```

## Implementation Details

Changes are located mostly on `react-utilities/compose` methods and _Typings_.

`ObjectShorthandProps` will have to support `as` and `ref` properties with Generics:

```ts
type ObjectShorthandProps<Props = {}, Ref = unknown, As extends keyof JSX.IntrinsicElements = never> = Props &
  React.RefAttributes<Ref> & {
    as?: As;
    children?: Props['children'] | ShorthandRenderFunction<Props>;
  };
```

All other _Typings_ would be adapted for the changes provided by `ObjectShorthandProps`.

`getSlots` method would stop having special cases for `root` and only a simple loop around all provided `slots` would be enough.

```ts
export function getSlots<R extends ObjectShorthandPropsRecord>(
  state: ComponentState<R>,
  slotNames: (keyof R)[] = [],
): {
  slots: Slots<R>;
  slotProps: SlotProps<R>;
} {
  const slots = {} as Slots<R>;
  const slotProps = {} as SlotProps<R>;

  for (const slotName of slotNames) {
    const [slot, props] = getSlot(state, slotName);
    slots[slotName] = slot;
    slotProps[slotName] = props;
  }
  return { slots, slotProps: slotProps };
}
```

## Pros and Cons

### Pros

1. Treating `root` as a simple slot simplifies _Typings_
2. Simplification of _Typings_ also comes with better inference performance
3. References available on every _slot_
4. Not using `getNativeElementProps` for all slots means possible performance improvement

### Cons

1. [Widening Types problem](#⚠️-Widening-types-problem-⚠️)
2. Explicit _slots_ declaration makes easier for developers to make mistakes

#### Possible mistakes

- Since `root` becomes a regular slot, it might be possible developers forget to include it in the list of shorthands
- Since typings become a responsibility of the developer, typing errors might be prone, e.g: bad usage of `Partial` or `Required` (this can be mitigated by forcing optional on props and required on state)

> Both of these could be mitigated easily enough by good documentation and possibly also lint rules or danger checks.

#### ⚠️ [Widening types](https://www.typescriptlang.org/play#example/type-widening-and-narrowing) problem ⚠️

Since _Typings_ for `root` is a subset of the interface that declares the properties of a given component, widening mechanism from assigning types will ensure that `root` _Typings_ are compatible with props which is not necessarily true! This implicates in some conflicts on properties spreading through state and `root` slot.

The problem can be verified in the next example:

```tsx
type ComponentProps<S extends ObjectShorthandPropsRecord> = Omit<
  { [Key in keyof S]?: ShorthandProps<S[Key]> },
  'root'
> &
  S['root']; // this will make Slots['root'] part of Props

type Slots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

interface Props extends ComponentProps<Slots> {
  /**
   * Property that can be passed through props
   * but doesn't belong on the element itself,
   * it's only used internally by state
   */
  stateSpecificProperty?: unknown;
}
interface State extends ComponentState<Slots> {
  stateSpecificProperty: unknown;
}

// ...
// use*State hook
return {
  // This should error 🚨 because of stateSpecificProperty,
  // but it doesn't due to type widening
  root: resolveShorthand(props),
};
```

A easy solution would be to use `getNativeElementProps` to filter out properties in this specific case:

```tsx
// use*State hook
return {
  // This filters out stateSpecificProperty ✅
  root: getNativeElementProps(state.components.root, props),
};
```

[1st rule of aria opt-out mechanism]: https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/first-rule-of-aria.md#detailed-proposal
[do not support as prop for slots that render native dom elements]: https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/simplify-prop-merging.md#do-not-support-as-prop-for-slots-that-render-native-dom-elements
[primary slot]: https://github.com/microsoft/fluentui/blob/91e25b8615a4a0ddb52b18ba5a51ffe21711bb7c/rfcs/convergence/native-element-props.md
