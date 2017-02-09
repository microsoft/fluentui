import * as React from 'react';

export interface IChoiceGroupProps extends React.HTMLProps<HTMLElement> {
  /**
   * The options for the choice group.
   */
  options: IChoiceGroupOption[];

  /**
   * @deprecated
   * Deprecated and will be removed by 07/17/2017 Use 'onChange' instead.
   */
  onChanged?: (option: IChoiceGroupOption, evt?: React.FormEvent<HTMLInputElement>) => void;

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChange?: (ev?: React.FormEvent<HTMLInputElement>, option?: IChoiceGroupOption) => void;

  /**
   * Descriptive label for the choice group.
   */
  label?: string;
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
   * Whether or not this menu item is currently checked.
   * @defaultvalue false
   */
  checked?: boolean;

  /**
   * @deprecated
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'checked' instead.
   */
  isChecked?: boolean;

  /**
   * Whether or not the option is disabled.
   */
  disabled?: boolean;

  // @todo: Update version numbers for depriate and removal
  /**
   * @deprecated
   * Deprecated at v0.52.0, to be removed at >= v1.0.0. Use 'disabled' instead.
   */
  isDisabled?: boolean;
}
