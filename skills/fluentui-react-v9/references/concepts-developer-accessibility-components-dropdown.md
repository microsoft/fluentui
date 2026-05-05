# Dropdown Accessibility Spec

`Dropdown` is one of three form selection components that display the current selection, and allow a user to expand a popup to modify the selection. The other two are `Select` and `Combobox`.

The semantics and behavior are roughly similar to a more complex version of the `Select` component (an HTML `<select>` element), but with more functionality and full control over styling. Unlike `Combobox`, `Dropdown` does not allow text input. `Dropdown` supports both single-selection and multi-selection.

## Usage

### When to choose Dropdown

#### Dropdown vs. Select

`Dropdown` is a more feature-rich version of `Select`, which comes at the cost a larger code footprint, and less robust support for accessibility compared to the native `<select>` element.

Use `Dropdown` when any of the following are required:

- Control over styling the popup and options
- Multiple selection
- Virtualization

Otherwise, `Select` is recommended for performance, accessibility, and native-feeling mobile support.

#### Dropdown vs. Combobox

`Combobox` allows text input, which enables filtering and freeform values. This is a better fit for use cases with a large number of options, or where the user may want to type a value directly without interacting with the popup.

#### Dropdown vs. Menu

`Select` or `Dropdown` should be used over `Menu` when creating a standalone control for selecting values. `Menu` should be used when the purpose is to allow the user to perform an immediate action on the page, or when the control is embedded within a parent `Menu`.

Examples of appropriate `Menu` usage include:

- Application top menus
- Context menus
- Editing menubars

#### Multiselect Dropdown vs. Checkboxes

Checkboxes are significantly more usable and accessible than multiselect comboboxes for smaller numbers of choices. Consider using a checkbox group over `Dropdown` if there are less than 10 options.

### Implementing Dropdown

#### Label

Authors must provide label text for `Dropdown`. The recommended pattern for Fluent form controls is to use the `Label` component like this:

Other options include:

1.  `aria-label="label text string"` on the `<Dropdown>` component
2.  `aria-labelledby="label-id"` on the `<Dropdown>` component, pointing to the id of label text

The `placeholder` prop is not a substitute for a label. It is no longer displayed when a value is selected, while labels must be persistently visible and exposed to the user.

#### Content restrictions

The following content types should not be used within children or slots of `Dropdown`:

- Any interactive or focusable content, aside from `<Option>`.
- Any structured content, such as tables, lists, or headings.

The following content types should not be used within children or slots of `Option`:

- Any interactive or focusable content, aside from `<Option>`.
- Any structured content, such as tables, lists, or headings.
- Tooltips

Focusable and interactive content is prohibited based on the semantics of `Dropdown` and `Option`, and will cause issues for screen reader users. Focusable items within the popup will additionally not be keyboard accessible.

The following content types may be used within children and slot content in `Dropdown` and `Option`:

- Images and icons
- Generic elements like `<div>` and `<span>`, without `tabindex` or `role` properties
- Fluent's `<Text>` component

#### inlinePopup

