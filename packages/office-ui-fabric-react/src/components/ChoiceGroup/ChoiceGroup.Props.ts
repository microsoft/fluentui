import * as React from 'react';
import { IIconProps } from '../../Icon';

export interface IChoiceGroup {

}

export interface IChoiceGroupProps extends React.HTMLProps<HTMLElement | HTMLInputElement> {
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

export interface IChoiceGroupOption {
  /**
   * A required key to uniquely identify the option.
   */
  key: string;

  /**
   * The text string for the option.
   */
  text: string;

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
   * Deprectated at 2.9.0 and will be removed after August 2017. Use 'selectedKey' or
   * 'defaultSelectedKey' on the ChoiceGroup instead.
   * @deprecated
   * @defaultvalue false
   */
  checked?: boolean;

  /**
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'checked' instead.
   * @deprecated
   */
  isChecked?: boolean;

  /**
   * Whether or not the option is disabled.
   */
  disabled?: boolean;

  // @todo: Update version numbers for depriate and removal
  /**
   * Deprecated at v0.52.0, to be removed at >= v1.0.0. Use 'disabled' instead.
   * @deprecated
   */
  isDisabled?: boolean;
}
