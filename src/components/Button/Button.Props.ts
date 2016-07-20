import * as React from 'react';

export interface IButtonProps extends React.HTMLProps<HTMLElement> {
  /**
   * The type of the element to render.
   * @default ElementType.anchor
   */
  elementType?: ElementType;

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
   * The aria label of the button for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  ariaDescription?: string;
}

export enum ElementType {
  /** <button> element */
  button,
  /** <a> element */
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
