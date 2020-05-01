import { IClasses, ISlotProps, ISlottableProps } from '@fluentui/react-theming';

export interface ICheckboxSlots {
  /** Intended to contain the Checkbox. */
  root: React.ReactType;

  /** Custom icon that defines the checkmark rendered by the checkbox. */
  icon: React.ReactType;

  /**  The input element that represents the actual checkbox. */
  input: React.ReactType;
}

export type ICheckboxSlotProps = ISlotProps<ICheckboxSlots>;

export interface ICheckboxClasses extends IClasses<ICheckboxSlots> {}

export interface ICheckboxProps extends ISlottableProps<ICheckboxSlotProps, ICheckboxClasses> {
  /** Defines whether default value of the checkbox is checked or unchecked. (Controlled) */
  checked?: boolean;

  /** Defines the children of the Checkbox component. */
  children?: React.ReactNode;

  /** Defines the default value of the checkbox for uncontrolled scenarios. */
  defaultChecked?: boolean;

  /** Defines whether the Checkbox is in an enabled or disabled state. */
  disabled?: boolean;

  /** Defines a callback that is triggered when the Checkbox is toggled. */
  onChange?: (ev: MouseEvent, checked: boolean) => void;
}
