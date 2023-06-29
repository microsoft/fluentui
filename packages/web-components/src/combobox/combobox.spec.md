# Combobox

## Component Description

`fluent-combobox` is an input widget with an associated popup that enables users to select a value for the combobox from a collection of possible values. In some implementations, the popup presents allowed values, while in other implementations, the popup presents suggested values, and users may either select one of the suggestions or type a value. The popup may be a listbox, grid, tree, or dialog. Many implementations also include a third optional element -- a graphical Open button adjacent to the combobox, which indicates availability of the popup. Activating the Open button displays the popup if suggestions are available.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/D3Rk6OfNCauW3py6liMwar/Combobox?type=design&node-id=1319-163&mode=design&t=Uvrv2Kim6fgUdwVl-0)

## Engineering Spec

Comprised of components: text input, button with chevron icon, and a listbox. The listbox is a separate component that is rendered in a popover.

### Inputs

| Attribute        | Values                                                   | Default         | Description                                                                           |
| ---------------- | -------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| `appearance`     | `outline` `transparent` `filled-darker` `filled-lighter` | `outline`       | The appearance of the input field.                                                    |
| `autocomplete`   | `inline` `list` `both` `none`                            | `none`          | The autocomplete behavior of the input field.                                         |
| `block`          | `boolean`                                                | -               | If true, fill the width of parent container.                                          |
| `disabled`       | `boolean`                                                | -               | Disables the control.                                                                 |
| `freeform`       | `boolean`                                                | `false`         | If true, the user input is not restricted to items in the list of selectable options. |
| `selectionModel` | `single-select`, `multi-select` or `pill-select`         | `single-select` | The selection model for the listbox.                                                  |
| `size`           | `small` `medium` `large`                                 | `medium`        | The height of the input field.                                                        |
| `value`          | `string`                                                 | `''`            | The value of the control.                                                             |

### Outputs

None

### Events

- `input` (`InputEvent`): Emits when text is entered via user interaction.
- `change` (`CustomEvent`): Emits when the `value` is changed via user interaction.

### Slots

- `start`: Content which can be provided before the input
- `end`: Content which can be provided before the input
- `indicator`: The visual indicator representing the expanded state
- `default`: The default slot for the options

### CSS Variables

None

### Interactions

- Clicking on the chevron button or the input field triggers the listbox view.
- Typing in the input field triggers the listbox view.

## Examples

Default appearance `outline`, size `medium`, selection model `single-select`, and autocomplete `none` are built in to the component. The following examples show how to customize the component.

### Appearance

```typescript
<fluent-combobox placeholder="Type to search" appearance="transparent">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" appearance="filled-darker">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" appearance="filled-lighter">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

### Autocomplete

```typescript
<fluent-combobox placeholder="Type to search" autocomplete="inline">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" autocomplete="list">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" autocomplete="both">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

### Size

```typescript
<fluent-combobox placeholder="Type to search" size="small">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" size="large">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

### Selection Model

```typescript
<fluent-combobox placeholder="Type to search" select="multi-select">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" select="pill-select">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

### Block, Disabled and Freeform

```typescript
<fluent-combobox placeholder="Type to search" block>
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" disabled>
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

```typescript
<fluent-combobox placeholder="Type to search" freeform="true">
  <fluent-option>Option 1</fluent-option>
  <fluent-option>Option 2</fluent-option>
  <fluent-option>Option 3</fluent-option>
</fluent-combobox>
```

## Accessibility

- [x] Find the matching component through [WCAG's patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
  - [Accessible Patterns Guide](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
  - [combobox role](https://w3c.github.io/aria/#combobox)
- [x] Are there any accessibility elements unique to this component?
- [x] List ARIA attributes

  - [x] combobox role in Fluent UI React
  - [x] listbox role in Fluent UI React

- [ ] Does the component support 400% zoom?
- [ ] What keyboard behaviors does the component support?
  - [ ] Up / Right :
  - [ ] Down / Left:
  - [ ] PageUp/Up/Right & Shift :
  - [ ] PageDown /Down/Left & Shift :
  - [ ] Home :
  - [ ] End :

## Preparation

- [x] [Find the base FAST Component](https://explore.fast.design/components/) this component will inherit from and document:

  - [FAST Combobox Component](https://explore.fast.design/components/fast-combobox) Incorporates the following FAST components:
    - [FAST Listbox Component](https://explore.fast.design/components/fast-listbox)
    - [FAST listbox-option component](https://github.com/microsoft/fast/tree/master/packages/web-components/fast-foundation/src/listbox-option)

- [x] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/tree/master/specs) for differences and document:

  - Fluent UI React v9 Combobox does not have a component spec.
  - [Fluent 2 Combobox Spec](https://fluent2.microsoft.design/components/web/react/combobox/code)
  - [Fluent UI Combobox Spec](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/docs/Spec.md)

    Differences:

    - Fluent UI uses listbox-item `fluent-option` component in the Fluent UI React Combobox Component.
    - Fleunt Web Components has yet to implement a listbox-item component.

  -

- [x] [Fluent UI React V9 Storybook](https://aka.ms/fluentui-storybook) for implementation differences and document:

  - [Fluent React V9 Combobox](https://master--628d031b55e942004ac95df1.chromatic.com/?path=/docs/components-Combobox--default)

- [x] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#find-open-issues-on-github)

  - Combobox - [42 issues open](https://github.com/microsoft/fluentui/issues?q=is%3Aissue+is%3Aopen+combobox)

- [x] [Component Spec authored](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec)
  - [ ] And [reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#spec-review)

## Implementation

- [ ] Initial conformance and unit tests (validate basic functionality)
- [ ] [Initial documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#documentation)
  - [ ] [Storybook stories](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#storybook-stories)
  - [ ] README.md covering basic usage
- [ ] Uses design tokens for styling
- [ ] Renders correctly in High Contrast mode

## Validation

- [ ] [Add tests](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#tests)
  - [ ] Unit and conformance tests
  - [ ] Bundle size fixtures
  - [ ] Performance test scenario
  - [ ] Accessibility behavior tests
  - [ ] Create an issue and run [manual accessibility tests](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist): [link to issue]
- [ ] [Validate with partners](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#validation)
- [ ] [Finalize documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#finalize-documentation)
  - [ ] Review and add any missing Storybook stories
  - [ ] Finalize migration guide
  - [ ] In package.json: Remove the alpha/beta tag from the version number in package.json
  - [ ] In package.json: Change beachball's `disallowedChangeTypes` to `"major", "prerelease"`
