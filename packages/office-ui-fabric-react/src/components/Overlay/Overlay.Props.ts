import * as React from 'react';

export interface IOverlay {

}

export interface IOverlayProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IOverlay interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IOverlay) => void;

  /**
   * Whether to use the dark-themed overlay.
   * @defaultvalue false
   */
  isDarkThemed?: boolean;
}