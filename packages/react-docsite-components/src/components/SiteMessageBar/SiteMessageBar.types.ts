import { IStyleFunctionOrObject } from '@fluentui/react';
import { IMessageBarStyles, IMessageBarStyleProps } from '@fluentui/react/lib/MessageBar';

export interface ISiteMessageBarProps {
  /** Text for the message bar */
  text: string | JSX.Element;

  /** Text for a link shown after the main text */
  linkText?: string;

  /** URL for a link shown after the main text */
  linkUrl?: string;

  /**
   * Prefix for session storage key for storing if the message bar has been closed.
   * If not provided, local storage will not be used.
   */
  sessionStoragePrefix?: string;

  /** Styles for the message bar */
  styles?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
}
