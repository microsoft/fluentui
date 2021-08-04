RFC: Array slots

---

@smhigley

## Summary

This RFC proposes modifying the Slots API to accept arrays of slot props to support components like Combobox or List, where the most ergonomic authoring experience is passing in an array of data rather than unique JSX children.

## Problem Statement

So far, all slot usage in vNext components assumes the desired authoring experience is to define slots or children one at a time. That makes sense for the components we've created so far, since none of them render a set of elements that are usually generated from an array of data. Even for Menu, which contains a list of MenuItem children, it's not common for authors to want to convert an array of repetitive data into menu items.

In contrast, Combobox and Listbox patterns do commonly take an array of data and use it to render mostly uniform items. The same is likely going to be true of components like List (if we have one) and DetailsList/Grid. For those controls, good authoring ergonomics lean more towards this:

```js
<Combobox options={['apple', 'banana', 'cucumber', ...etc]} />
```

Than this:

```js
<Combobox>
  <Option>apple</Option>
  <Option>banana</Option>
  <Option>cluster fig</Option>
  [...etc]
</Combobox>
```

Accepting an array of slot data isntead of children will also make it easier to internally handle virtualization in the future.

## Detailed Proposal

Modify `getSlots` and `resolveShorthand` to allow authors to pass in an array of slot data for certain slots.

Taking Combobox as an example, the authoring experience would look like this:

```js
// using strings to define the slots:
<Combobox options={['apple', 'banana', 'chokecherry']} icon={<Chevron />} ..etc />

// using slot props
<Combobox options={optionData.map((option, i) => ({ 'data-index': i, children: option.name, title: 'tooltips are awful' }))} icon={<Chevron />} ..etc />
```

The Combobox component would then handle `options` like this:

within `renderCombobox`:

```js
const { slots, slotProps } = getSlots < ComboboxSlots > (state, ['options']);
return (
  <slots.root {...slotProps.root}>
    {slots.options.map((Option, i) => {
      return <Option key={`option-${i}`} {...slotProps.options[i]} />;
    })}
  </slots.root>
);
```

within `useCombobox`:

```js
const state: ComboboxState = {
  role: 'combobox',
  tabIndex: 0,
  ...etc,
  components: {
    root: 'div',
    options: 'div',
  },
  options: resolveShorthandArray(props.options, {
    role: 'option',
    ...etc,
  }),
};
```

Then `resolveShorthandArray` would be exported from `resolveShorthand.ts` as something like this:

```js
export function resolveShorthandArray<Props extends Record<string, any>>(
  value: ShorthandProps<Props>[],
  defaultProps?: Props,
): ObjectShorthandProps<Props>[] {
  if (value === null || !Array.isArray(value)) {
    return [] as ObjectShorthandProps<Props>[];
  }

  return value.map((singleValue) => resolveShorthand(singleValue, defaultProps));
}
```

`getSlots` would be modified to handle array slots by adding a check to see if the slot is an array:

```js
if (Array.isArray(slot) {
  slots[name] = slot.map((subSlot) => {
    // run through the same logic getSlots currently uses to standardize slot data
  })
}
```

One downside to this solution is it that in order for an author to define a set of props that appear on every option, they'll need to duplicate that prop object for each option in `props.options`. We could potentially consider adding another prop like `defaultOption: React.HTMLAttributes<HTMLElement>` to make that easier.

## Discarded Solutions

Another option I looked into was keeping the slot itself singular, and rendering it inside a loop:

In `renderCombobox`:

```js
const { slots, slotProps } = getSlots < ComboboxSlots > (state, ['option']);
// resolveOptionProps is a way to add option-specific props like aria-selected or id based on the index
const { optionData, resolveOptionProps } = state;

return (
  <slots.root {...slotProps.root}>
    {optionData.map((option, i) => {
      return <slots.option key={`option-${i}`} {...slotProps.option} {...resolveOptionProps(option, i)} />;
    })}
  </slots.root>
);
```

Then `useCombobox` handles `option` and `resolveOptionProps` something like this:

```js
const state: ComboboxState = {
  role: 'combobox',
  tabIndex: 0,
  ...etc,
  components: {
    root: 'div',
    options: 'div',
  },
  options: resolveShorthand(props.option, {
    role: 'option',
    ...etc,
  }),
};

const resolveOptionProps = React.useCallback(
  (option: string | Object, index: number) => {
    return resolveShorthand(props.option, {
      id: `${id}-${index}`,
      'aria-selected': index === activeIndex,
      //simplified code, but this allows a custom per-option render:
      children: props.renderOption ? props.renderOption(option) : option,
    });
  },
  [activeIndex],
);
state.resolveOptionProps = resolveOptionProps;
```

The authoring experience would look like this:

```js
<Combobox option={{ 'some-default-prop-on-all-options': 'test' }} data={['apple', 'banana', 'cauliflower']}>
```

The downside here is it leans back towards custom `renderX` props, and doesn't seem in the spirit of the slot pattern.
