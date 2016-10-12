import * as React from 'react';

export interface IMessageBarProps extends React.HTMLProps<HTMLElement> {

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
  onDismiss?: (ev?: React.MouseEvent) => any;

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
}

export enum MessageBarType {
  /** Info styled MessageBar */
  info,
  /** Error styled MessageBar */
  error,
  /** Blocked styled MessageBar */
  blocked,
  /** SevereWarning styled MessageBar */
  severeWarning,
  /** Success styled MessageBar */
  success,
  /** Warning styled MessageBar */
  warning,
  /**
   * @deprecated
   * Deprecated at v0.48.0, to be removed at >= v1.0.0. Use 'blocked' instead.
   */
  remove
}
