import * as React from 'react';
import { AnnouncedBase } from './Announced.base';
import { IStyle } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Announced}
 */
export interface IAnnouncedProps extends React.Props<AnnouncedBase>, React.HTMLAttributes<HTMLDivElement> {
  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<{}, IAnnouncedStyles>;

  /**
   * The status message provided as screen reader output
   */
  message?: string;
}

/**
 * {@docCategory Announced}
 */
export interface IAnnouncedStyles {
  /**
   * Style override for the screen reader text.
   */
  screenReaderText: IStyle;
}
