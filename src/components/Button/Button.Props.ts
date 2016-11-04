import * as React from 'react';
import { Button } from './Button';

export interface IButton {
  /**
   * Focuses the button.
   */
  focus();
}

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement | Button> {
  /**
   * If provided, this component will be rendered as an anchor.
   * @default ElementType.anchor
   */
  href?: string;

  /**
   * The type of button to render.
   * @defaultvalue ButtonType.normal
   */
  buttonType?: ButtonType;

  /**
   * The button icon shown in command or hero type.
   */
  icon?: string;

  /**
   * Description of the action this button takes.
   * Only used for compound buttons
   */
  description?: string;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * If provided, additional class name to provide on the root element.
   */
  className?: string;

  /**
   * Event handler for click event.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | Button>;

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
   * @deprecated
   * Deprecated at v0.56.2, to be removed at >= v1.0.0. Just pass in button props instead;
   * they will be mixed into the button/anchor element rendered by the component.
   */
  rootProps?: React.HTMLProps<HTMLButtonElement> | React.HTMLProps<HTMLAnchorElement>;
}

export enum ElementType {
  /** <button> element. */
  button,
  /** <a> element. */
  anchor
}

export enum ButtonType {
  normal,
  primary,
  hero,
  compound,
  command,
  icon
}