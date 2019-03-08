import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

// tslint:disable:jsx-no-lambda
export class SpinButtonStatefulExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const suffix = ' cm';

    return (
      <div style={{ width: '400px' }}>
        <SpinButton
          label={'SpinButton with custom implementation:'}
          min={0}
          max={100}
          value={'7' + suffix}
          onValidate={(value: string) => {
            value = this._removeSuffix(value, suffix);
            if (Number(value) > 100 || Number(value) < 0 || value.trim().length === 0 || isNaN(+value)) {
              return '0' + suffix;
            }

            return String(value) + suffix;
          }}
          onIncrement={(value: string) => {
            value = this._removeSuffix(value, suffix);
            if (Number(value) + 2 > 100) {
              return String(+value) + suffix;
            } else {
              return String(+value + 2) + suffix;
            }
          }}
          onDecrement={(value: string) => {
            value = this._removeSuffix(value, suffix);
            if (Number(value) - 2 < 0) {
              return String(+value) + suffix;
            } else {
              return String(+value - 2) + suffix;
            }
          }}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          incrementButtonAriaLabel={'Increase value by 2'}
          decrementButtonAriaLabel={'Decrease value by 2'}
        />
      </div>
    );
  }

  private _hasSuffix(value: string, suffix: string): Boolean {
    const subString = value.substr(value.length - suffix.length);
    return subString === suffix;
  }

  private _removeSuffix(value: string, suffix: string): string {
    if (!this._hasSuffix(value, suffix)) {
      return value;
    }

    return value.substr(0, value.length - suffix.length);
  }
}
