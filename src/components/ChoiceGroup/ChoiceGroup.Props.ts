import * as React from 'react';

export interface IChoiceGroupProps extends React.HTMLProps<HTMLElement> {
  /**
   * The options for the choice group.
   */
  options: IChoiceGroupOption[];

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChanged?: (option: IChoiceGroupOption, evt?: React.SyntheticEvent) => void;

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
   * Whether the options is checked or not.
   * @defaultvalue false
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
