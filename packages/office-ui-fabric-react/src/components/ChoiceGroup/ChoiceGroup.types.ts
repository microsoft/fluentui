import * as React from 'react';

import { IIconProps } from '../../Icon';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption/ChoiceGroupOption.types';

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
  // TODO (Fabric 8?): defaultSelectedKey/selectedKey allow numbers but IChoiceGroupOption doesn't.
  // This should be consistent one way or the other everywhere.
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

/**
 * {@docCategory ChoiceGroup}
 */
export interface IChoiceGroupOption extends React.InputHTMLAttributes<HTMLElement | HTMLInputElement> {
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
   * @deprecated Do not track checked state in the options themselves. Instead, either pass
   * `defaultSelectedKey` to the `ChoiceGroup` and allow it to track selection state internally
   * (uncontrolled), or pass `selectedKey` and `onChange` to the `ChoiceGroup` to track/update
   * the selection state manually (controlled).
   */
  // This should move from IChoiceGroupOption to IChoiceGroupOptionProps, so that the ChoiceGroup
  // can still set the option as checked for rendering purposes
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
  /**
   * The actual root of the component.
   * @deprecated Styles will be merged with `root` in a future release.
   */
  applicationRole?: IStyle;
  /**
   * Not currently the actual root of the component (will be fixed in a future release).
   * For now, to style the actual root, use `applicationRole`.
   */
  root?: IStyle;
  label?: IStyle;
  flexContainer?: IStyle;
}
