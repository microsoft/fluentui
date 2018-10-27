import * as React from 'react';
import { AnnouncedBase } from './Announced.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IAnnounced {}

export interface IAnnouncedProps extends React.Props<AnnouncedBase>, React.HTMLAttributes<HTMLDivElement> {
  /** Theme from the Higher Order Component */
  theme?: ITheme;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<IAnnouncedStyleProps, IAnnouncedStyles>;

  /**
   * Optional callback to access the IAnnounced interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IAnnounced) => void;

  /**
   * The status message provided as screen reader output
   */
  message?: string;

  /**
   * Politeness setting for Announced component
   * @default 'assertive'
   */
  ariaLive?: 'off' | 'polite' | 'assertive';
}

export interface IAnnouncedStyles {
  /**
   * Style override for the screen reader text.
   */
  screenReaderText: IStyle;
}

export type IAnnouncedStyleProps = Required<Pick<IAnnouncedProps, 'theme'>> &
  Pick<IAnnouncedProps, 'className'> & {
    /**
     * Root html container for Announced.
     */
    root?: string;
  };
