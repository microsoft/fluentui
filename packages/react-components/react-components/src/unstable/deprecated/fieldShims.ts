/* eslint-disable deprecation/deprecation */
import { Checkbox, CheckboxProps } from '@fluentui/react-checkbox';
import { Combobox, ComboboxProps } from '@fluentui/react-combobox';
import { Input, InputProps } from '@fluentui/react-input';
import { ProgressBar, ProgressBarProps } from '@fluentui/react-progress';
import { RadioGroup, RadioGroupProps } from '@fluentui/react-radio';
import { Select, SelectProps } from '@fluentui/react-select';
import { Slider, SliderProps } from '@fluentui/react-slider';
import { SpinButton, SpinButtonProps } from '@fluentui/react-spinbutton';
import { Switch, SwitchProps } from '@fluentui/react-switch';
import { Textarea, TextareaProps } from '@fluentui/react-textarea';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { FieldShimProps, makeFieldShim } from './makeFieldShim';

// This file contains shims for the old [Component]Field components that were removed
// and replaced by the standalone Field component.
// These components are deprecated and will be removed in a future release.

/** @deprecated Use Field with Combobox: `<Field><Combobox /></Field>` */
export const ComboboxField: ForwardRefComponent<ComboboxFieldProps> = makeFieldShim(Combobox);
export type ComboboxFieldProps = FieldShimProps<ComboboxProps>;

/** @deprecated Use Field with Input: `<Field><Input /></Field>` */
export const InputField: ForwardRefComponent<InputFieldProps> = makeFieldShim(Input);
export type InputFieldProps = FieldShimProps<InputProps>;

/** @deprecated Use Field with RadioGroup: `<Field><RadioGroup /></Field>` */
export const RadioGroupField: ForwardRefComponent<RadioGroupFieldProps> = makeFieldShim(RadioGroup);
export type RadioGroupFieldProps = FieldShimProps<RadioGroupProps>;

/** @deprecated Use Field with Select: `<Field><Select /></Field>` */
export const SelectField: ForwardRefComponent<SelectFieldProps> = makeFieldShim(Select);
export type SelectFieldProps = FieldShimProps<SelectProps>;

/** @deprecated Use Field with Slider: `<Field><Slider /></Field>` */
export const SliderField: ForwardRefComponent<SliderFieldProps> = makeFieldShim(Slider);
export type SliderFieldProps = FieldShimProps<SliderProps>;

/** @deprecated Use Field with SpinButton: `<Field><SpinButton /></Field>` */
export const SpinButtonField: ForwardRefComponent<SpinButtonFieldProps> = makeFieldShim(SpinButton);
export type SpinButtonFieldProps = FieldShimProps<SpinButtonProps>;

/** @deprecated Use Field with Switch: `<Field><Switch /></Field>` */
export const SwitchField: ForwardRefComponent<SwitchFieldProps> = makeFieldShim(Switch);
export type SwitchFieldProps = FieldShimProps<SwitchProps>;

/** @deprecated Use Field with Textarea: `<Field><Textarea /></Field>` */
export const TextareaField: ForwardRefComponent<TextareaFieldProps> = makeFieldShim(Textarea);
export type TextareaFieldProps = FieldShimProps<TextareaProps>;

/** @deprecated Use Field with Checkbox: `<Field><Checkbox /></Field>` */
export const CheckboxField: ForwardRefComponent<CheckboxFieldProps> = makeFieldShim(Checkbox, {
  mapProps: (props: CheckboxFieldProps) => ({
    ...props,
    control: { ...props.control, label: props.label, required: props.required },
    label: props.fieldLabel,
    required: undefined,
  }),
});
export type CheckboxFieldProps = Omit<FieldShimProps<CheckboxProps>, 'label'> & {
  label?: CheckboxProps['label'];
  fieldLabel?: FieldShimProps<CheckboxProps>['label'];
};

/** @deprecated Use Field with ProgressBar: `<Field><ProgressBar /></Field>` */
export const ProgressField: ForwardRefComponent<ProgressFieldProps> = makeFieldShim(ProgressBar, {
  mapProps: (props: ProgressFieldProps) => ({
    ...props,
    control: { ...props.control, validationState: props.validationState },
  }),
  displayName: 'ProgressField',
});
export type ProgressFieldProps = FieldShimProps<ProgressBarProps>;
