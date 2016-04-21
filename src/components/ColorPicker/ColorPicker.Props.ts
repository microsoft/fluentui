/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface IColorPickerProps {
  /**
   * The CSS-compatible string to describe the color
   */
  color: string;

  /**
   * Callback issued when the user changes the color.
   */
  onColorChanged?: (color: string) => void;
}