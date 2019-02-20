import * as React from 'react';

import { IIconProps } from '../../Icon';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption/ChoiceGroupOption.types';

export interface IChoiceGroup {
  /**
   * Gets the current checked option.
   */
  checkedOption: IChoiceGroupOption | undefined;

  /**
   * Sets focus to the choiceGroup.
   */
  focus: () => void;
}

export interface IChoiceGroupProps extends React.InputHTMLAttributes<HTMLElement | HTMLInputElement> {
  /**
   * Optional callback to access the IChoiceGroup interface. Use this instead of ref for accessing
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
   * Deprecated and will be removed by 07/17/2017. Use `onChange` instead.
   * @deprecated Use `onChange` instead.
   */
  onChanged?: (option: IChoiceGroupOption, evt?: React.FormEvent<HTMLElement | HTMLInputElement>) => void;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>;

  /**
   * Aria labelled by prop for the ChoiceGroup itself
   */
  ariaLabelledBy?: string;
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
   * Optional override of label render
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
   * The alt of image for choice field. Defaults to '' if not set.
   */
  imageAlt?: string;

  /**
   * The src of image for choice field which is selected.
   */
  selectedImageSrc?: string;

  /**
   * The width and height of the image in px for choice field.
   * @defaultvalue \{ width: 32, height: 32 \}
   */
  imageSize?: { width: number; height: number };

  /**
   * Whether or not the option is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not the option is checked.
   */
  checked?: boolean;

  /**
   * DOM id to tag the ChoiceGroup input with, for reference.
   * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
   */
  id?: string;

  /**
   * DOM id to tag the ChoiceGroup label with, for reference.
   * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
   */
  labelId?: string;

  /**
   * The aria label of the ChoiceGroupOption for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>;
}

export interface IChoiceGroupStyleProps {
  theme: ITheme;
  className?: string;
  optionsContainIconOrImage?: boolean;
}

export interface IChoiceGroupStyles {
  applicationRole?: IStyle;
  root?: IStyle;
  label?: IStyle;
  flexContainer?: IStyle;
}
