import * as React from 'react';
import { BaseButton, Button } from '../../Button';

export interface IMessageBar {

}

export interface IMessageBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IMessageBar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IMessageBar | null) => void;

  /**
   * The type of MessageBar to render.
   * @defaultvalue MessageBarType.info
   */
  messageBarType?: MessageBarType;

  /**
   * The actions you want to show on the other side.
   */
  actions?: JSX.Element;

  /**
   * A description of the message bar for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Whether the message bar has a dismiss button and its callback.
   * If null, we don't show a dismiss button.
   * @defaultvalue null
   */
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement | BaseButton | HTMLAnchorElement | HTMLDivElement | Button>) => any;

  /**
   * Determines if the message bar is multi lined.
   * If false, and the text overflows over buttons or to another line, it is clipped.
   * @defaultvalue true
   */
  isMultiline?: boolean;

  /**
  * Aria label on dismiss button if onDismiss is defined.
  */
  dismissButtonAriaLabel?: string;

  /**
  * Determines if the message bar text is truncated.
  * If true, a button will render to toggle between a single line view and multiline view.
  * This prop is for single line message bars with no buttons only in a limited space scenario.
  * @defaultvalue false
  */
  truncated?: boolean;

  /**
  * Aria label on overflow button if truncated is defined.
  */
  overflowButtonAriaLabel?: string;
}

export enum MessageBarType {
  /** Info styled MessageBar */
  info = 0,
  /** Error styled MessageBar */
  error = 1,
  /** Blocked styled MessageBar */
  blocked = 2,
  /** SevereWarning styled MessageBar */
  severeWarning = 3,
  /** Success styled MessageBar */
  success = 4,
  /** Warning styled MessageBar */
  warning = 5,
  /**
   * Deprecated at v0.48.0, to be removed at >= v1.0.0. Use 'blocked' instead.
   * @deprecated
   */
  remove = 90000
}
