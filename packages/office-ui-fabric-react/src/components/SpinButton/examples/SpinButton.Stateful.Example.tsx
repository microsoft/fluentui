import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

// tslint:disable:jsx-no-lambda
export class SpinButtonStatefulExample extends React.Component<any, any> {
  public render() {
    let suffix = ' cm';

    return (
      <div style={ { width: '400px' } }>
        <SpinButton
          label='SpinButton with custom implementation:'
          value={ '7' + suffix }
          onValidate={ (value: string) => {
            value = this._removeSuffix(value, suffix);
            if (isNaN(+value)) {
              return '0' + suffix;
            }

            return String(value) + suffix;
          } }
          onIncrement={ (value: string) => {
            value = this._removeSuffix(value, suffix);
            return String(+value + 2) + suffix;
          } }
          onDecrement={ (value: string) => {
            value = this._removeSuffix(value, suffix);
            return String(+value - 2) + suffix;
          } }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />
      </div>
    );
  }

  private _hasSuffix(string: string, suffix: string): Boolean {
    let subString = string.substr(string.length - suffix.length);
    return subString === suffix;
  }

  private _removeSuffix(string: string, suffix: string): string {
    if (!this._hasSuffix(string, suffix)) {
      return string;
    }

    return string.substr(0, string.length - suffix.length);
  }
}
