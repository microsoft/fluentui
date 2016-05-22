import * as React from 'react';
import {
  ColorPicker
} from '../../../../index';
import './ColorPicker.Basic.Example.scss';

export interface IBasicColorPickerExampleState {
  color: string;
}

export class ColorPickerBasicExample extends React.Component<any, IBasicColorPickerExampleState> {

  public render() {

    return (
        <ColorPicker color='#FFFFFF'/>
    );
  }
}
