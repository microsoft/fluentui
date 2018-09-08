import * as React from 'react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';

export interface IBasicColorPickerExampleState {
  color: string;
}

export class ColorPickerBasicExample extends React.Component<any, IBasicColorPickerExampleState> {
  public render(): JSX.Element {
    return <ColorPicker color="#FFFFFF" />;
  }
}
