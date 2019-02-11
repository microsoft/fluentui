import * as React from 'react';
import { ITheme, IStyle } from '../../../Styling';
import { IRefObject } from '../../../Utilities';
import { IChoiceGroupOption } from '../../ChoiceGroup/ChoiceGroup.types';

export type OnFocusCallback = (ev?: React.FocusEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void | undefined;
export type OnChangeCallback = (evt?: React.FormEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void;

export interface IChoiceGroupOptionProps extends IChoiceGroupOption {
  /**
   * Optional callback to access the IChoiceGroup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IChoiceGroupOption>;

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChange?: OnChangeCallback;

  /**
   * A callback for receiving a notification when the choice has received focus.
   */
  onFocus?: OnFocusCallback;

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

export interface IChoiceGroupOptionStyleProps {
  theme: ITheme;
  hasIcon?: boolean;
  hasImage?: boolean;
  checked?: boolean;
  disabled?: boolean;
  imageIsLarge?: boolean;
  focused?: boolean;
}

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
