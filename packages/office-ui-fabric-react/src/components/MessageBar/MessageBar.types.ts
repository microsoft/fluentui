import * as React from 'react';
import { BaseButton, Button } from '../../Button';
import { ITheme, IStyle } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IMessageBar {}

export interface IMessageBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IMessageBar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IMessageBar>;

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
   * @deprecated Use native prop `aria-label` instead.
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

  /**
   * Additional CSS class(es) to apply to the MessageBar.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
}

export interface IMessageBarStyleProps {
  /**
   * Theme (provided through customization).
   */
  theme: ITheme;

  /**
   * Additional CSS class(es).
   */
  className?: string;

  /**
   * Type of the MessageBar.
   */
  messageBarType?: MessageBarType;

  /**
   * Whether the MessageBar contains a dismiss button.
   */
  onDismiss?: boolean;

  /**
   * Whether the text is truncated.
   */
  truncated?: boolean;

  /**
   * Whether the MessageBar is rendered in multi line (as opposed to single line) mode.
   */
  isMultiline?: boolean;

  /**
   * Whether the single line MessageBar is being expanded.
   */
  expandSingleLine?: boolean;

  /**
   * Whether the MessageBar contains any action elements.
   */
  actions?: boolean;
}

export interface IMessageBarStyles {
  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the element containing the icon, text, and optional dismiss button.
   */
  content?: IStyle;

  /**
   * Style set for the element containing the icon.
   */
  iconContainer?: IStyle;

  /**
   * Style set for the icon.
   */
  icon?: IStyle;

  /**
   * Style set for the element containing the text.
   */
  text?: IStyle;

  /**
   * Style set for the text.
   */
  innerText?: IStyle;

  /**
   * Style set for the optional dismiss button.
   */
  dismissal?: IStyle;

  /**
   * Style set for the icon used to expand and collapse the MessageBar.
   */
  expand?: IStyle;

  /**
   * Style set for the element containing the dismiss button.
   */
  dismissSingleLine?: IStyle;

  /**
   * Style set for the element containing the expand icon.
   */
  expandSingleLine?: IStyle;

  /**
   * Style set for the optional element containing the action elements.
   */
  actions?: IStyle;
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
   * Deprecated at v0.48.0, to be removed at \>= v1.0.0. Use `blocked` instead.
   * @deprecated Use `blocked` instead.
   */
  remove = 90000
}
