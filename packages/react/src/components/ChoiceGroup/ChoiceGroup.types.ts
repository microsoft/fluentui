import * as React from 'react';
import type { IIconProps } from '../../Icon';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import type {
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles,
  IChoiceGroupOptionProps,
} from './ChoiceGroupOption/ChoiceGroupOption.types';

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroup {
  /**
   * Gets the current checked option.
   */
  checkedOption: IChoiceGroupOption | undefined;

  /**
   * Sets focus to the checked option or the first enabled option in the ChoiceGroup.
   */
  focus: () => void;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupProps
  extends React.InputHTMLAttributes<HTMLElement | HTMLInputElement>,
    React.RefAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the `IChoiceGroup` interface. Use this instead of `ref` for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IChoiceGroup>;

  /**
   * The options for the choice group.
   */
  options?: IChoiceGroupOption[];

  /**
   * The key of the option that will be initially checked.
   */
  // TODO (Fabric 8?): defaultSelectedKey/selectedKey allow numbers but IChoiceGroupOption doesn't.
  // This should be consistent one way or the other everywhere.
  defaultSelectedKey?: string | number;

  /**
   * The key of the selected option. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   */
  selectedKey?: string | number | null;

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;

  /**
   * Descriptive label for the choice group.
   */
  label?: string;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>;

  /**
   * ID of an element to use as the aria label for this ChoiceGroup.
   */
  ariaLabelledBy?: string;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupOption extends Omit<React.InputHTMLAttributes<HTMLElement | HTMLInputElement>, 'checked'> {
  /**
   * A required key to uniquely identify the option.
   */
  key: string;

  /**
   * The text string for the option.
   */
  text: string;

  /**
   * Used to customize option rendering.
   */
  onRenderField?: IRenderFunction<IChoiceGroupOption & IChoiceGroupOptionProps>;

  /**
   * Used to customize label rendering.
   */
  onRenderLabel?: IRenderFunction<IChoiceGroupOption & IChoiceGroupOptionProps>;

  /**
   * Props for an icon to display with this option.
   */
  iconProps?: IIconProps;

  /**
   * Image to display with this option.
   */
  imageSrc?: string;

  /**
   * Alt text if the option is an image.
   * @default `''` (empty string)
   */
  imageAlt?: string;

  /**
   * The src of image for choice field which is selected.
   */
  selectedImageSrc?: string;

  /**
   * The width and height of the image in px for choice field.
   * @defaultvalue `{ width: 32, height: 32 }`
   */
  imageSize?: { width: number; height: number };

  /**
   * Whether or not the option is disabled.
   */
  disabled?: boolean;

  /**
   * ID used on the option's input element.
   */
  id?: string;

  /**
   * ID used on the option's label.
   */
  labelId?: string;

  /**
   * Aria label of the option for the benefit of screen reader users.
   */
  ariaLabel?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupStyleProps {
  theme: ITheme;
  className?: string;
  optionsContainIconOrImage?: boolean;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupStyles {
  root?: IStyle;
  label?: IStyle;
  flexContainer?: IStyle;
}
