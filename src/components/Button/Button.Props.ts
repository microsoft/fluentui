import * as React from 'react';
import { Button } from './Button';

export interface IButtonProps extends React.Props<Button> {
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
  onClick?: React.MouseEventHandler;

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
   * If provided, HTMLProps which will be mixed in onto the root element emitted by this component, before
   * other props are applied. This allows you to extend the root element with additional attributes, such as
   * data-automation-id needed for automation.
   *
   * The root element will either be a button or an anchor, depending on what value is specified for
   * the elementType prop.
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