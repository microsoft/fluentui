import * as React from 'react';
import { ButtonBase } from './Button.base';
import { IRenderFunction } from '../../../Utilities';
import { IIconProps } from '../../../Icon';
import { IStyleFunction } from '../../../Utilities';
import {
  IStyle,
  ITheme
} from '../../../Styling';

export interface IButtonBase {
  /**
   * Sets focus to the button.
   */
  focus: () => void;
}

export interface IButtonBaseProps extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | ButtonBase> {
  /**
   * Optional callback to access the IButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IButtonBase) => void;

  /**
   * If provided, this component will be rendered as an anchor.
   * @default ElementType.anchor
   */
  href?: string;

  /**
   * Changes the visual presentation of the button to be emphasized (if defined)
   * @default false
   */
  primary?: boolean;

  /**
   * Unique id to identify the item. Typically a duplicate of key value.
   */
  uniqueId?: string | number;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Whether the button is checked
   */
  checked?: boolean;

  /**
   * Whether the button is expanded. Typically this is when a connected menu is open.
   */
  expanded?: boolean;

  /**
   * If provided, additional class name to provide on the root element.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  ariaDescription?: string;

  /**
   * If provided and is true it adds an 'aria-hidden' attribute instructing screen readers to ignore the element.
   */
  ariaHidden?: boolean;

  /**
  * Text to render button label. If text is supplied, it will override any string in button children. Other children components will be passed through after the text.
  */
  text?: string;

  /**
   * Description of the action this button takes.
   */
  description?: string;

  /**
   * A unique ID to identify the label of the component. Useful when combined with aria-LabelledBy.
   */
  labelId?: string;

  /**
   * A unique ID to identify the description of the component. Useful when combined with aria-describedBy.
   */
  descriptionId?: string;

  /**
   * A unique ID to identify the ariaDescription of the component. Useful when combined with ariaDescription.
  */
  ariaDescriptionId?: string;

  /**
   * The props for the icon shown in the button.
   */
  iconProps?: IIconProps;

  /**
   * The props for the icon shown when providing a menu dropdown.
   */
  menuIconProps?: IIconProps;

  /**
   * Custom render function for the icon
   */
  onRenderIcon?: IRenderFunction<IButtonBaseProps>;

  /**
   * Custom render function for the label text.
   */
  onRenderText?: IRenderFunction<IButtonBaseProps>;

  /**
   * Custom render function for the desciption text.
   */
  onRenderDescription?: IRenderFunction<IButtonBaseProps>;

  /**
   * Custom render function for the aria description element.
   */
  onRenderAriaDescription?: IRenderFunction<IButtonBaseProps>;

  /**
   * Custom render function for rendering the button children.
   */
  onRenderChildren?: IRenderFunction<IButtonBaseProps>;

  /**
  * Custom render function for prefix
  */
  onRenderPrefix?: () => JSX.Element | null;

  /**
  * Custom render function for suffix
  */
  onRenderSuffix?: () => JSX.Element | null;

  /**
   * Custom render function for button menu icon
   */
  onRenderMenuIcon?: IRenderFunction<IButtonBaseProps>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IButtonBaseStyleProps, IButtonBaseStyles>;

}

export interface IButtonBaseStyles {
  root?: IStyle;
  button?: IStyle;
  textContainer?: IStyle;
  icon?: IStyle;
  label?: IStyle;
  menuIcon?: IStyle;
  description?: IStyle;
}

export interface IButtonBaseStyleProps {
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  expanded?: boolean;
  primary?: boolean;
}