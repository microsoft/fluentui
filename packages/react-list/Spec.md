# @fluentui/react-list Spec

## Background

A list is a collection of related sequential items. The items are agnostic of layout and any content may be used.
Items may be either single selectable or multi selectable. List items are surfaces that should be able to contain
any kind of content.

## Prior Art

_Include background research done for this component_

- Open UI research: [openui/openui#512](https://github.com/openui/open-ui/pull/512)
- [Component epic issue]()

### Comparison of V0 and v8

v0 - [List](https://fluentsite.z22.web.core.windows.net/0.61.0/components/list/definition)
v8 - [List](https://developer.microsoft.com/en-us/fluentui#/controls/web/list), [DetailsList](https://developer.microsoft.com/en-us/fluentui#/controls/web/detailslist) [](https://developer.microsoft.com/en-us/fluentui#/controls/web/groupedlist)

Both v0 and v8 have components that are explicitly named `List`. However v8 also has `DetailsList` and `GroupedList` which also
overlap with other UI controls such as trees or tables.

Both libraries share the following features for List:

- Presentational/non-interactive component that serves as layout for a collection of items
- Selection state for list items
- Keyboard navigation for list items.

V0 emphasizes layout more, and by default supports a layout with media, main content, and secondary content slots.
However both libraries allow completely custom content within list items.

Both libraries use shorthand collections through an `items` prop to represent the list items that are rendered
in the components.

### Selection

v0 and v8 both support selection states for list items. V0 supports standard React control patterns for selecting
list items, where as v8 uses a non-standard `Selection` class that is passed as reference through props to get the
current selection state of the list.

```tsx
// v0
<List
  selectable
  selectedIndex={selectedIndex}
  onSelectedIndexChange={(e, newProps) => {
    setState({
      selectedIndex: newProps.selectedIndex,
    });
  }}
  items={this.items}
/>;

// v8
_selection = new Selection({
  onSelectionChanged: () => {
    this.setState({
      selectionDetails: this._getSelectionDetails(),
    });
  },
});

<DetailsList items={items} selectionMode={SelectionMode.multiple} setKey="multiple" selection={_selection} />;
```

The v8 pattern is completely unorthodox with the React design patterns since it relies on either class members
for React class components, or initialization in a `useState` or `useRef` call in a functional component.

##### Marquee selection

#### Appearance

Both components have similar philosophies for displaying a vertical oriented list of items. V0 has a stronger layout
implication that v8, but is still fully customizable if needed.

Grid layout is a feature that v8 has that is not supported by the v0 `List` at all.

Compact layout is also possible with `DetailsList`, which reduces the extra spacing between list items and removes
padding with the the boundary of the list.

v8 selection scenarios for `List` components will use a checkbox for each item, whereas v0 will use background color
changes to indicate selection.

#### Virtualization

V8 list components all support virtualization internally by default. This means that no extra work needs to be
done by consumers to have virtualized lists, but the virtualization code will be present even if the use case
does not need it. However, the virtualization functionality is only implemented once in the `List` component. All
v8 list variants will reuse the `List` component to virtualize their elements.

v0 Does not offer virtualization built into any component. The library manages a collection of prototypes on the
docsite that show users how to virtualize v0 components:

- [Virtualized tree](https://fluentsite.z22.web.core.windows.net/0.61.0/virtualized-tree)
- [Virtualized sticky tree](https://fluentsite.z22.web.core.windows.net/0.61.0/virtualized-sticky-tree)
- [Virtualized table](https://fluentsite.z22.web.core.windows.net/0.61.0/virtualized-table)

The `List` component in v0 does not have such a prototype since there has been no real ask in Teams to support such
a scenario.

#### Keyboard navigation

Both libraries allows keyboard navigation for their list components.

v8 list components enable keyboard navigation without any changes to the underlying DOM elements.

v0 `List` component enables keyboard navigation but changes the semantics of the component to be a menu with menuitems
instead.

#### Imperative methods

v8 exposes an `IList` interface of imperative methods through a component ref.

```tsx
const Sample = () => {
  const ref = React.useRef({});
  // ref.forceUpdate()
  // ref.getStartItemIndexInView()
  // ref.scrollToIndex()
  // ref.getTotalListHeight()

  return <BasicList componentRef={ref}>;
}
```

## Sample Code

Presentational/Non-interactive list

```tsx
<List>
  <ListItem>List Item</ListItem>
  <ListItem>List Item</ListItem>
  <ListItem>List Item</ListItem>
  <ListItem>List Item</ListItem>
</List>
```

Selectable listbox

```tsx
<Listbox>
  <ListboxOption value="1">Option 1</ListboxOption>
  <ListboxOption value="2">Option 2</ListboxOption>
  <ListboxOption value="3">Option 3</ListboxOption>
  <ListboxOption value="4">Option 4</ListboxOption>
</Listbox>
```

Selectable listbox without checkbox indicator slot

```tsx
<Listbox>
  <ListboxOption checkbox={null} value="2">
    Option 1
  </ListboxOption>
  <ListboxOption checkbox={null} value="2">
    Option 2
  </ListboxOption>
  <ListboxOption checkbox={null} value="3">
    Option 3
  </ListboxOption>
  <ListboxOption checkbox={null} value="4">
    Option 4
  </ListboxOption>
</Listbox>
```

Selectable listbox with multiselect

```tsx
<Listbox multiselect>
  <ListboxOption value="2">Option 1</ListboxOption>
  <ListboxOption value="2">Option 2</ListboxOption>
  <ListboxOption value="3">Option 3</ListboxOption>
  <ListboxOption value="4">Option 4</ListboxOption>
</Listbox>
```

## Variants

### Single select

The selectable list should only select one single element at a time when invoked. This functions similar to a
radio group behavior.

### Multi select

The selectable list should toggle the selection state of each item when invoked. This is similar to the behaviour of a
group of checkboxes.

## API

### List

```ts
type ListSlots = {
  root: NonNullable<Slot<'ul' | 'div'>>;
};

type ListProps = ComponentProps<ListSlots>;
```

### ListItem

```ts
type ListItemSlots = {
  root: NonNullable<Slot<'li' | 'div'>>;
};

type ListItemProps = ComponentProps<ListItemSlots>;
```

### Listbox

```ts
type ListboxSlots = ListSLots;

type ListboxCommons = {
  onChange: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, data: { selectedValues: string[] });
  selectedValues: string[];
  defaultSelectedValues: string[];
}

type ListboxProps = ComponentProps<ListboxSlots> & ListboxCommons;
```

### ListboxOption

```ts
type ListboxOptionSlots = ListItemSlots & {
  checkbox: Slot<'span'>;
};

type ListboxOptionCommons = {
  value: string;
};

type ListboxOptionProps = ComponentProps<ListboxOptionSlots> & ListboxOptionCommons;
```

## Structure

### List

```tsx
<List>
  <ListItem>Item</ListItem>
  <ListItem>Item</ListItem>
  <ListItem>Item</ListItem>
  <ListItem>Item</ListItem>
</List>
```

```html
<ul>
  <li>Item</li>
  <li>Item</li>
  <li>Item</li>
  <li>Item</li>
</ul>
```

### Listbox

```tsx
<Listbox>
  <ListboxOption value="1">Option 1</ListboxOption>
  <ListboxOption value="2">Option 2</ListboxOption>
  <ListboxOption value="3">Option 3</ListboxOption>
  <ListboxOption value="4">Option 4</ListboxOption>
</Listbox>
```

```html
<ul role="listbox" aria-activedescendant="1" tabindex="0">
  <li id="1" role="option" aria-selected="true">Option 1</li>
  <li id="2" role="option">Option 2</li>
  <li id="3" role="option">Option 3</li>
  <li id="4" role="option">Option 4</li>
</ul>
```

Multi selectable

```tsx
<Listbox multiselectable>
  <ListboxOption value="1">Option 1</ListboxOption>
  <ListboxOption value="2">Option 2</ListboxOption>
  <ListboxOption value="3">Option 3</ListboxOption>
  <ListboxOption value="4">Option 4</ListboxOption>
</Listbox>
```

```html
<ul role="listbox" aria-multiselectable="true" aria-activedescendant="1" tabindex="0">
  <li id="1" role="option" aria-selected="true">Option 1</li>
  <li id="2" role="option" aria-selected="false">Option 2</li>
  <li id="3" role="option" aria-selected="false">Option 3</li>
  <li id="4" role="option" aria-selected="false">Option 4</li>
</ul>
```

## Migration

### v8

### v0

## Behaviors

The `List` component itself has no interaction behaviour and is purely presentational. This section will cover
the interactions that will be used by the `Listbox`.

### Mouse

When a `ListboxOption` the option is selected. When multiselect mode is enabled for the `Listbox`, the option can be
toggled with click.

### Keyboard

`Up` and `Down` arrows should be able to navigate the options. `Home` and `End` keys should navigate to the first
and last options of the `Listbox` respectively.

Elements that are active but not visible should be scrolled into view.

## Accessibility

Accessibility features have been written into the rest of this spec. Here are the resources that were used
during resesarch into accessibility:

- https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/listbox/listbox.html
- https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
- https://w3c.github.io/aria-practices/examples/listbox/listbox-grouped.html
