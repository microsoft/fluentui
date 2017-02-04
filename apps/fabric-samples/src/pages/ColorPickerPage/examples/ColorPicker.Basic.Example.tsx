import * as React from 'react';
import {
  ColorPicker
} from '../../../../ColorPicker';

export interface IBasicColorPickerExampleState {
  color: string;
}

export class ColorPickerBasicExample extends React.Component<any, IBasicColorPickerExampleState> {

  public render() {

    return (
      <ColorPicker color='#FFFFFF' />
    );
  }
}
