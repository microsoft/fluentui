import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export class SpinButtonCustomValidateExample extends React.Component<any, any> {
  private static _suffix = ' cm';

  public render(): JSX.Element {
    return (
      <div style={{ width: '400px' }}>
        <SpinButton
          label="SpinButton with custom validate logic:"
          defaultValue={'0' + SpinButtonCustomValidateExample._suffix}
          onValidate={this._handleValidate}
          onIncrement={this._handleIncrement}
          onDecrement={this._handleDecrement}
          incrementButtonAriaLabel={'Increase value by 2'}
          decrementButtonAriaLabel={'Decrease value by 2'}
        />
      </div>
    );
  }

  private _handleValidate = (text: string) => {
    const value = this._removeSuffix(text);
    const normalizedValue = this._normalizeValue(value);
    return this._appendSuffix(normalizedValue);
  };

  private _handleIncrement = (text: string) => {
    const value = this._removeSuffix(text);
    const newValue = this._normalizeValue(value + 2);
    return this._appendSuffix(newValue);
  };

  private _handleDecrement = (text: string) => {
    const value = this._removeSuffix(text);
    const newValue = this._normalizeValue(value - 2);
    return this._appendSuffix(newValue);
  };

  private _normalizeValue(value: number): number {
    return Math.max(0, Math.min(10, Math.floor(value / 2) * 2));
  }

  private _hasSuffix(text: string): Boolean {
    const subString = text.substr(text.length - SpinButtonCustomValidateExample._suffix.length);
    return subString === SpinButtonCustomValidateExample._suffix;
  }

  private _removeSuffix(text: string): number {
    if (this._hasSuffix(text)) {
      return Number(text.substr(0, text.length - SpinButtonCustomValidateExample._suffix.length));
    } else {
      return Number(text);
    }
  }

  private _appendSuffix(value: number): string {
    if (isNaN(value)) {
      return '0' + SpinButtonCustomValidateExample._suffix;
    } else {
      return String(value) + SpinButtonCustomValidateExample._suffix;
    }
  }
}
