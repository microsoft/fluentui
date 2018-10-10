import * as React from 'react';
import { Announced } from './Announced';
import { IStyle } from '../../Styling';

export interface IAnnounced {}

export interface IAnnouncedProps extends React.Props<Announced> {
  /**
   * All props for your component are to be defined here.
   */
  componentRef?: (component: IAnnounced) => void;

  /**
   * The status message provided as screen reader output
   */
  message?: string;
}

export interface IAnnouncedStyles {
  /**
   * Style for the root element.
   */
  root?: IStyle;

  /**
   * Style override for the screen reader text.
   */
  screenReaderText?: IStyle;
}

export interface IAnnouncedStyleProps {
  /**
   * Root html container for this component.
   */
  root?: string;
}
