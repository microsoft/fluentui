# @fluentui/react-combobox Spec

## Background

The basic purpose of a Combobox or Dropdown is to allow users to select one or more values from among a set of options. The semantics and behavior are roughly similar to a more complex version of an HTML `<select>` element, with more functionality and styling control.

A combobox can be single or multi-select, and it can be editable (`<Combobox>`) or select-only (`<Dropdown>`). More options are covered in the [Variants section](#variants).

The basic structure of a Combobox or Dropdown has two pieces: the faceplate, which is always rendered on the page, and displays the current selection, and the popup that contains a list of options.

### In this package: Combobox vs. Dropdown

The `@fluentui/react-combobox` package provides two combobox-like selection controls: `<Combobox>` and `<Dropdown>`. While they share the bulk of their logic under the hood, they differ in the primary slot (`input` vs. `button`), and in whether the user can insert typed characters.

Use `<Combobox>` when the user should be able to type custom strings into the control, or type to filter options. Use `<Dropdown>` when the user should only be able to select from the available options. Dropdown will allow users to type one letter or multiple letters in quick succession to quickly jump to an option, but does not otherwise allow text input.

### Select vs. Menu vs. Combobox & Dropdown

Combobox, Dropdown, Select, and Menu all share some common pieces of interaction: a trigger element opens a popup with a list of interactive items. Despite that similarity, they cannot be used interchangeably.

### When to use Select

The [Select component](https://github.com/microsoft/fluentui/blob/master/packages/react-select/Spec.md) from `@fluentui/react-select` shares most of its underlying semantics with Combobox and Dropdown. The main difference is that under the hood it uses the HTML `<select>` element, so its functionality is more limited.

Select provides better mobile support and accessibility than Combobox, and has the same visual appearance when collapsed. When expanded, it displays the native OS select menu, which cannot be styled.

Use Select when a basic single-select form component with no freeform text input or filtering is needed. Select is also the ideal choice when you need the best possible mobile support.

### When to use Combobox or Dropdown

The components in this package (`@fluentui/react-combobox`) are more customizable and provide more features than Select, and are intended to be used in scenarios where Select is not sufficient.

Dropdown is a more feature-rich version of Select, which comes at the cost a larger code footprint, and less robust support for accessibility compared to the native `<select>` element. Combobox is essentially a Dropdown that allows text input.

Use Dropdown over Select when any of the following are required:

- Virtualization
- Control over styling the dropdown and options
- Multiple selection

Combobox also supports all of the above, and should be used instead of Dropdown for:

- filtering
- freeform text input

### When to use Menu

Unlike Select, Dropdown, and Combobox, [Menu](https://github.com/microsoft/fluentui/blob/master/packages/react-menu/Spec.md) (`@fluentui/react-menu`) is not primarily a selection component or a form control. Menu should be used when the purpose is to allow the user to perform an immediate action on the page, rather than save a selected value.

One exception: selection that occurs within the context of a larger menubar or menu should use Menu components (specifically `MenuItemCheckbox` and `MenuItemRadio`). Select, Dropdown, and Combobox should never be nested inside a Menu, and Menu components should never be nested inside a Select, Dropdown, or Combobox.

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

In contrast, v9 defines options as children of the Combobox or Dropdown control:

```tsx
<Combobox>
  <Option>Option A</Option>
  <Option>Option B</Option>
</Combobox>

<Dropdown>
  <Option>Option A</Option>
  <Option>Option B</Option>
</Dropdown>
```

Groups of options in v9 are also defined as children, rather than through the `options` or `items` prop:

```tsx
<Combobox>
  <OptionGroup label="Group 1">
    <Option>Option A</Option>
    <Option>Option B</Option>
  </OptionGroup>
  <OptionGroup label="Group 2">
    <Option>Option C</Option>
    <Option>Option D</Option>
  </OptionGroup>
</Combobox>
```

#### Non-Option children

The v9 Combobox and Dropdown have a far more flexible approach to content within the popup than v8 or v0, since any JSX children will be rendered into the popup. However, this comes with the potential to severely impact the keyboard interaction and accessibility of the control. In practice, content within the Combobox or Dropdown should always adhere to the following limits:

- Static (non-interactive, non-focusable) decorative content is always OK
- Text content should either be implemented using the OptionGroup's `label` slot when appropriate, or consult with an accessibility SME on how to expose the information to screen reader users.
- Any interactive controls (e.g. a "load more" button) _must_ be implemented by wrapping or extending the Option component.
- Non-combobox interactive controls (e.g. Menu, Checkbox, Tab, Link, etc.) should _never_ be placed within Combobox/Dropdown, OptionGroup, or Option components. Static controls (Image, Persona, Avatar) are fine.

#### Customizing Option Render

Because v8 and v0 Combobox, Dropdown, and Pickers defined options as props, they used `onRenderX` props to customize option render:

| v8 Dropdown    | v8 Combobox    | v8 Pickers         | v0 Dropdown        |
| -------------- | -------------- | ------------------ | ------------------ |
| onRenderOption | onRenderOption | onRenderSuggestion | renderItem         |
| onRenderItem   | onRenderItem   |                    | renderSelectedItem |

The v9 Combobox approach of options as children allows option render to be directly customized through the `<Option>` JSX and the Option's own children:

```tsx
<Combobox>
  <Option key="A" text="Option A">
    Option A <CalendarIcon />
  </Option>
  <Option key="B" text="Option B" style={{ color: 'red' }}>
    Option <i>B</i>
  </Option>
</Combobox>
```

When using non-string children inside Option, it is very important to provide a `text` prop with the human-readable string version of the Option. This is used in two ways:

1. When a user types into either a Dropdown or Combobox, `text` is used to find a matching option
2. When an option is selected, `text` is used by default as the display value of the Dropdown button or Combobox input

#### Positioning

Combobox uses [Popper JS](https://popper.js.org/) through `@fluentui/react-positioning` for positioning the dropdown listbox. It can be customized through the `positioning` property. The [`react-popover` spec](https://github.com/microsoft/fluentui/blob/master/packages/react-popover/Spec.md) contains details on positioning options and migration from v8/v0.

#### Selection

Combobox in v9 allows both controlled and uncontrolled selection, as do the corresponding v8 and v0 components.

| Concept              | v9 Combobox            | v8 Dropdown         | v8 Combobox        | v8 Pickers           | v0 Dropdown  |
| -------------------- | ---------------------- | ------------------- | ------------------ | -------------------- | ------------ |
| Initial selection    | defaultSelectedOptions | defaultSelectedKeys | defaultSelectedKey | defaultSelectedItems | defaultValue |
| Controlled selection | selectedOptions        | selectedKey         | selectedKey        | selectedItems        | value        |
| Callback             | onOptionSelect         | onChange            | onChange           | onChange             | onChange     |

The reason to move to `onOptionSelect` over `onChange` in the v9 Combobox is because the editable Combobox uses an `<input>` element as its primary slot. Using `onOptionSelect` allows the input to retain its native `onChange` event.

Controlling `selectedOptions` or setting `defaultSelectedOptions` is done by passing in an array of string Option values. The value for an Option is one of the following:

1. The `value` prop if provided
2. The `text` prop if provided, and there is no `value` prop
3. The children of the Option, converted to a string

## Components

The following components are exported from the `react-combobox` package:

- `Combobox`: a top-level editable selection component.
- `Dropdown`: a top-level select-only selection component.
- `Listbox`: an internal component wrapping the options. Primarily useful if recomposing Combobox or Dropdown.
- `OptionGroup`: a component for semantically and visually group sets of options with an optional group label. Should only be used as a child of Combobox or Dropdown.
- `Option`: a component for individual options within Combobox or Dropdown. Should only be used as a child of Combobox, Dropdown, or OptionGroup.

## Sample Code

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

### Basic Dropdown

```tsx
<label id="pets">Best pet</label>
<Dropdown aria-labelledby="pets" placeholder="Select an animal">
  <Option key="cat">Cat</Option>
  <Option key="dog">Dog</Option>
  <Option key="ferret">Ferret</Option>
  <Option key="fish">Fish</Option>
</Dropdown>
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

### Option with a Persona layout and `text` attribute

```tsx
<label id="people">Send to:</label>
<Combobox aria-labelledby="people">
  <Option text="Katri Athokas">
    <Persona
      avatar={{ color: 'colorful' }}
      name="Katri Athokas"
      presence={{
        status: 'available',
      }}
      secondaryText="Available"
    />
  </Option>
  <Option text="Elvia Atkins">
    <Persona
      avatar={{ color: 'colorful' }}
      name="Elvia Atkins"
      presence={{
        status: 'busy',
      }}
      secondaryText="Busy"
    />
  </Option>
</Combobox>
```

## Variants

### Visual variants

Visual variants are very similar to `@fluentui/react-select` and `@fluentui/react-input` variants. They can be controlled through the `size` and `appearance` props:

### Size

- `small`
- `medium` (default)
- `large`

### Appearance

- `outline` (default)
- `filledDarker`
- `filledLighter`
- `underline`

The design spec for Combobox has more visual details on each of these.

### Multiple selection

Combobox and Dropdown support single and multiple selection through the `multiselect` prop. Multiselect options have a slightly different visual check style, and the popup does not close when individual options are selected or deselected.

### Disabled options

Individual Option children may be set to a disabled state using the `disabled` prop on the `<Option>` itself. Disabled options cannot be selected, but are still reachable via keyboard arrow keys.

### Grouped options

Options may be grouped with an optional group label using the `<OptionGroup>` component. This creates a semantic grouping for options in addition to the visual style.

While visual groupings of options could be achieved with a custom divider and static header text, using `<OptionGroup>` is recommended because it provides group and label information to screen reader users.

### Non-Option children

Combobox and Dropdown support arbitrary non-Option and non-OptionGroup children, but for screen reader and keyboard accessibility they should be used with caution.

Interactive, focusable elements (aside from `<Option>`) should never be added as children, since they will not be reachable with the keyboard, and may interfere with screen reader accessibility.

We recommended adding `role="presentation"` or `role="none"` to any static children within Combobox or Dropdown to avoid unintentional side effects for screen reader users:

```tsx
<Combobox>
  <Option key="A">Option A</Option>
  <span role="none" className="my-fancy-divider" />
  <Option key="B">Option B</Option>
</Combobox>
```

If an interactive non-selectable item is needed within Combobox or Dropdown, the best way to achieve this is by extending the Option component and adding special logic for it within `onOptionSelect`. This will ensure it is still accessible with the keyboard, a screen reader, voice control, and other assistive tech.

## API

Dropdown and Combobox share the same basic structure, with the main difference being the primary slot on Dropdown is `button` instead of `input` on Combobox. Combobox also supports the `freeform` prop that allows user-defined values in the text field.

Combobox and Dropdown provide a context that is consumed by options

### Combobox

See API at [Combobox.types.ts](./src/components/Combobox/Combobox.types.ts).

### Dropdown

See API at [Dropdown.types.ts](./src/components/Dropdown/Dropdown.types.ts).

### Listbox

Listbox is an internal component, and should not be used outside of a Combobox or Dropdown. It is the type of the `listbox` slot in both components.

See API at [Listbox.types.ts](./src/components/Listbox/Listbox.types.ts).

### OptionGroup

OptionGroup is functionally a wrapper for options, with a single `label` slot prop.

See API at [OptionGroup.types.ts](./src/components/OptionGroup/OptionGroup.types.ts).

### Option

Options have a slot for the `checkIcon`, which uses a checkmark icon when selected and single-select, and a checkbox icon when multiselect.

See API at [Option.types.ts](./src/components/Option/Option.types.ts).

## Combobox Structure

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

This shows the DOM structure of the Combobox after being opened. If `inlinePopup` is set to true, the listbox will render immediately after the `expandIcon` slot, within the root slot.

```html
<div aria-owns="listbox-id">
  <!-- root slot, combobox wrapper -->
  <input
    type="text"
    role="combobox"
    aria-expanded="true"
    aria-activedescendant="option1-id"
    placeholder="Select an Option"
    value=""
  /><!-- input slot (primary slot) -->
  <span role="button" aria-expanded="true" aria-label="Open">
    <!-- expandIcon slot -->
    <svg aria-hidden="true"><!-- dropdown icon --></svg>
  </span>
</div>

<!-- in a portal: -->
<div role="listbox" id="listbox-id">
  <!-- listbox root slot -->
  <div role="group" aria-labelledby="group1-label-id">
    <!-- optiongroup root slot -->
    <span id="group1-label-id" role="presentation">Group 1</span
    ><!-- optiongroup label slot -->
    <div role="option" aria-selected="false" id="option1-id">
      <!-- option root slot -->
      <span aria-hidden="true">
        <!-- option check slot -->
        <svg><!-- check icon --></svg>
      </span>
      Option A
    </div>
    <div role="option" aria-selected="false" id="option2-id">
      <span aria-hidden="true">
        <svg><!-- check icon --></svg>
      </span>
      Option B
    </div>
  </div>
</div>
```

## Dropdown Structure

### Public

```tsx
<Dropdown placeholder="Select an option">
  <OptionGroup label="Group 1">
    <Option key="A">Option A</Option>
    <Option key="B">Option B</Option>
  </OptionGroup>
  <OptionGroup label="Group 2">
    <Option key="C">Option C</Option>
    <Option key="D">Option D</Option>
  </OptionGroup>
</Dropdown>
```

### DOM

This shows the DOM structure of the Combobox after being opened. The primary difference between the DOM of Dropdown and Combobox is in the render of the primary slot and expandIcon slot.

If `inlinePopup` is set to true, the listbox will render immediately after the `button` slot, within the root slot.

```html
<div aria-owns="listbox-id">
  <!-- root slot, combobox wrapper -->
  <button role="combobox" type="button" aria-expanded="true" aria-activedescendant="option1-id">
    <!-- button slot (primary slot) -->
    Select an option
    <span>
      <!-- expandIcon slot -->
      <svg aria-hidden="true"><!-- dropdown icon --></svg>
    </span>
  </button>
</div>

<!-- in a portal: -->
<div role="listbox" id="listbox-id">
  <!-- listbox root slot -->
  <div role="group" aria-labelledby="group1-label-id">
    <!-- optiongroup root slot -->
    <span id="group1-label-id" role="presentation">Group 1</span
    ><!-- optiongroup label slot -->
    <div role="option" aria-selected="false" id="option1-id">
      <!-- option root slot -->
      <span aria-hidden="true">
        <!-- option check slot -->
        <svg><!-- check icon --></svg>
      </span>
      Option A
    </div>
    <div role="option" aria-selected="false" id="option2-id">
      <span aria-hidden="true">
        <svg><!-- check icon --></svg>
      </span>
      Option B
    </div>
  </div>
</div>
```

## Migration

The following v7/v8 and v0 components can be migrated to the v9 Combobox:

- **v8 Dropdown**: Use the v9 Select or v9 Dropdown, [depending on the required features](#combobox-vs-select-vs-menu).
- **v8 Combobox**: The v8 Combobox should be replaced by the v9 Combobox.
- **v8 Pickers**: v8 Pickers can be partly replicated with the mutliselect variation of the v9 Combobox, together with custom tags as shown in the "Multiselect With Tags" example. A separate tagpicker component is being spec'd.
- **v0 Dropdown**: The v0 Dropdown should be replaced by the v9 Dropdown or v9 Combobox, depending on whether it should allow user typing.

The primary difference between v7/v8 and v0 components vs. the v9 Combobox/Dropdown is the definition of options as children in v9.

For a full migration guide, see [the migration spec](./Migration.md).

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

The inline vs. portal behavior of the listbox popup has a particularly large impact on Combobox and Dropdown accessibility because keyboard focus does not enter the popup. This, coupled with the lack of support for `aria-owns` in Safari, means that iOS VoiceOver users will not be able to access the options unless they either swipe to the end of the DOM, or use touch exploration to try to find the popup on the screen.

If `inlinePopup` is set to true, the listbox will follow the trigger in the DOM, and swipe access will work.

The other scenario where `inlinePopup` is important is if the Combobox is used inside a modal of any sort. VoiceOver will not allow the cursor to leave a modal, so if the listbox is _not_ rendered inline, it will be fully impossible for an iOS VoiceOver user to use the combobox.

### Semantic structure

The Fluent Combobox and Dropdown are based on the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-1.2/#combobox), which differs significantly from ARIA 1.1. The ARIA 1.2 pattern has [better practical support](https://www.24a11y.com/2019/select-your-poison-part-2/), and as of writing, the 1.2 spec is headed towards Candidate Recommendation.

The main difference between the Fluent Combobox/Dropdown and the ARIA 1.2 pattern is that when they are multiselect, we use `menu` and `menuitemcheckbox` semantics for the popup and options. This decision was based on both extensive internal tests and external user testing.

### Known issues

Accessibility support for comboboxes in particular changes frequently, so known issues may quickly go out of date either by being fixed, or be being superceded by new issues. Here are some known accessibility bugs as of early 2023:

- NVDA does not read the value of the select-only Combobox
- VoiceOver on macOS does not consistently expose active options when arrowing through an open combobox
- Safari does not respect `aria-owns`, so someone using VoiceOver on iOS will not be able to swipe from the combobox trigger to the options unless `inlinePopup` is set to `true`.
- If the number of options in the listbox changes while it is open, that change is not consistently exposed by screen readers.
