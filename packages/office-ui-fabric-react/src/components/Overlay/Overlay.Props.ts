import * as React from 'react';

export interface IOverlayProps extends React.HTMLProps<HTMLElement> {
  /**
   * Whether to use the dark-themed overlay.
   * @defaultvalue false
   */
  isDarkThemed?: boolean;
}