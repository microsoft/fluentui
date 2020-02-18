import { IClasses, ISlotProps, ISlottableProps } from '@fluentui/react-theming';

export interface ILinkSlots {
  /** Intended to contain the link. */
  root: React.ReactType;
}

export type ILinkSlotProps = ISlotProps<ILinkSlots>;

export interface ILinkClasses extends IClasses<ILinkSlots> {
  /** Defines the classname that is passed to the root when the Link is disabled. */
  rootDisabled: string;
}

export interface ILinkProps extends ISlottableProps<ILinkSlots, ILinkClasses> {
  /** Defines the children of the Link component. */
  children?: React.ReactNode;

  /** Defines whether the Link is in an enabled or disabled state. */
  disabled?: boolean;

  /** Defines an href that serves as the navigation destination when clicking on the Link. */
  href?: string;
}
