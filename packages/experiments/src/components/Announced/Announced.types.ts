import * as React from 'react';
import { Announced } from './Announced';
import { IStyle } from '../../Styling';

export interface IAnnounced {}

export interface IAnnouncedProps extends React.Props<Announced> {
  /**
   * Optional callback to access the IAnnounced interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
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
   * Root html container for Announced.
   */
  root?: string;
}
