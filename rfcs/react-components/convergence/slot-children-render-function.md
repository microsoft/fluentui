# RFC: Slot children render function

---

_@bsunderhus @ling1726 @layershifter_

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [TL;DR](#tldr)
- [Background](#background)
  - [External properties](#external-properties)
  - [Internal properties](#internal-properties)
  - [Overrides](#overrides)
    - [What happens behind the scenes?](#what-happens-behind-the-scenes)
- [Current issues](#current-issues)
- [Problem statement](#problem-statement)
  - [Problem 1](#problem-1)
  - [Problem 2](#problem-2)
  - [Sum up](#sum-up)
- [Detailed Design or Proposal](#detailed-design-or-proposal)
  - [Option A: Custom JSX Pragma](#option-a-custom-jsx-pragma)
    - [Required changes](#required-changes)
      - [`slot` over `resolveShorthand`](#slot-over-resolveshorthand)
      - [simplify render methods (get rid of `getSlots`)](#simplify-render-methods-get-rid-of-getslots)
      - [SlotComponent type & ComponentState change](#slotcomponent-type--componentstate-change)
        - [Introduction of the `SlotComponent` type.](#introduction-of-the-slotcomponent-type)
        - [ComponentState](#componentstate)
      - [Styles hooks `.props` access](#styles-hooks-props-access)
        - [Option 1 mutate external properties](#option-1-mutate-external-properties)
        - [Option 2 mutate overrides](#option-2-mutate-overrides)
        - [Option 3 stop mutating](#option-3-stop-mutating)
      - [Passing overrides from state to render when needed](#passing-overrides-from-state-to-render-when-needed)
    - [Custom Pragma implementation](#custom-pragma-implementation)
    - [Pros and Cons](#pros-and-cons)
      - [Pros](#pros)
      - [Cons](#cons)
  - [Option B: Refactor getSlots + helper method](#option-b-refactor-getslots--helper-method)
    - [Pros and Cons](#pros-and-cons-1)
      - [Pros](#pros-1)
      - [Cons](#cons-1)
  - [Option C: Custom JSX Pragma without internal changes](#option-c-custom-jsx-pragma-without-internal-changes)
    - [Pros and Cons](#pros-and-cons-2)
      - [Pros](#pros-2)
      - [Cons](#cons-2)
  - [Option D: Option A (partially) + Option C](#option-d-option-a-partially--option-c)
    - [Pros](#pros-3)
    - [Cons](#cons-3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TL;DR

Slot children render function is a complex API that is not properly supported. To support this the best alternative so far,
is to create a custom [JSX pragma](https://www.gatsbyjs.com/blog/2019-08-02-what-is-jsx-pragma/) to ensure slot declaration will not lose any property
and will be capable of properly rendering with children render function.

## Background

---

By our [documentation](https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--page#replacing-the-entire-slot):

> When you pass content or props to a slot, the component renders the content within a component or element based on the slot type.
> If you need to replace the slot's entire content, including the containing element, pass a render function as the children.
> This is an escape hatch in the slots API, so prefer the other techniques whenever possible.
> If you replace the entire slot, accessibility, layout, and styling still work properly.
> By passing `renderBigLetterIcon` as the `children`, the `span` that normally contains the icon is replaced with an `b` (bold).

```tsx
const renderBigLetterIcon (Component, props) => {
  return <b>B</b>;
};

<Button icon={{ children: renderBigLetterIcon }}>Bold</Button>;
```

---

There are 3 instances of properties that will be provided to a slot in different phases of the slot creation:

1. External properties (`props`)
2. Internal properties (`defaultProps`)
3. Overrides

### External properties

External properties (`props`) are the properties provided by the client using a component with a specific slot.
On the `AccordionHeader` example, the `button` slot external properties may be found as `props.button` inside the component's
implementation.

`props.button` is called a shorthand and can be either:

1. External properties of the slot (an object)
2. `string`, `number`, `Array` or `JSX element` value that will be provided to slot's `children`
3. `null` or `undefined`

```ts
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  props.button; // this is the button shorthand
});
```

### Internal properties

Internal properties (`defaultProps`) are the properties provided by the `use_COMPONENT_` hook, that should be overridden by
External properties, those are the basic properties that ensure proper functioning of a slot but allowing the user
to opt out of them.

They can be declared when resolving the provided shorthand of a slot (`props.button`, in this example):

```ts
// useAccordionHeader
const buttonShorthand = useARIAButtonShorthand(props.button, {
  required: true,
  // internal properties
  defaultProps: {
    'aria-expanded': open,
    type: 'button',
  },
});
```

### Overrides

Overrides are the properties provided by the `render` method, that should override all the other properties.
On most of the implementations of slots we have so far in v9 we tend to avoid using overrides, except for one case that is
spread all over the components, which is `children` override:

```tsx
// renderAccordionHeader

<slots.root {...slotProps.root}>
  <slots.button {...slotProps.button}>
    {state.expandIconPosition === 'start' && <slots.expandIcon {...slotProps.expandIcon} />}
    {slots.icon && <slots.icon {...slotProps.icon} />}
    {slotProps.root.children}
    {state.expandIconPosition === 'end' && <slots.expandIcon {...slotProps.expandIcon} />}
  </slots.button>
</slots.root>
```

In this example we provide to both `root` and `button` slots overrides of their children value, ignoring
any previous values that was passed either by Internal properties or External properties. Slots that tend to override
their children are normally referred to as `wrappers` since they're normally used for the case of
wrapping other slots inside of them.

#### What happens behind the scenes?

```js
function render() {
  return <slots.button {...slotProps.button}>{slotProps.root.children}</slots.button>;
}
```

Code above will be compiled to following:

```js
function render() {
  return React.createElement(slots.button, slotProps.button, slotProps.root.children);
}
```

If `children` specified (third argument of `React.createElement()` i.e. `slotProps.root.children`) they will win over `props` (second argument i.e. `slotProps.button`)

https://github.com/facebook/react/blob/c0b34bc5fb67fd689383b07ef9d8378814348cd5/packages/react/src/ReactElement.js#L404-L406

## Current issues

[Slot children render function won't override existing children. #27089](https://github.com/microsoft/fluentui/issues/27089)

Repro: https://codesandbox.io/s/elated-babbage-46ez1w?file=/example.tsx

It's not possible to use children render function to override an entire slot, if `children` are already used. The above is a minimal repro of an issue that can be seen in Fluent in the `AccordionHeader` component. The component renders the `button` slot which contains its own children. JSX children will win over props children - which is how children render functions are rendered by `getSlots`

https://github.com/microsoft/fluentui/blob/220b321042b4bcc126c86a91811a34b04934d49b/packages/react-components/react-accordion/src/components/AccordionHeader/renderAccordionHeader.tsx#L13-L25

Requirements for children render function:

- Should be able to override the entire slot.
- When rendering the original children, should respect nested slots.

## Problem statement

The main problem revolves around coalescing those 3 instances of properties a slot might have! At the moment,
our current slot declaration mechanism revolves around 2 separate methods used in 2 different moments:

1. `resolveShorthand`
2. `getSlots`

`resolveShorthand` is invoked at `useState` hook, it will receive a shorthand and will convert it to either `undefined` or an object comprising
the merging of the External properties and Internal ones, following given priorities (`props` wins over `defaultProps`).

`getSlots` is invoked at `render` method and will go over every single slot declared on `state.components` and convert every resolved shorthand into a pair of
element to be render and properties to be passed. In this `getSlots` method, we also ensure that if a given resolved shorthand `children`
property is a function, than we'll invoke that function:

```ts
// getSlots

if (typeof children === 'function') {
  const render = children;
  // in this case the pair of element to be render and properties to be passed are converted into
  // a Fragment and {children} where `children` will be the return of invoking the `children` render method
  return [
    React.Fragment,
    {
      children: render(slot, propsWithoutAsAndChildren),
    } as unknown as R[K],
  ];
}
```

### Problem 1

The `slot` argument will represent the merging between `state.component.button` value
(back into the `AccordionHeader` `button` slot example) and `props.button.as` value. `propsWithoutAsAndChildren`
as the name suggests is all the properties provided by the `resolveShorthand` invocation without including `as` and also `children`
(since `children` by itself is the render function).

Since we lost the Internal properties (`defaultProps`) on the merging with the External properties,
there's no way to provide `defaultProps.children` to the render function!

```js
function useComponent(props) {
  return {
    slot: resolveShorthand(props.slot, { children: 'foo' }),
  };
}

const state = useComponent({ children: () => {} });
typeof state.slot.children === 'function'; // true

// 💥 We lost `defaultProps.children` i.e. `children: "foo"`
```

### Problem 2

At `render` method after `getSlots` invocation we have all `slots` and `slotProps` well defined. For the case of wrappers
we'll also provide an override for `children`, taking precedence over External properties and also Internal properties.
This will cause us to lose any children provided by a `render` function passed as a children.

```js
function renderComponent(state) {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>Foo</slots.root>;
}

const template = renderComponent({ root: { children: 'Baz' } });

template.props.children === 'Baz'; // false
template.props.children === 'Foo'; // true

// 💥 "Foo" wins over input passed by a user
```

### Sum up

At the moment the merging of the 3 instances of properties is done in 3 different steps:

1. `resolveShorthand` will merge External properties with Internal properties (external takes precedence)
2. `getSlots` will **wrongly** filter properties on case of render function as `children`
3. on slot rendering of the `render` method the merged properties provided by
   `getSlots` will be merged with the Overrides (overrides takes precedence),
   once again overriding `children` on the case of `wrappers`

   ```tsx
      // the third step is the render of the slot itself
      <slots.button {...slotProps.button}>
   ```

Properties will be lost after those steps, mainly `children` will be lost, affecting the render function mechanism.

Merging the properties is a complex scenario that should not be splitted into multiple steps as all properties
must be considered when merging them, since we got peculiar scenarios involving `children` mostly

## Detailed Design or Proposal

### Option A: Custom JSX Pragma

This problem can be solved by not prematurely merging the 3 instances of properties provided to a slot. To do that
we should find a way to delay as long as possible that merging mechanism.

The last provided properties are the Overrides, which are provided on rendering time, when a jsx element is presented:

```tsx
// slotProps  and children are the overrides here
<slots.button {...slotProps.button}>Children Override</slots.button>
```

Since we only have access to the Overrides on the declaration of the jsx element itself, the only way to postpone
merging of the properties after we have the Overrides is by changing the intrinsic mechanism of how a jsx element is consumed.
This can be done by providing a custom [JSX pragma](https://www.gatsbyjs.com/blog/2019-08-02-what-is-jsx-pragma/).

Instead of having a `resolveShorthand` that returns a merge between External properties and Internal properties,
we can provide a custom exotic component, similar to what happens when `React.memo` or `React.forwardRef` does.

#### Required changes

We can split this proposal by the required changes that need to be done. They can be listed as:

1. [slot method over resolveShorthand](#slot-method-over-resolveshorthand)
2. [simplify render methods (get rid of `getSlots`)](#simplify-render-methods-get-rid-of-getslots)
3. [SlotComponent type & ComponentState change](#slotcomponent-type--componentstate-change)
4. [Styles hooks `.props` access](#styles-hooks-props-access)
5. [Passing overrides from state to render when needed](#passing-overrides-from-state-to-render-when-needed)

##### `slot` over `resolveShorthand`

The `slot` method will return a slot component, similar to a component declaration when using `React.memo` or `React.forwardRef`,
and in that slot component declaration, both External properties and Internal properties will coexist without merging,
together with the `componentType` that will work as `state.components.slot` would.

This will be very similar to the previous usage of `resolveShorthand`:

```tsx
const state = {
  root: slot(getNativeElementProps(as || 'div', { ref, ...props }), {
    required: true,
    componentType: 'div',
  }),
  icon: slot(icon, { componentType: 'div' }),
  expandIcon: slot(expandIcon, {
    required: true,
    componentType: 'span',
    defaultProps: {
      children: <ChevronRightRegular style={{ transform: `rotate(${expandIconRotation}deg)` }} />,
      'aria-hidden': true,
    },
  }),
  button: slot(button, {
    required: true,
    componentType: 'button',
    defaultProps: {
      disabled,
      disabledFocusable,
      'aria-expanded': open,
      type: 'button',
    },
  }),
};
```

##### simplify render methods (get rid of `getSlots`)

Since there'll be a custom pragma which will understand what is provided by `slot`, there's no need for `getSlots` anymore!
The components provided by the `slot` method will be renderable, meaning we can simply use them in the render!

Before:

```tsx
export const renderAccordionHeader_unstable = (state: AccordionHeaderState) => {
  const { slots, slotProps } = getSlots<AccordionHeaderSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      <slots.button {...slotProps.button}>
        {state.expandIconPosition === 'start' && slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
        {slots.icon && <slots.icon {...slotProps.icon} />}
        {slotProps.root.props.children}
        {state.expandIconPosition === 'end' && slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
      </slots.button>
    </slots.root>
  );
};
```

After:

```tsx
export const renderAccordionHeader_unstable = (state: AccordionHeaderState) => (
  <state.root>
    <state.button>
      {state.expandIconPosition === 'start' && state.expandIcon && <state.expandIcon />}
      {state.icon && <state.icon />}
      {state.root.props.children}
      {state.expandIconPosition === 'end' && state.expandIcon && <state.expandIcon />}
    </state.button>
  </state.root>
);
```

##### SlotComponent type & ComponentState change

Some type changes will be required:

###### Introduction of the `SlotComponent` type.

Slot components are exotic components (like `React.forwardRef` and `React.memo` components),
that will have intrinsically associated with them External properties, Internal properties and the base component type.

```ts
type SlotComponent<Props extends UnknownSlotProps = UnknownSlotProps> = React.ExoticComponent<
  Props & React.RefAttributes<Element>
> & {
  readonly props: Props;
  readonly defaultProps?: Partial<Props> | undefined;
  readonly componentType:
    | React.ComponentType<Props>
    | (Props extends AsIntrinsicElement<infer As> ? As : keyof JSX.IntrinsicElements);
};
```

###### ComponentState

`ComponentState` should map provided slots to `SlotComponent`s instead of mapping to resolved shorthands! And `components` property can be dropped.

Before:

```ts
type ComponentState<Slots extends SlotPropsRecord> = {
  components: {
    [Key in keyof Slots]-?:
      | React.ComponentType<ExtractSlotProps<Slots[Key]>>
      | (ExtractSlotProps<Slots[Key]> extends AsIntrinsicElement<infer As> ? As : keyof JSX.IntrinsicElements);
  };
} & {
  // Include a prop for each slot, with the shorthand resolved to a props object
  // The root slot can never be null, so also exclude null from it
  [Key in keyof Slots]: ReplaceNullWithUndefined<
    Exclude<Slots[Key], SlotShorthandValue | (Key extends 'root' ? null : never)>
  >;
};
```

After:

```ts
type ComponentState<Slots extends SlotPropsRecord> = {
  [Key in keyof Slots]: SlotComponent<ExtractSlotProps<Slots[Key]>>;
};
```

##### Styles hooks `.props` access

A minor modification in style hooks are required. at the moment we mutate the merged properties provided by `resolveShorthand`
to include our custom `className` property.

In this case we have some alternatives:

###### Option 1 mutate external properties

Instead of mutating the merged properties, simply mutate the External properties from the slot component:

```diff
// useAccordionHeader
export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState) => {
  const styles = useStyles();
- state.root.className = mergeClasses(
+ state.root.props.className = mergeClasses(
    accordionHeaderClassNames.root,
    styles.root,
    state.inline && styles.rootInline,
    state.disabled && styles.rootDisabled,
-   state.root.className,
+   state.root.props.className,
  );

  if (state.icon) {
-    state.icon.className = mergeClasses(
+    state.icon.props.className = mergeClasses(
      accordionHeaderClassNames.icon,
      styles.icon,
-      state.icon.className
+      state.icon.props.className
    );
  }

  return state;
};
```

###### Option 2 mutate overrides

By introducing an `overrides` property on the `ComponentState` we can create a layer of override that can be mutated:

```diff
// useAccordionHeader
export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState) => {
  const styles = useStyles();
- state.root.className = mergeClasses(
+ state.overrides.root.className = mergeClasses(
    accordionHeaderClassNames.root,
    styles.root,
    state.inline && styles.rootInline,
    state.disabled && styles.rootDisabled,
-   state.root.className,
+   state.root.props.className,
  );

    if (state.icon) {
-    state.icon.className = mergeClasses(
+    state.overrides.icon.className = mergeClasses(
      accordionHeaderClassNames.icon,
      styles.icon,
-      state.icon.className
+      state.icon.props.className
    );
  }

  return state;
};
```

On the render function side, we just need to spread the overrides:

```tsx
export const renderAccordionHeader_unstable = (state: AccordionHeaderState) => (
  <state.root {...state.overrides.root}>
    <state.button>
      {state.expandIconPosition === 'start' && state.expandIcon && <state.expandIcon />}
      {state.icon && <state.icon />}
      {state.root.props.children}
      {state.expandIconPosition === 'end' && state.expandIcon && <state.expandIcon />}
    </state.button>
  </state.root>
);
```

###### Option 3 stop mutating

Let's just stop mutating, and since we require a layer of custom styling through classNames
let's just properly use an argument on the render method exclusively for this:

Before:

```diff
// useAccordionHeader
-export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState) => {
+export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState): AccordionHeaderStyles => {
  const styles = useStyles();
- state.root.className = mergeClasses(
-   accordionHeaderClassNames.root,
-   styles.root,
-   state.inline && styles.rootInline,
-   state.disabled && styles.rootDisabled,
-   state.root.className,
- );

- if (state.icon) {
-    state.icon.className = mergeClasses(
-     accordionHeaderClassNames.icon,
-     styles.icon,
-      state.icon.className
-   );
- }
- return state;
+ return {
+   root: mergeClasses(
+     accordionHeaderClassNames.root,
+     styles.root,
+     state.inline && styles.rootInline,
+     state.disabled && styles.rootDisabled,
+     state.root.props.className,
+   );
+   icon: state.icon && mergeClasses(
+     accordionHeaderClassNames.icon,
+     styles.icon,
+     state.icon.props.className
+   )
+ }
};

// AccordionHeader
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useAccordionHeader_unstable(props, ref);
- useAccordionHeaderStyles_unstable(state);
+ const styles = useAccordionHeaderStyles_unstable(state);
  const contextValues = useAccordionHeaderContextValues_unstable(state);
- return renderAccordionHeader_unstable(state, contextValues);
+ return renderAccordionHeader_unstable(state, styles, contextValues);
});

// renderAccordionHeader
- export const renderAccordionHeader_unstable = (state: AccordionHeaderState) => (
+ export const renderAccordionHeader_unstable = (state: AccordionHeaderState, styles: AccordionHeaderStyles) => (
-  <state.root>
+  <state.root className={styles.root}>
    <state.button>
      {state.expandIconPosition === 'start' && state.expandIcon && <state.expandIcon />}
      {state.icon && <state.icon />}
      {state.root.props.children}
      {state.expandIconPosition === 'end' && state.expandIcon && <state.expandIcon />}
    </state.button>
  </state.root>
);
```

##### Passing overrides from state to render when needed

Since our logic lies on the state hooks, the override methods will be implemented on those state hooks, although it should be
declared on the render method explicitly to properly work as an override.

For example, on the case `AccordionHeader` the `button` slot would override the `onClick` method. For that a property called `overrides`
can be explicitly added to `AccordionHeaderState` stating such override:

```tsx
// AccordionHeader.types.ts
type AccordionHeaderState = NextComponentState<AccordionHeaderSlots> & {
  overrides: {
    button: {
      onClick(ev: React.MouseEvent<HTMLButtonElement>): void;
    };
  };
};

// useAccordionHeader.ts
const state = {
  // ...
  overrides: {
    button: {
      onClick: useEventCallback(ev => {
        buttonSlot.props.onClick?.(ev);
        if (!ev.defaultPrevented) {
          onAccordionHeaderClick(ev);
        }
      }),
    },
  },
};

// renderAccordionHeader.tsx
const renderAccordionHeader_unstable = (state: AccordionHeaderState) => (
  <state.root>
    <state.button onClick={state.overrides.button.onClick}>
      {state.expandIconPosition === 'start' && state.expandIcon && <state.expandIcon />}
      {state.icon && <state.icon />}
      {state.root.props.children}
      {state.expandIconPosition === 'end' && state.expandIcon && <state.expandIcon />}
    </state.button>
  </state.root>
);
```

#### Custom Pragma implementation

The custom pragma implementation will have the responsibility of acting similar to what `getSlots` used to do,
but without having the 3 instances of properties being merged,
which will allow for it to properly handle all the edge case scenarios that comes with our current API

This is a first draft of it, it is pretty similar to what is being done internally by `getSlot` method,
but returning an element instead of a tuple:

```ts
function jsxFromSlotComponent<Props extends UnknownSlotProps>(
  component: SlotComponent<Props>,
  overrides?: Props | null,
  ...childrenOverride: React.ReactNode[]
): React.ReactElement<Props> | null {
  const props = { ...component.defaultProps, ...component.props, ...overrides };
  const children = normalizeChildren(component.props, component.defaultProps, overrides, ...childrenOverride);
  const { as: asProp, ...propsWithoutAs } = props;

  const elementType =
    component.componentType === undefined || typeof component.componentType === 'string'
      ? asProp ?? component.componentType ?? 'div'
      : component.componentType;

  // on the case of an External property of children as render then this overrides even the override children.
  if (typeof component.props.children === 'function') {
    const render = component.props.children;
    return React.createElement(
      React.Fragment,
      {},
      // children will not be lost in this case!
      render(elementType, { ...propsWithoutAs, children }),
    ) as React.ReactElement<Props>;
  }

  const shouldOmitAsProp = typeof elementType === 'string' && asProp;

  return React.createElement<Props>(elementType, shouldOmitAsProp ? propsWithoutAs : props, children);
}
```

#### Pros and Cons

##### Pros

1. Simple to use
2. Reduces codebase size (`getSlots` invocations can be stripped)
3. No iteration over `state.components` is required to define slots (the slots used are the slots being processed)
4. Will simplify the whole underlying architecture
5. No Breaking changes, the consumers will not have any impact (besides allowing the children render function to work properly)
6. couples together `state.components` with the slot itself

##### Cons

1. Requires extra build steps
2. Requires a small migration (but it can be done granularly, nothing will break)

### Option B: Refactor getSlots + helper method

An alternative solution would be to stop children function rendering on `getSlots` method (since we don't have enough information at that moment)
and then wrapping all children overrides with a helper method (let's call it `resolveChildren`):

```tsx
// renderAccordionHeader
<slots.root {...slotProps.root}>
  {resolveChildren(
    slotProps.root,
    <slots.button {...slotProps.button}>
      {resolveChildren(
        slotProps.button,
        <>
          {state.expandIconPosition === 'start' && (
            <slots.expandIcon {...slotProps.expandIcon}>
              {resolveChildren(
                slotProps.expandIcon,
                <ChevronRightRegular style={{ transform: `rotate(${expandIconRotation}deg)` }} />,
              )}
            </slots.expandIcon>
          )}
          {slots.icon && <slots.icon {...slotProps.icon} />}
          {slotProps.root.children}
          {state.expandIconPosition === 'end' && (
            <slots.expandIcon {...slotProps.expandIcon}>
              {resolveChildren(
                slotProps.expandIcon,
                <ChevronRightRegular style={{ transform: `rotate(${expandIconRotation}deg)` }} />,
              )}
            </slots.expandIcon>
          )}
        </>,
      )}
    </slots.button>,
  )}
</slots.root>
```

#### Pros and Cons

##### Pros

1. It would solve the problem?!

##### Cons

1. Render methods will become more complex

### Option C: Custom JSX Pragma without internal changes

A minimal version of option A, but without introducing internal changes. If we focus on the problem itself,
slot children render function, the main requirement would be to maintain `defaultProps.children` until the last possible
moment so that it can be introduced once again back to a children render function.

This proposal would take advantage of `Symbol` to introduce a "private" method to the result of `resolveShorthand`,
to maintain the value of `defaultProps.children`. That value would then later on be consumed by a minimal custom JSX pragma
that on the specific case of children render function this pragma would consume this `defaultProps.children` to ensure proper functionality.

```diff
const defaultPropsChildrenSymbol = Symbol('fuiSlotDefaultPropsChildren')

export const resolveShorthand: ResolveShorthandFunction = (value, options) => {
  //...

  return defaultProps ? {
    ...defaultProps,
    ...resolvedShorthand,
+   [defaultPropsChildrenSymbol]: defaultProps?.children
  } : resolvedShorthand;
};
```

https://codesandbox.io/s/wispy-leftpad-f8yi37?file=/example.tsx.

#### Pros and Cons

##### Pros

1. No internal changes required
2. No migration is required

##### Cons

1. Requires extra build step

### Option D: Option A (partially) + Option C

Taking the strategy provided on Option C to hide required data with `Symbol` inside the result value of `resolveShorthand`
and applying it to not only move forward the `defaultProps.children` (from Option C) but also `componentType` (from Option A)
we can completely get rid of `getSlots` invocation, as all the data required to render a slot will be provided by `resolveShorthand` and only consumed at render by a custom pragma.

```diff
const defaultPropsChildrenSymbol = Symbol('fuiSlotDefaultPropsChildren')
const componentTypeSymbol = Symbol('fuiSlotComponentType')

export const resolveShorthand: ResolveShorthandFunction = (value, options) => {
  //...

  return defaultProps ? {
    ...defaultProps,
    ...resolvedShorthand,
+   [defaultPropsChildrenSymbol]: defaultProps?.children
+   [componentTypeSymbol]: options.componentType
  } : resolvedShorthand;
};
```

##### Pros

1. Simple to use
2. Reduces codebase size (`getSlots` invocations can be stripped)
3. `state.components` can be stripped
4. No iteration over `state.components` is required to define slots (the slots used are the slots being processed)
5. Will simplify the whole underlying architecture
6. No Breaking changes, the consumers will not have any impact (besides allowing the children render function to work properly)
7. couples together `state.components` with the slot itself

##### Cons

1. Requires extra build steps
2. Requires to remove `getSlots` usage (but it can be done granularly, nothing will break)
