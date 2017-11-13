import * as React from 'react';
import { IIconProps } from '../../Icon';
import { IRenderFunction } from '../../Utilities';

export interface IChoiceGroup {

}

export interface IChoiceGroupProps extends React.InputHTMLAttributes<HTMLElement | HTMLInputElement> {
  /**
   * Optional callback to access the IChoiceGroup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChoiceGroup) => void;

  /**
   * The options for the choice group.
   */
  options?: IChoiceGroupOption[];

  /**
   * The key of the option that will be initially checked.
   */
  defaultSelectedKey?: string | number;

  /**
   * The key of the selected option. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   */
  selectedKey?: string | number;

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;

  /**
   * Descriptive label for the choice group.
   */
  label?: string;

  /**
   * Deprecated and will be removed by 07/17/2017 Use 'onChange' instead.
   * @deprecated
   */
  onChanged?: (option: IChoiceGroupOption, evt?: React.FormEvent<HTMLElement | HTMLInputElement>) => void;
}

export interface IChoiceGroupOption extends React.HTMLAttributes<HTMLElement | HTMLInputElement> {
  /**
   * A required key to uniquely identify the option.
   */
  key: string;

  /**
   * The text string for the option.
   */
  text: string;

  /**
   * Optional override of option render
   */
  onRenderField?: IRenderFunction<IChoiceGroupOption>;

  /**
   * Optional override of option render
   */
  onRenderLabel?: (option: IChoiceGroupOption) => JSX.Element;

  /**
   * The Icon component props for choice field
   */
  iconProps?: IIconProps;

  /**
   * The src of image for choice field.
   */
  imageSrc?: string;

  /**
   * The src of image for choice field which is selected.
   */
  selectedImageSrc?: string;

  /**
   * The width and height of the image in px for choice field.
   */
  imageSize?: { width: number, height: number };

  /**
   * Whether or not the option is disabled.
   */
  disabled?: boolean;

  /**
   * This value is maintained by the component and is accessible during onRenderField
   */
  checked?: boolean;

  /**
   * This value is maintained by the component and is accessible during onRenderField
   */
  id?: string;

  /**
   * This value is maintained by the component and is accessible during onRenderField
   */
  labelId?: string;
}
