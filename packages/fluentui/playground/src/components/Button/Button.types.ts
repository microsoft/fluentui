import { IClasses, ISlotProps, ISlottableProps } from '@fluentui/react-theming';

export interface IButtonSlots {
  /** Intended to contain the icon that appears after the specified children. */
  endIcon: React.ReactType;

  /** Intended to contain the button. */
  root: React.ReactType;

  /** Intended to contain the icon that appears before the specified children. */
  startIcon: React.ReactType;
}

export type IButtonSlotProps = ISlotProps<IButtonSlots>;

export interface IButtonClasses extends IClasses<IButtonSlots> {}

export interface IButtonProps extends ISlottableProps<IButtonSlots, IButtonClasses> {
  /** Defines the children of the Button component. */
  children?: React.ReactNode;

  /** Defines whether the Button is in an enabled or disabled state. */
  disabled?: boolean;

  /** Defines an href that, if provided, will make the Button render as an anchor. */
  href?: string;

  /** Defines a callback that is triggered when the Button is clicked. */
  onClick?: (ev: MouseEvent) => void;
}
