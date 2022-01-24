# RFC: standardize event handlers arguments

---

@dzearing @layershifter

## Background

We should provide guidance on how events handlers (`onChange`, `onOpen`, etc.) are exposed across components. Today we have a discrepancy between `@fluentui/react-northstar` (Fluent UI Northstar) and `@fluentui/react` (Fluent UI v8) components:

```tsx
// v8
// "newValue" is the new value of the component's main data, depending on the component type
onChange: (ev: React.FormEvent, newValue:  ___);
```

```tsx
// Northstar
// "data" is props, with the new value mixed in on top
// const data = { ...props, value: newValue }
onChange: (ev: React.FormEvent, data: TProps);
```

For converged components (Fluent UI vNext) it's implemented in different ways 😪

## Use cases for event handlers

1. The primary data has changed, and I need the new value to support controlled component cases or to forward the data to a state management system.

2. When the data changes I not only need the new value, but I need the original props of the component, so that I can differentiate which instance fired the change event to a general handler.

There are a few types of components which might fire an `onChange` event:

- Single literal value components (`value = "foo"`): `Input` and `Toggle`
- Single-object value components (`value = { name: 'foo-item' }`): `RadioGroup`, `Select`
- Multi-object selection components (`value = ["foo", "bar"]`): multiselect `Dropdown`, `DetailsList`, `Tree`

## Problem statement

We need to standardize event handlers across components and ensure that API is consistent to avoid confusion for customers. To clarify, we should avoid this case:

```tsx
// ❌ Each component in this example has completely different signature for event handlers
<>
  <Checkbox onChange={(ev: React.FormEvent, newChecked: boolean) => {}} />
  <Input onChange={(ev: React.FormEvent, data: { value: string }) => {}} />
</>
```

## Prior considerations

Semantic UI React's thread for `onChange` which provided some background on thinking for Option B below:
https://github.com/Semantic-Org/Semantic-UI-React/issues/623#issuecomment-261018287