By default, the popup renders in its own layer at the end of the DOM to ensure it appears above all other UI, and is not clipped by containers with overflow: hidden or overflow: scroll. This causes an issue for people who use iOS VoiceOver (Apple's touch-based screen reader), since it strictly follows DOM order when swiping from one control to the next. This makes it difficult to reach the options popup after opening the `Dropdown`.

If possible, we recommend setting `inlinePopup={true}`, which will render the popup directly after the `Dropdown` button in the DOM for better `VoiceOver` touch support.

#### Option value

By default, the `<Option>` component calculates its text value from its children. This works if the children are a simple string, like this:

However, if the `<Option>` contains JSX, this will not work correctly. If that is the case, provide a string value with the `value` prop:

`Dropdown` uses string values to handle jumping between options based on alphanumeric keyboard input, so `value` must match the visual text displayed within the `Option`.

#### Color contrast and appearance variants

The `filled-lighter`, `filled-darker`, and `underline` all have contrast requirements for their background color:

- `filled-lighter` and `filled-darker` variants must both be placed over background colors dark enough to meet 3:1 contrast against the `Dropdown` button's background color.
- `underline` must be placed over a light enough background for the placeholder and value text to meet 4.5:1 contrast against the page background.

## Semantics

| Role                                       | States and properties        |
| ------------------------------------------ | ---------------------------- |
| 1. combobox                                | `type="button"`              |
| `aria-haspopup="listbox"`                  |                              |
| `aria-activedescendant="active-option-id"` |                              |
| `aria-expanded="true/false"`               |                              |
| 2. listbox                                 | -                            |
| 3. option                                  | `aria-selected="true/false"` |
| wrapper (no role)                          | `aria-owns="listbox-id"*`    |

** \* putting `aria-owns` on the wrapping element moves the listbox immediately after the trigger in the accessibility tree, even though it is rendered at the end of the DOM. For all screen readers but VoiceOver, this enables virtual cursor navigation between the trigger and listbox/options. **

## Keyboard interaction

### Navigate to dropdown

| Name           | Role     | States and properties   |
| -------------- | -------- | ----------------------- |
| (1) Best fruit | combobox | `aria-expanded="false"` |

### Open or close the listbox popup

#### Open popup with no selected options

| Name           | Role     | States and properties  |
| -------------- | -------- | ---------------------- |
| (1) Best fruit | combobox | `aria-expanded="true"` |

| Key                     | Result                                                                |
| ----------------------- | --------------------------------------------------------------------- |
| Enter                   | Opens popup with first option in focus                                |
| Space                   | Opens popup with first option in focus                                |
| Up or Down arrow        | Opens popup with first option in focus                                |
| Any printable character | Opens popup with focus on first option matching that character        |
| Esc or Alt + Up arrow   | Closes popup without modifying selection, and keeps dropdown in focus |

#### Open popup with a selected option (or options)

When one or more options are already selected, focus will move to the most recently selected option when opened.

| Name           | Role     | States and properties  |
| -------------- | -------- | ---------------------- |
| (2) Best fruit | combobox | `aria-expanded="true"` |
| (3) Banana     | option   | `aria-selected="true"` |

### Navigate between options in popup

| Name       | Role    | States and properties   |
| ---------- | ------- | ----------------------- |
| (2) -      | listbox | -                       |
| (3) Banana | option  | `aria-selected="false"` |

| Key                     | Result                                                 |
| ----------------------- | ------------------------------------------------------ |
| Up arrow                | Moves focus to the previous option, if one exists      |
| Down arrow              | Moves focus to the next option, if one exists          |
| Home                    | Moves focus to the first option                        |
| End                     | Moves focus to the last option                         |
| PageUp                  | Moves focus up 10 options, or to the first option      |
| PageDown                | Moves focus down 10 options, or to the last option     |
| Any printable character | Moves focus to the next option matching that character |

### Behavior: Single-selection

#### Select an option

| Name       | Role   | States and properties   |
| ---------- | ------ | ----------------------- |
| (1) Banana | option | `aria-selected="false"` |

| Key            | Result                                                                            |
| -------------- | --------------------------------------------------------------------------------- |
| Enter or Space | Selects the focused option and closes the popup                                   |
| Tab            | Selects the focused option, closes the popup, and moves focus after the dropdown  |
| Shift + Tab    | Selects the focused option, closes the popup, and moves focus before the dropdown |

#### Popup closes automatically after an option is selected

| Name           | Role     | States and properties   |
| -------------- | -------- | ----------------------- |
| (2) Best fruit | combobox | `aria-expanded="false"` |

### Behavior: Multiselection

Unlike single-select behavior, mutliselect Dropdowns do not close automatically after a selection is made, unless using Tab or Shift + Tab.

| Name        | Role   | States and properties   |
| ----------- | ------ | ----------------------- |
| (1a) Banana | option | `aria-selected="false"` |
| (1b) Banana | option | `aria-selected="true"`  |

| Key            | Result                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| Enter or Space | Toggles selection on or off for focused option                                                        |
| Tab            | Toggles selection on or off for focused option, closes the popup, and moves focus after the dropdown  |
| Shift + Tab    | Toggles selection on or off for focused option, closes the popup, and moves focus before the dropdown |

## Windows contrast themes (high contrast mode)

Dropdown fully relies on native browser behavior for Windows contrast themes. All borders, icons, and text adapt to the user-selected theme colors without modifying styles in a media query.

## Motion and animation

The focus underline's growing animation does not run when [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) is true.

## Known issues

- [Safari does not support `aria-owns`](https://bugs.webkit.org/show_bug.cgi?id=241694)
- [JAWS does not expose option group labels](https://github.com/FreedomScientific/VFO-standards-support/issues/381)
- [Android Talkback does not expose option group labels](https://issuetracker.google.com/issues/225987035)
- NVDA and JAWS do not explicitly announce "selected" for selected options (this is not a bug per se, but occasionally causes confusion)
