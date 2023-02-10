import * as React from 'react';
import type { ITheme, IStyle } from '../../../Styling';
import type { IRefObject } from '../../../Utilities';
import type { IChoiceGroupOption } from '../ChoiceGroup.types';

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupOptionProps extends Omit<IChoiceGroupOption, 'key'> {
  /**
   * @deprecated Not used.
   */
  componentRef?: IRefObject<IChoiceGroupOption>;

  /**
   * Unique key for the option, set based on `IChoiceGroupOption.key`.
   */
  itemKey: string;

  /**
   * The option key. This will always be provided for callbacks (copied from `itemKey`) but is
   * optional when manually creating ChoiceGroupOptions.
   */
  key?: string;

  /**
   * Whether or not the option is checked. Set by `ChoiceGroup` based on `selectedKey` or
   * `defaultSelectedKey` from `IChoiceGroupProps`.
   */
  checked?: boolean;

  /**
   * Callback for the ChoiceGroup creating the option to be notified when the choice has been changed.
   */
  onChange?: (
    evt?: React.FormEvent<HTMLElement | HTMLInputElement>,
    props?: IChoiceGroupOption & IChoiceGroupOptionProps,
  ) => void;

  /**
   * Callback for the ChoiceGroup creating the option to be notified when the choice has received focus.
   */
  onFocus?: (
    ev?: React.FocusEvent<HTMLElement | HTMLInputElement>,
    props?: IChoiceGroupOption & IChoiceGroupOptionProps,
  ) => void | undefined;

  /**
   * Callback for the ChoiceGroup creating the option to be notified when the choice has lost focus.
   */
  onBlur?: (ev?: React.FocusEvent<HTMLElement>, props?: IChoiceGroupOption & IChoiceGroupOptionProps) => void;

  /**
   * Indicates if the ChoiceGroupOption should appear focused, visually
   */
  focused?: boolean;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * If true, an option must be selected in the ChoiceGroup.
   */
  required?: boolean;

  /**
   * This value is used to group each ChoiceGroupOption into the same logical ChoiceGroup
   */
  name?: string;
}

/**
 * Defines props needed to construct styles.
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
   * @defaultvalue `{ height: 32, width: 32 }`
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