Material UI follows a similar approach to v8 code: the second argument represents the new value being changed. See [Select API](https://material-ui.com/api/select/) as an example of this. However the components aren't consistent - See [Input API](https://material-ui.com/api/input/) or [Switch API](https://material-ui.com/api/switch/) where neither have a second argument.

## Detailed Design or Proposal

### Option A1:

_The same as "Option A", but without access to `props`, see sample interfaces below._

- First param: an event (React.SyntheticEvent or DOM) or `null` (when an event object is missing)
- Second param: a `data` object where we provide minimum properties

```tsx
interface InputOnChangeData {
  value: string;
  // other metadata can be included on demand
}

interface CheckboxOnChangeData {
  // 👇 The name "value" doesn't always make sense and could possibly be confusing in some cases. E.g. for "Checkbox",
  //    the "onChange" event happens when the "checked" prop changes, not the "value" prop
  checked: string;
}

function App() {
  return (
    <>
      <Input
        onChange={(ev: React.ChangeEvent, data: InputOnChangeData) => {
          const { value } = data;

          // I can access the new value
          console.log(`The new value is ${value}`);
        }}
      />
      <Checkbox onChange={(ev: React.ChangeEvent, data: CheckboxOnChangeData) => console.log(data.checked)} />
    </>
  );
}
```

#### Pros

- 👍 `value` (_or other meaningful property, for example `checked`_) is always predictable in the `value` prop
- 👍 Future proof; `data` object is extendable without ever accidentally overriding a potentially needed prop `[value]`
- 👍 Type safety is simple

#### Cons

- 👎 `props` are not accessible, but we can reconsider this decision later

### Addendum: all inputs should expose a customized `onChange` handler

For consistency, all inputs (form controls) should expose a customized `onChange` handler with the `(ev, data) => void` signature described above.

We can add a conformance test to verify that an `onChange` prop exists for all input components. (We already have another test confirming it has the correct signature.) The main challenge for the new test will be whether there's a way to programmatically determine what counts as an input component. If that's not reasonable, we'll have to add a prop to enable the test and ensure it's used in all relevant components.

#### Pros

- Consistency across all input components: `value` (_or other meaningful property, for example `checked`_) is always predictable in the `value` prop, rather than having to know where to look in the event object
- Type safety is simple: sometimes `event.target` doesn't have a specific enough element type, or the value on the target element has an overly-broad type that doesn't reflect the usage
- Similar to the approach in v8 and v0
- Provides a clear path for exposing additional values later (for example, the original props object as discussed in the previous proposal)

#### Cons

- Adds a small amount of additional complexity that is not technically 100% necessary for simple components (`Input`, `Checkbox`, `Slider`) where the value could be accessed on the underlying `<input>` as `event.target.value`

## Discarded solutions

### Option A:

- Standardize on a `data` object where we provide the following minimum props:

| Prop                               | Description                                      |
| ---------------------------------- | ------------------------------------------------ |
| `active`, `checked`, `value`, etc. | new value or state for the data of the component |
| `props`                            | the original props given to the parent component |

Example:

```tsx
interface InputOnChangeData {
  value: string;
  props: InputProps;
}

interface CheckboxOnChangeData {
  // 👇 The name "value" doesn't always make sense and could possibly be confusing in some cases. E.g. for "Checkbox",
  //    the "onChange" event happens when the "checked" prop changes, not the "value" prop
  checked: string;
  props: CheckboxProps;
}

function App() {
  return (
    <>
      <Input
        onChange={(ev: React.ChangeEvent, data: InputOnChangeData) => {
          const { props, value } = data;

          // I can access the new value
          console.log(`The new value is ${value}`);

          // I can still access the props of the parent component
          console.log(`The input (#${props.id}) user's passed in props are ${JSON.stringify(props)}`);

          // I can even access additional metadata specific to the change if needed
          const { id } = props;

          // 😈 I can even access `props.value`
          const valueFromProps = props.value;
        }}
      />
      <Checkbox onChange={(ev: React.ChangeEvent, data: CheckboxOnChangeData) => console.log(data.checked)} />
    </>
  );
}
```

#### Pros

- 👍 `value` (_or other meaningful property, for example `checked`_) is always predictable in the `value` prop
- 👍 Parent component's current `props` are accessible and don't overlap other things in the `data` object
- 👍 Future proof; data object is extendable without ever accidentally overriding a potentially needed prop `[value]`
- 👍 Type safety is simple

#### Cons

- 👎 `data.props[value]` and `data.props[defaultValue]` are accessible, leaving multiple ways to see value which might be confusing as they'll represent the current _props_ rather than the new value. But it _should be_ obvious that these are user inputs and not the new value. Could consider calling new value `newValue` to be clear, but that seems a bit unpredictable.
- 👎 structure is deeply nested, for example `data.props.id`

### Option B: stick with Northstar approach - `data` is `{ ...props, value }`

Example:

```tsx
const onChange = (ev: React.FormEvent, data: InputProps) => {
  const { value } = data;

  // I can access the new value.
  console.log(`The new value is ${value}`);

  // I can still access the props of the parent component.
  console.log(`The input (#${id}) user's passed in props are ${JSON.stringify(data)}`);

  // I can access additional metadata specific to the change if needed, but it may overwrite
  // original props values because of the lack of namepacing.
  const { id } = props;
};
```

#### Pros

- 👍 Can access parent props mostly (unless it was overridden by some selection data)
- 👍 One copy of `value` (`defaultValue` could still be there)

#### Cons

- 👎 Mixing additional metadata about the change (such as index or virtualized selection information) runs the risk of overlapping on the parent's props (e.g. `index` prop of the parent vs `index` of the new selected item)
- 👎 Slightly less efficient (copy all props over vs just set the `props` value)

### Option C: stick with v7/v8 approach - second argument is the new value

Example:

```tsx
const onChange = (ev: React.FormEvent, value: string) => {
  // I can access the new value.
  console.log(`The new value is ${value}`);

  // I can not access the props of the originating component; `ev.target` may handle some of this:
  console.log(`The input (#${ev.target.id}) change its value to ${value}.`);

  // I can not access additional metadata without baking it into `value`, which may require a breaking change
  const { index } = value;
};
```

`TextField` uses `string` for the `newValue` type.
`Toggle` uses `boolean` for the `newValue` type.
`ChoiceGroup` uses `IChoiceGroupOption` as `newValue` type.

#### Pros

- 👍 Main use case of getting new value is straightforward
- 👍 No breaking changes with v7, less churn for customers

#### Cons

- 👎 Can't access `props` of parent component from callback, so to do things like sharing one callback implementation which maintains a form hash table requires accessing `ev.target.id` to know which component changed.
- 👎 Adding additional information to the data like `index` or `key` is a breaking change. Infinitely expanding callback signatures (new optional params to avoid breaks) as new things are needed. For example, `/ComboBox/ComboBox.types.ts` in v8:

```ts
onChange?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;
```

https://github.com/microsoft/fluentui/blob/16bf8194dc8df16b2e97f3021daf091f811bd0c3/packages/react/src/components/ComboBox/ComboBox.types.ts#L77
