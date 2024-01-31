import * as React from 'react';
import { BaseButton, Button, IButtonProps } from '../../Button';
import type { ITheme, IStyle } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { IIconProps } from '../../Icon';

/**
 * {@docCategory MessageBar}
 */
export interface IMessageBar {}

/**
 * {@docCategory MessageBar}
 */
export interface IMessageBarProps extends React.HTMLAttributes<HTMLElement>, React.RefAttributes<HTMLDivElement> {
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
  // eslint-disable-next-line deprecation/deprecation
  onDismiss?: (ev?: React.MouseEvent<HTMLElement | BaseButton | Button>) => any;

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
   * @deprecated Use `expandButtonProps` instead.
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

  /**
   * Custom icon prop to replace the dismiss icon.
   * If unset, default will be the Fabric Clear icon.
   */
  dismissIconProps?: IIconProps;

  /**
   * Custom icon prop to replace the message bar icon.
   * If unset, default will be the icon set by messageBarType.
   */
  messageBarIconProps?: IIconProps;

  /**
   *  Button props that can be applied to the expand button of the MessageBar.
   */
  expandButtonProps?: IButtonProps;

  /**
   * Callback to execute when expand button is toggled
   * @returns
   */
  onExpandButtonToggled?: (expandSingleLine: boolean) => void;

  /**
   * Custom role to apply to the MessageBar.
   * @defaultvalue `alert` if `messageBarType` is `error`, `blocked`, or `severeWarning`;
   * or `status` otherwise
   */
  role?: 'alert' | 'status' | 'none';

  /**
   * By default, MessageBar delay-renders its content within an internal live region to help ensure
   * it's announced by screen readers. You can disable that behavior by setting this prop to `false`.
   *
   * If you set this prop to `false`, to ensure proper announcement you should either:
   * - If appropriate, ensure that the `role` prop is set to `alert` (this will be done by default
   *   if `messageBarType` is `error`, `blocked`, or `severeWarning`), OR
   * - Set the `role` prop to `none` (to avoid nested `status` regions), wrap the whole MessageBar
   *   in a `<div role="status">` which is always rendered, and ensure that the MessageBar is
   *   rendered either conditionally or with a delay.
   * @default true
   */
  delayedRender?: boolean;
}

/**
 * {@docCategory MessageBar}
 */
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

/**
 * {@docCategory MessageBar}
 */
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

/**
 * {@docCategory MessageBar}
 */
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
}
