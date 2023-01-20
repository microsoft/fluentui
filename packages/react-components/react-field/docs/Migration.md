# Field Migration Guide

## Migration from v8

Migration from v8 will require picking between the normal and `Field` version of an input control, depending on whether the field-specific features are required: (`label`, `validationState="error"`, `validationMessage`, `hint`)

See individual input components for more detailed migration guides.

| v8 Control    | v9 Base control       | v9 Field control                | Notes                                                                                        |
| ------------- | --------------------- | ------------------------------- | -------------------------------------------------------------------------------------------- |
| `Checkbox`    | `Checkbox`            | `CheckboxField`                 | Only use `CheckboxField` if an error message is needed, or if required for layout in a form. |
| `ChoiceGroup` | `RadioGroup`          | `RadioGroupField`               |                                                                                              |
| `ComboBox`    | `Combobox`            | `ComboboxField`                 | `errorMessage="..."` is replaced by `validationState="error" validationMessage="..."`        |
| `Dropdown`    | `Dropdown`            | `DropdownField`                 | `errorMessage="..."` is replaced by `validationState="error" validationMessage="..."`        |
| `Slider`      | `Slider`              | `SliderField`                   |                                                                                              |
| `SpinButton`  | `SpinButton`          | `SpinButtonField`               |                                                                                              |
| `TextField`   | `Input` OR `Textarea` | `InputField` OR `TextareaField` | `errorMessage="..."` is replaced by `validationState="error" validationMessage="..."`        |
| `Toggle`      | `Switch`              | `SwitchField`                   |                                                                                              |

## Migration from v0

Many components in v0 have `Form___` versions (such as `FormInput`). Those are replaced by the `___Field` equivalent. See the underlying component's migration guides for more detailed migration information.

Component mapping:

- `FormButton` => Not supported
- `FormCheckbox` => `CheckboxField` OR `SwitchField`
- `FormDatepicker` => _(Not yet implemented)_
- `FormDropdown` => `DropdownField`
- `FormField` => Not supported
- `FormFieldCustom` => Not supported
- `FormLabel` => The `label` prop of the field component
- `FormMessage` => Either the `validationMessage` or `hint` prop of the field component
- `FormRadioGroup` => `RadioGroupField`
- `FormSlider` => `SliderField`
- `FormTextArea` => `TextareaField`

The following props are common to each of the `Form___` components:

- `label` => `label`
- `message` => either `validationMessage` or `hint`
- `errorMessage` => `validationMessage` with `validationState="error"`
