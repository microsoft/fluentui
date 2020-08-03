import * as React from 'react';
import { ITheme, IStyle } from '../../../Styling';
import { IRefObject } from '../../../Utilities';
import { IChoiceGroupOption } from '../../ChoiceGroup/ChoiceGroup.types';

/**
 * @deprecated Use `IChoiceGroupOptionProps['onFocus']` directly
 * {@docCategory ChoiceGroup}
 */
export type OnFocusCallback = IChoiceGroupOptionProps['onFocus'];

/**
 * @deprecated Use `IChoiceGroupOptionProps['onChange']` directly
 * {@docCategory ChoiceGroup}
 */
export type OnChangeCallback = IChoiceGroupOptionProps['onChange'];

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupOptionProps extends IChoiceGroupOption {
  /**
   * Optional callback to access the IChoiceGroup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IChoiceGroupOption>;

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChange?: (evt?: React.FormEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void;

  /**
   * A callback for receiving a notification when the choice has received focus.
   */
  onFocus?: (ev?: React.FocusEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void | undefined;

  /**
   * A callback for receiving a notification when the choice has lost focus.
   */
  onBlur?: (ev: React.FocusEvent<HTMLElement>, props?: IChoiceGroupOption) => void;

  /**
   * Indicates if the ChoiceGroupOption should appear focused, visually
   */
  focused?: boolean;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * If true, it specifies that an option must be selected in the ChoiceGroup before submitting the form
   */
  required?: boolean;

  /**
   * This value is used to group each ChoiceGroupOption into the same logical ChoiceGroup
   */
  name?: string;
}

/**
 * Defines props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupOptionStyleProps {
  /** Theme provided by High-Order Component. */
  theme: ITheme;

  /** Whether the option has an icon. */
  hasIcon?: boolean;

  /** Whether the option icon is an image. */
  hasImage?: boolean;

  /** Whether the option is checked or not. */
  checked?: boolean;

  /** Whether the option is disabled or not. */
  disabled?: boolean;

  /** Whether the image width or height are higher than `71`. */
  imageIsLarge?: boolean;

  /**
   * Image sizes used when `hasImage` or `hasIcon` style props are enabled.
   * @defaultvalue \{height: 32, width: 32\}
   */
  imageSize?: { height: number; width: number };

  /** Whether the option is in focus or not. */
  focused?: boolean;
}

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupOptionStyles {
  root?: IStyle;
  choiceFieldWrapper?: IStyle;
  input?: IStyle;
  field?: IStyle;
  innerField?: IStyle;
  imageWrapper?: IStyle;
  selectedImageWrapper?: IStyle;
  iconWrapper?: IStyle;
  labelWrapper?: IStyle;
}
