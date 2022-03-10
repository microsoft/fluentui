# @fluentui/react-combobox Spec

## Background

The basic purpose of a Combobox is to allow users to select one or more values from among a set of options. The semantics and behavior are roughly similar to a more complex version of an HTML `<select>` element, with more functionality and styling control.

A combobox can be single or multi-select, and it can be editable or select-only. More options are covered in the [Variants section](#variants).

The basic structure of a Combobox has two pieces: the faceplate, which is always rendered on the page, and displays the current selection, and the popup Listbox, which contains the set of options.

The Listbox can also be used as a standalone inline selection widget, similar to a `<select size="n > 1">` or `<select multiple>`. The Listbox has the same options and functionality whether used on its own, or within a Combobox.

### Combobox vs. Select vs. Menu

Combobox, Select, and Menu all share some common pieces of interaction: a trigger element opens a popup with a list of interactive items. Despite that similarity, they cannot be used interchangeably.

### When to use Select

The [Select component](https://github.com/microsoft/fluentui/blob/master/packages/react-select/Spec.md) shares most of its underlying semantics with the Combobox. The main difference is that under the hood it uses the HTML `<select>` element, so its functionality is more limited.

Select provides better mobile support and accessibility than Combobox, and has the same visual appearance when collapsed. When expanded, it displays the native OS select menu, which cannot be styled.

Use Select when a basic single-select form component with no freeform text input or filtering is needed.

### When to use Combobox

Combobox is a more feature-rich version of Select, which comes at the cost a larger code footprint, and less robust support for accessibility compared to the native `<select>` element.

Use Combobox when any of the following are required:

- Filtering or freeform text input
- Virtualization
- Control over styling the dropdown and options
- Multiple selection

### When to use Menu

Unlike Select and Combobox, [Menu](https://github.com/microsoft/fluentui/blob/master/packages/react-menu/Spec.md) is not primarily a selection component or a form component. Menu should be used when the purpose is to allow the user to perform an immediate action on the page, rather than save a selected value.

Examples of appropriate Menu usage include:

- Application menus
- Context menus
- Editor menubars

## Prior Art

The [Open UI research on Select](https://open-ui.org/components/select.research) includes Combobox functionality in addition to basic Select functionality.

### Comparison of v8 and v0

`@fluentui/react` (v8) has three different controls that are different flavors of select/combobox:

- [Combobox](https://developer.microsoft.com/en-us/fluentui#/controls/web/combobox): an editable combobox with a textfield and dropdown listbox
- [Dropdown](https://developer.microsoft.com/en-us/fluentui#/controls/web/dropdown): a non-editable combobox with dropdown listbox
- [Pickers](https://developer.microsoft.com/en-us/fluentui#/controls/web/pickers): an editable combobox with greater customization, particularly in displaying selected items

`@fluentui/react-northstar` (v0) has one combobox control:

- [Dropdown](https://fluentsite.z22.web.core.windows.net/0.51.2/components/dropdown/definition): either an editable or non-editable combobox with a tag-like approach to selected items

#### Defining options

v8's Combobox and Dropdown, and v0's Dropdown allow options to be passed in through a prop:

```tsx
// v7/v8 Combobox and Dropdown
<Combobox options={[{ key: 'A', text: 'Option A' }, { key: 'B', text: 'Option B' }]} />

<Dropdown options={[{ key: 'A', text: 'Option A' }, { key: 'B', text: 'Option B' }]} />

// v0 Dropdown
<Dropdown items={['Option A', 'Option B']} />
```

The v8 Pickers defined options through an `onResolveSuggestions` callback:

```tsx
const options = [
  { key: 'A', name: 'Option A' },
  { key: 'B', name: 'Option B' },
];
const filterSuggestedOptions = (filterText: string, tagList: ITag[]): ITag[] => options;

<TagPicker onResolveSuggestions={filterSuggestedOptions} />;
```

In contrast, v9 defines options as children of the Combobox control:

```tsx
<Combobox>
  <Option key="A">Option A</Option>
  <Option key="B">Option B</Option>
</Combobox>
```

Groups of options in v9 are also defined as children, rather than through the `options` or `items` prop:

```tsx
<Combobox>
  <OptionGroup label="Group 1">
    <Option key="A">Option A</Option>
    <Option key="B">Option B</Option>
  </OptionGroup>
  <OptionGroup label="Group 2">
    <Option key="C">Option C</Option>
    <Option key="D">Option D</Option>
  </OptionGroup>
</Combobox>
```

#### Customizing Option Render

Because v8 and v0 Combobox, Dropdown, and Pickers defined options as props, they used `onRenderX` props to customize option render:

| v8 Dropdown    | v8 Combobox    | v8 Pickers         | v0 Dropdown        |
| -------------- | -------------- | ------------------ | ------------------ |
| onRenderOption | onRenderOption | onRenderSuggestion | renderItem         |
| onRenderItem   | onRenderItem   |                    | renderSelectedItem |

The v9 Combobox approach of options as children allows option render to be directly customized through the `<Option>` JSX and the Option's own children:

```tsx
<Combobox>
  <Option key="A">
    Option A <CalendarIcon />
  </Option>
  <Option key="B" style={{ color: 'red' }}>
    Option <i>B</i>
  </Option>
</Combobox>
```

#### Positioning

Combobox uses [Popper JS](https://popper.js.org/) through `@fluentui/react-positioning` for positioning the dropdown listbox. It can be customized through the `positioning` property. The [`react-popover` spec](https://github.com/microsoft/fluentui/blob/master/packages/react-popover/Spec.md) contains details on positioning options and migration from v8/v0.

#### Selection

Combobox in v9 allows both controlled and uncontrolled selection, as do the corresponding v8 and v0 components.

| Concept              | v9 Combobox         | v8 Dropdown         | v8 Combobox        | v8 Pickers           | v0 Dropdown  |
| -------------------- | ------------------- | ------------------- | ------------------ | -------------------- | ------------ |
| Initial selection    | initialSelectedKeys | defaultSelectedKeys | defaultSelectedKey | defaultSelectedItems | defaultValue |
| Controlled selection | selectedKeys        | selectedKey         | selectedKey        | selectedItems        | value        |
| Callback             | onSelect            | onChange            | onChange           | onChange             | onChange     |

The reason to move to `onSelect` over `onChange` in the v9 Combobox is because the editable Combobox uses an `<input>` element as its primary slot. Using `onSelect` allows the input to retain it's built-in `onChange` event. This could be revisited if we want to override `onChange` to handle both input value changes and selection changes.

## Sample Code

The following example code will not necessarily work in the current package, and is subject to change.

### Basic Combobox

```tsx
<label id="pets">Best pet</label>
<Combobox aria-labelledby="pets" placeholder="Select an animal">
  <Option key="cat">Cat</Option>
  <Option key="dog">Dog</Option>
  <Option key="ferret">Ferret</Option>
  <Option key="fish">Fish</Option>
</Combobox>
```

### Grouped Options

```tsx
<label id="pets">Best pet</label>
<Combobox aria-labelledby="pets">
  <OptionGroup label="Land">
    <Option key="cat">Cat</Option>
    <Option key="dog">Dog</Option>
    <Option key="ferret">Ferret</Option>
  </OptionGroup>
  <OptionGroup label="Water">
    <Option key="fish">Fish</Option>
    <Option key="turtle">Turtle</Option>
  </OptionGroup>
</Combobox>
```

### Multiple Selection

```tsx
<label id="pets">Best pet</label>
<Combobox aria-labelledby="pets" multiselect={true}>
  <Option key="cat">Cat</Option>
  <Option key="dog">Dog</Option>
  <Option key="ferret">Ferret</Option>
  <Option key="fish">Fish</Option>
</Combobox>
```

### Option with icon and description

```tsx
<label id="pets">Best pet</label>
<Combobox aria-labelledby="pets">
  <Option key="cat" icon={<CatIcon />} description="Felis catus">Cat</Option>
  <Option key="dog" icon={<DogIcon />} description="Canis familiaris">Dog</Option>
</Combobox>
```

### Standalone Listbox

This will render a listbox inline in the page, rather than as a popup. This component does not have a separate trigger/faceplate displaying selected items.

```tsx
<label id="pets">Best pet</label>
<Listbox aria-labelledby="pets">
  <Option key="cat">Cat</Option>
  <Option key="dog">Dog</Option>
  <Option key="ferret">Ferret</Option>
  <Option key="fish">Fish</Option>
</Listbox>
```

### Select-only Combobox

Note: the approach for authoring editable vs. select-only comboboxes is still undecided. There are roughly two likely ways this could be authored.

Option 1 (preferred), using a separate Dropdown component that shares all functionality apart from the trigger with Combobox:

```tsx
<label id="pets">Best pet</label>
<Dropdown aria-labelledby="pets">
  <Option key="cat">Cat</Option>
  <Option key="dog">Dog</Option>
  <Option key="ferret">Ferret</Option>
  <Option key="fish">Fish</Option>
</Dropdown>
```

Option 2, using slots:

```tsx
<label id="pets">Best pet</label>
<Combobox aria-labelledby="pets" trigger={<ComboInput>}>
  <Option key="cat">Cat</Option>
  <Option key="dog">Dog</Option>
  <Option key="ferret">Ferret</Option>
  <Option key="fish">Fish</Option>
</Combobox>
```

## Variants

### Visual variants

Visual variants are very similar to `@fluentui/react-select` and `@fluentui/react-input` variants. They can be controlled through the `inline`, `size`, and `appearance` props:

### Inline

- `true`/Inline: the Combobox is rendered inline with text and other controls
- `false`/Block (default): the Combobox has a block layout

### Size

- `small`
- `medium` (default)
- `large`

### Appearance

- `outline` (default)
- `filledDarker`
- `filledLighter`
- `transparent`

The design spec for Combobox has more visual details on each of these.

### Editable vs. Select-only

A Combobox can allow text input, or be select-only. If it allows text input, the focusable element and slot will be an `<input>`. If select-only, the primary slot will be a `<button>` element.

### Multiple selection

A Combobox supports single and multiple selection through the `multiselect` prop. Multiselect Combobox options have a slightly different visual check style, and the listbox popup does not close when individual options are selected or deselected.

### Disabled options

Individual Option children may be set to a disabled state using the `disabled` prop on the `<Option>` itself. Disabled options cannot be selected, but are still reachable via keyboard arrow keys.

### Grouped options

Options may be grouped with an optional group label using the `<OptionGroup>` component. This creates a semantic grouping for options in addition to the visual style.

While visual groupings of options could be achieved with a divider and static header text, using `<OptionGroup>` is recommended because it provides group and label semantics to screen readers.

### Non-Option children

Combobox supports arbitrary non-Option and non-OptionGroup children, but for screen reader and keyboard accessibility, this should be used with caution.

Interactive, focusable elements (aside from `<Option>`) should never be added as children, since they will not be reachable with the keyboard, and may interfere with screen reader accessibility. It is recommended to add `role="presentation"` or `role="none"` to any static children added to Combobox to avoid unintentional side effects for screen reader users:

```tsx
<Combobox>
  <Option key="A">Option A</Option>
  <span role="none" className="my-fancy-divider" />
  <Option key="B">Option B</Option>
</Combobox>
```

## API

### Combobox

The primary slot for combobox is the `trigger`, which is a `<button>` element for select-only comboboxes, and an `<input>` element for editable comboboxes. More slot information is provided in the [Structure section](#structure).

For the full current set of props, see the [Combobox types file](https://github.com/microsoft/fluentui/blob/master/packages/react-combobox/src/components/Combobox/Combobox.types.ts) and [Selection types file](https://github.com/microsoft/fluentui/blob/master/packages/react-combobox/src/utils/Selection.types.ts).

```ts
// A simplified version of relevant props
type SimpleComboboxProps = {
  /** Controls the colors and borders of the field (default `outline`) */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  /* For an uncontrolled component, sets the initial selection */
  initialSelectedKeys?: string[];

  /** Render the listbox popup inline in the DOM, for accessibility-related edge cases (default false) */
  inline?: boolean;

  /** Sets the selection type to multiselect */
  multiselect?: boolean;

  /** Controlled open state */
  open?: boolean;

  /** The placeholder will show when no value is selected */
  placeholder?: string;

  /** Controlled array of selected option keys. */
  selectedKeys?: string[];

  /** Size of the trigger (default `medium`) */
  size?: 'small' | 'medium' | 'large';

  /** Controlled value displayed by the Combobox */
  value?: string;

  /** Callback when the open/closed state of the dropdown changes */
  onOpenChange?(event: OpenEvents, data: OnOpenChangeData): void;

  /* Callback when an option is selected */
  onSelect?(event: SelectionEvents, optionKey: string): void;
};
```

### Listbox

Listbox shares the same API for selection and option children as Combobox. When used within Combobox, selection should be managed solely through Combobox props, and not through the listbox slot.

For the full current set of props, see the [Listbox types file](https://github.com/microsoft/fluentui/blob/master/packages/react-combobox/src/components/Listbox/Listbox.types.ts) and [Selection types file](https://github.com/microsoft/fluentui/blob/master/packages/react-combobox/src/utils/Selection.types.ts).

```ts
// A simplified version of relevant props
type SimpleListboxProps = {
  /* For an uncontrolled component, sets the initial selection */
  initialSelectedKeys?: string[];

  /** Sets the selection type to multiselect */
  multiselect?: boolean;

  /** Controlled array of selected option keys. */
  selectedKeys?: string[];

  /* Callback when an option is selected */
  onSelect?(event: SelectionEvents, optionKey: string): void;
};
```

### OptionGroup

OptionGroup is functionally a wrapper for options, with a single `label` slot prop.

For the full current set of props, see the [OptionGroup types file](https://github.com/microsoft/fluentui/blob/master/packages/react-combobox/src/components/OptionGroup/OptionGroup.types.ts).

### Option

Options have slots for `check`, `icon`, and `description`.

For the full current set of props, see the [Option types file](https://github.com/microsoft/fluentui/blob/master/packages/react-combobox/src/components/Option/Option.types.ts).

```ts
// A simplified version of relevant props
type SimpleOptionProps = {
  /* Sets an option to the `disabled` state */
  disabled?: boolean;

  /** The key is a required prop for Combobox Options */
  key: string;

  /** Defines a string value for the option, used for the parent Combobox's value */
  value?: string;
};
```

## Structure

### Public

```tsx
<Combobox placeholder="Select an option">
  <OptionGroup label="Group 1">
    <Option key="A">Option A</Option>
    <Option key="B">Option B</Option>
  </OptionGroup>
  <OptionGroup label="Group 2">
    <Option key="C">Option C</Option>
    <Option key="D">Option D</Option>
  </OptionGroup>
</Combobox>
```

### DOM

This shows the DOM structure of the Combobox after being opened:

```html
<div>
  <!-- root slot, combobox wrapper -->
  <button role="combobox" type="button" aria-expanded="true" aria-activedescendant="option1-id">
    <!-- primary slot -->
    Select an option
  </button>
  <span
    ><svg><!-- dropdown icon --></svg></span
  >
</div>

<!-- in a portal: -->
<div role="listbox">
  <!-- listbox root slot -->
  <div role="group" aria-labelledby="group1-label-id">
    <!-- optiongroup root slot -->
    <span id="group1-label-id" role="presentation">Group 1</span
    ><!-- optiongroup label slot -->
    <div role="option" aria-selected="false" id="option1-id">
      <!-- option root slot -->
      <span aria-hidden="true"
        ><svg><!-- check icon --></svg></span
      ><!-- option check slot -->
      Option A
    </div>
    <div role="option" aria-selected="false" id="option2-id">
      <span aria-hidden="true"
        ><svg><!-- check icon --></svg></span
      >
      Option B
    </div>
  </div>
</div>
```

## Migration

The following v7/v8 and v0 components can be migrated to the v9 Combobox:

- **v8 Dropdown**: Use the v9 Select or v9 Combobox, [depending on the required features](#combobox-vs-select-vs-menu). If using Combobox, use the [select-only variation](#select-only-combobox).
- **v8 Combobox**: The v8 Combobox should be replaced by the editable variant of the v9 Combobox.
- **v8 Pickers**: v8 Pickers should be replaced by the multiselect variant of the v9 Combobox. There is a design spec for adding selected tags to the v9 Combobox.
- **v0 Dropdown**: The v0 Dropdown should be replaced by the v9 Combobox.

The primary difference between v7/v8 and v0 components vs. the v9 Combobox is the definition of options as children in v9.

For a full migration guide, see [the migration spec](./Spec-migration.md).

## Behaviors

### Positioning

The default position for the listbox popup is `below-start`. The position can be customized through the `positioning` prop, which shares an API with other v9 components like Menu and Tooltip. The full positioning API is defined in the [`@fluentui/react-positioning` package](https://github.com/microsoft/fluentui/blob/master/packages/react-positioning/src/types.ts).

### Keyboard interaction

The keyboard interaction model follows that of the [ARIA Practices Combobox Pattern](https://w3c.github.io/aria-practices/#combobox), with a couple modifications based on user research:

- <kbd>Space</kbd> selects options
- <kbd>Tab</kbd> selects the currently highlighted/active option when the listbox is open

### Dismissing the listbox popup

The listbox popup will be dismissed when any of the following occur:

- Light dismiss: if a user clicks outside or moves focus away from the combobox, it will dismiss
- In a single-select combobox, the listbox dismisses when an option is selected
- Escape is pressed
- Alt + up arrow is pressed

## Accessibility

While accessibility is built into the Combobox as much as possible, there will always be bugs due to quirks in platform and screen reader support. The most robustly accessible selection component will always be `@fluentui/react-select`, since it uses the native `<select>` element.

Most Combobox-specific accessibility considerations are built in to the rest of the spec, but this section addresses additional concerns that don't fit into any other category, or are worth calling out in more detail.

### Using an inline popup

The inline vs. portal behavior of the listbox popup has a particularly large impact on Combobox accessibility because keyboard focus does not enter the popup. This, coupled with the lack of support for `aria-owns` in Safari, means that iOS VoiceOver users will not be able to access the options unless they either swipe to the end of the DOM, or use touch exploration to try to find the popup on the screen.

If `inline` is set to true, the listbox will follow the trigger in the DOM, and swipe access will work.

The other scenario where `inline` is important is if the Combobox is used inside a modal of any sort. VoiceOver will not allow the cursor to leave a modal, so if the listbox is _not_ rendered inline, it will be fully impossible for an iOS VoiceOver user to use the combobox.

### Semantic structure

The Fluent Combobox uses the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-1.2/#combobox), which differs significantly from ARIA 1.1. The ARIA 1.2 pattern has [better practical support](https://www.24a11y.com/2019/select-your-poison-part-2/), and as of writing, the 1.2 spec is headed towards Candidate Recommendation.

### Known issues

(TODO: expand this section with more testing once the Combobox implementation is stable)

Accessibility support for comboboxes in particular changes frequently, so known issues may quickly go out of date either by being fixed, or be being superceded by new issues. Here are some known accessibility bugs as of early 2022:

- NVDA does not read the value of the select-only Combobox
- VoiceOver on macOS does not consistently expose active options when arrowing through an open combobox
- `aria-multiselectable` is not announced by multiple screen readers
- Safari does not respect `aria-owns`, so someone using VoiceOver on iOS will not be able to swipe from the combobox trigger to the options unless `inline` is set to `true`.
- If the number of options in the listbox changes while it is open, that change is not consistently exposed by screen readers.
