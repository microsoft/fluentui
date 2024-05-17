# @fluentui/react-combobox Migration Guide

## Migration from v8 Dropdown

The v8 Dropdown component should be replaced with the [v9 Select](https://github.com/microsoft/fluentui/blob/master/packages/react-select/Spec.md) or v9 Dropdown component. The biggest change is that the v8 `options: IDropdownOption[]` prop is mapped to children in v9.

### Property mapping

| v8 Dropdown            | v9 Dropdown                       |
| ---------------------- | --------------------------------- |
| `options`              | `<Option>` children               |
| `ariaLabel`            | Native `aria-*` props             |
| `calloutProps`         | `positioning` + `listbox`         |
| `className`            | `className`                       |
| `componentRef`         | `ref`                             |
| `defaultSelectedKeys`  | defaultSelectedOptions            |
| `disabled`             | `disabled`                        |
| `dropdownWidth`        | `listbox` slot styles             |
| `errorMessage`         | Handled by Field                  |
| `id`                   | `id`                              |
| `label`                | Handled by Field or Label         |
| `multiSelect`          | `multiselect`                     |
| `multiSelectDelimiter` | controlled `value`                |
| `notifyOnReselect`     | `onClick` on Option               |
| `onChange`             | `onOptionSelect`                  |
| `onDismiss`            | `onOpenChange`                    |
| `onRenderCaretDown`    | `expandIcon` slot                 |
| `onRenderContainer`    | `listbox` slot                    |
| `onRenderLabel`        | Handled by Field                  |
| `onRenderItem`         | children                          |
| `onRenderList`         | `listbox` slot                    |
| `onRenderOption`       | `<Option>` children               |
| `onRenderPlaceholder`  | `button` slot                     |
| `onRenderTitle`        | `button` slot                     |
| `openOnKeyboardFocus`  | controlled `open`                 |
| `panelProps`           | N/A                               |
| `placeholder`          | `placeholder`                     |
| `required`             | `required`                        |
| `selectedKey(s)`       | `selectedOptions`                 |
| `styles`               | `makeStyles` or HTML `style` prop |

## From v8 ComboBox

The v8 ComboBox component should be replaced with the v9 Combobox component. The biggest differences are as follows:

- The v8 `options: IComboBoxOption[]` prop is mapped to children in v9
- Filtering is handled by authors by updating children
- The v9 Combobox allows users to type any text while the input is focused. The value is updated to a matching option (or none) when blurred, unless `freeform` is true. If you don't need typing support, use Dropdown.

### Property mapping

| v8 ComboBox              | v9 Combobox                                    |
| ------------------------ | ---------------------------------------------- |
| `options`                | `<Option>` children                            |
| `ariaLabel`              | Native `aria-*` props                          |
| `allowFreeInput`         | always true                                    |
| `allowFreeform`          | `freeform`                                     |
| `ariaDescribedBy`        | Native `aria-*` props                          |
| `autocomplete`           | not supported (yet)                            |
| `autofill`               | N/A                                            |
| `buttonIconProps`        | `expandIcon` slot                              |
| `calloutProps`           | `positioning` + `listbox`                      |
| `caretDownButtonStyles`  | `expandIcon` slot                              |
| `className`              | `className`                                    |
| `comboBoxOptionStyles`   | `<Option>` children                            |
| `componentRef`           | `ref`                                          |
| `defaultSelectedKeys`    | defaultSelectedOptions                         |
| `disabled`               | `disabled`                                     |
| `dropdownMaxWidth`       | `listbox` slot styles                          |
| `dropdownWidth`          | `listbox` slot styles                          |
| `errorMessage`           | Handled by Field                               |
| `getClassNames`          | `useComboboxStyles` hook                       |
| `iconButtonProps`        | `expandIcon` slot                              |
| `id`                     | `id`                                           |
| `isButtonAriaHidden`     | `expandIcon` slot, not recommended             |
| `label`                  | Handled by Field or Label                      |
| `multiSelect`            | `multiselect`                                  |
| `multiSelectDelimiter`   | controlled `value`                             |
| `onChange`               | `onOptionSelect`\*                             |
| `onDismiss`              | `onOpenChange`                                 |
| `onInputValueChange`     | `onChange`\*                                   |
| `onItemClick`            | `onClick` on child `<Option>`s                 |
| `onMenuDismiss`          | `onOpenChange`                                 |
| `onMenuDismissed`        |                                                |
| `onMenuOpen`             | `onOpenChange`                                 |
| `onPendingValueChanged`  |                                                |
| `onRenderContainer`      | `listbox` slot                                 |
| `onRenderLabel`          | Handled by Field                               |
| `onRenderItem`           | children                                       |
| `onRenderList`           | `listbox` slot                                 |
| `onRenderLowerContent`   | children                                       |
| `onRenderOption`         | `<Option>` children                            |
| `onRenderPlaceholder`    | `button` slot                                  |
| `onRenderTitle`          | `button` slot                                  |
| `onRenderUpperContent`   | children                                       |
| `onResolveOptions`       | N/A                                            |
| `onScrollToItem`         |                                                |
| `openOnKeyboardFocus`    | controlled `open`                              |
| `panelProps`             | N/A                                            |
| `persistMenu`            |                                                |
| `placeholder`            | `placeholder`                                  |
| `required`               | `required`                                     |
| `scrollSelectedToTop`    |                                                |
| `selectedKey(s)`         | `selectedOptions`                              |
| `shouldRestoreFocus`     |                                                |
| `styles`                 | `makeStyles` or HTML `style` prop              |
| `text`                   | `value`                                        |
| `useComboBoxAsMenuWidth` | default behavior, `listbox` styles to override |

\*In v9, any native HTML properties supported on an `<input>` element may be set on `<Combobox>`, including the `onChange` handler. Because of this, the v8 `onChange` selection callback has been updated to `onOptionSelect`. The v9 Combobox's `onChange` event behavior is the same as for an `<input>` element, or the v9 Input control.

## From v0 Dropdown

The v0 Dropdown should be replaced with the v9 Combobox if it allows typing with `search: true`, and by the v9 Dropdown if it does not. The most significant difference in moving to v9 is that the v0 Dropdown `items` are defined as child `<Option>`s of the v9 Combobox or Dropdown.

### Property mapping

| v0 Dropdown                   | v9 Dropdown & Combobox              |
| ----------------------------- | ----------------------------------- |
| `items`                       | `<Option>` children                 |
| `activeSelectedIndex`         | N/A                                 |
| `align`                       | `positioning`                       |
| `checkable`                   | `expandIcon`                        |
| `checkableIndicator`          | `expandIcon` children               |
| `className`                   | `className`                         |
| `clearIndicator`              | N/A                                 |
| `clearable`                   |                                     |
| `defaultActiveSelectedIndex`  | N/A                                 |
| `defaultActiveSelectedIndex`  |                                     |
| `defaultOpen`                 | `defaultOpen`                       |
| `defaultSearchQuery`          | `defaultValue`                      |
| `defaultValue`                | `defaultSelectedOptions`            |
| `disabled`                    | `disabled`                          |
| `error`                       | Handled by Field                    |
| `flipBoundary`                | `positioning`                       |
| `fluid`                       | custom styles                       |
| `getA11ySelectionMessage`     |                                     |
| `getA11yStatusMessage`        |                                     |
| `headerMessage`               | children                            |
| `highlightFirstItemOnOpen`    |                                     |
| `highlightedIndex`            |                                     |
| `inline`                      | custom styles                       |
| `inverted`                    | theme or styles                     |
| `itemToString`                | `<Option>` children or `text` prop  |
| `itemToValue`                 | `<Option>` children or `value` prop |
| `list`                        | `listbox`                           |
| `loading`                     | children                            |
| `loadingMessage`              |                                     |
| `moveFocusOnTab`              |                                     |
| `multiple`                    | `multiselect`                       |
| `noResultsMessage`            | children                            |
| `offset`                      | `positioning`                       |
| `onActiveSelectedIndexChange` |                                     |
| `onBlur`                      | `onBlur`                            |
| `onChange`                    | `onOptionSelect`\*                  |
| `onHighlightedIndexChange`    | `onActiveOptionChange`              |
| `onOpenChange`                | `onOpenChange`                      |
| `onSearchQueryChange`         | `onChange`\*                        |
| `open`                        | `open`                              |
| `overflowBoundary`            | `listbox` styles                    |
| `placeholder`                 | `placeholder`                       |
| `popperRef`                   | `listbox` slot's `ref`              |
| `position`                    | `positioning`                       |
| `positionFixed`               | `listbox` styles                    |
| `renderItem`                  | children                            |
| `renderSelectedItem`          | children or `<Option>` styles       |
| `search`                      | use Combobox instead of Dropdown    |
| `searchInput`                 | Combobox primary slot               |
| `searchQuery`                 | `value`                             |
| `styles`                      | `makeStyles` or HTML `style` prop   |
| `toggleIndicator`             | `expandIcon`                        |
| `triggerButton`               | Dropdown primary slot               |
| `value`                       | `selectedOptions`                   |
| `open`                        | `open`                              |

\*In v9, any native HTML properties supported on an `<input>` element may be set on `<Combobox>`, including the `onChange` handler. Because of this, the v0 `onChange` selection callback has been updated to `onOptionSelect`. The v9 Combobox's `onChange` event behavior is the same as for an `<input>` element, or the v9 Input control.
