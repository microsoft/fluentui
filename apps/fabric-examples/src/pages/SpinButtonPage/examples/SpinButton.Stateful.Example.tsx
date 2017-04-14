import * as React from 'react';
import { SpinButton, ISpinButtonState, ISpinButtonProps } from 'office-ui-fabric-react/lib/SpinButton';
import { Label, assign } from 'office-ui-fabric-react/lib';
//import { assign } from 'office-ui-fabric-react/lib/Utilities';

export class SpinButtonStatefulExample extends React.Component<any, any> {

  private hasSuffix(string: string, suffix: string): Boolean {
    var subString = string.substr(string.length - suffix.length);
    return subString == suffix;
  }

  private removeSuffix(string: string, suffix: string): string {
    if (!this.hasSuffix(string, suffix)) {
      return string;
    }

    return string.substr(0, string.length - suffix.length);
  }

  public render() {

    var suffix = " cm";

    return (
      < SpinButton
        label='SpinButton with custom implementation'
        defaultValue={ '7' + suffix }
        onBlur={ (value: string) => {
          value = this.removeSuffix(value, suffix);
          if (isNaN(+value)) {
            return '0' + suffix
          }

          return String(value) + suffix;
        } }
        onIncrement={ (value: string) => {
          value = this.removeSuffix(value, suffix);
          return String(+value + 2) + suffix;
        } }
        onDecrement={ (value: string) => {
          value = this.removeSuffix(value, suffix);
          return String(+value - 2) + suffix;
        } }
      />
    );
  }
}
