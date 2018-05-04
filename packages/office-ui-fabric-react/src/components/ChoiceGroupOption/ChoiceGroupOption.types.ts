import * as React from 'react';
import { IIconProps } from '../../Icon';
import { ITheme, IStyle } from '../../Styling';
import { IRenderFunction, IStyleFunction } from '../../Utilities';
import { IChoiceGroupOption } from '../ChoiceGroup/ChoiceGroup.types';


export type OnFocusCallback = (ev?: React.FocusEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void | undefined;
export type OnChangeCallback = (evt?: React.FormEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void;

export interface IChoiceGroupOptionProps
  extends IChoiceGroupOption {

  /**
   * A required key to uniquely identify the option.
   */
  key: string;

  /**
   * Optional callback to access the IChoiceGroup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChoiceGroupOption) => void;

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
  onRenderLabel?: (props: IChoiceGroupOption) => JSX.Element;

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
  onBlur?: (
    ev: React.FocusEvent<HTMLElement>,
    props?: IChoiceGroupOption
  ) => void;

  /**
   * The Icon component props for choice field
   */
  iconProps?: IIconProps;

  /**
   * The src of image for choice field.
   */
  imageSrc?: string;

  /**
   * The alt of image for choice field. Defaults to '' if not set.
   */
  imageAlt?: string;

  /**
   * The src of image for choice field which is selected.
   */
  selectedImageSrc?: string;

  /**
   * The width and height of the image in px for choice field.
   * @default { width: 32, height: 32 }
   */
  imageSize?: { width: number; height: number };

  /**
   * Whether or not the option is disabled.
   */
  disabled?: boolean;

  /**
   * This value is maintained by the component and is accessible during onRenderField
   */
  checked?: boolean;

  /**
   *
   */
  focused?: boolean;

  /**
   * This value is maintained by the component and is accessible during onRenderField
   */
  id?: string;

  /**
   * This value is maintained by the component and is accessible during onRenderField
   */
  labelId?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layeron top of the variant rules.
   */
  getStyles?: IStyleFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>;

  required?: boolean;
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
