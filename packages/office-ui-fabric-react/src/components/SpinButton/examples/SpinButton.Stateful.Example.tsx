import * as React from 'react';
import { SpinButton, ISpinButtonState, ISpinButtonProps } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonStatefulExample extends React.Component<any, any> {
  public render() {
    let suffix = ' cm';

    return (
      <div style={ { width: '203px' } }>
        <SpinButton
          label='SpinButton with custom implementation:'
          value={ '7' + suffix }
          onValidate={ (value: string) => {
            value = this.removeSuffix(value, suffix);
            if (isNaN(+value)) {
              return '0' + suffix;
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
      </div>
    );
  }

  private hasSuffix(string: string, suffix: string): Boolean {
    let subString = string.substr(string.length - suffix.length);
    return subString === suffix;
  }

  private removeSuffix(string: string, suffix: string): string {
    if (!this.hasSuffix(string, suffix)) {
      return string;
    }

    return string.substr(0, string.length - suffix.length);
  }
}
