import * as React from 'react';
import { IDynamicAutoFillProps, IDynamicAutoFill } from './DynamicAutoFill.Props';
import { BaseAutoFill } from '../BaseAutoFill';
import { IBaseAutoFillProps } from '../BaseAutoFill.Props';
import {
  KeyCodes,
  autobind,
  getNativeProps,
  inputProperties
} from '../../../../Utilities';

export interface IDynamicAutoFillState {
  displayValue?: string;
}

const SELECTION_FORWARD = 'forward';
const SELECTION_BACKWARD = 'backward';

export class DynamicAutoFill extends BaseAutoFill implements IDynamicAutoFill {

  public static defaultProps = {
    enableAutoFillOnKeyPress: [KeyCodes.down, KeyCodes.up],
    defaultVisibleValue: ''
  };

  constructor(props: IBaseAutoFillProps) {
    super(props);

    this._value = '';
    this.state = {
      displayValue: props.defaultVisibleValue
    };
  }

  public componentWillReceiveProps(nextProps: IDynamicAutoFillProps) {
    if (nextProps.defaultVisibleValue && nextProps.defaultVisibleValue !== '' && (nextProps.defaultVisibleValue !== nextProps.defaultVisibleValue || this._value !== nextProps.defaultVisibleValue)) {
      this._value = nextProps.defaultVisibleValue;
    }
    if (this._autoFillEnabled && this._doesTextStartWith(nextProps.suggestedDisplayValue, this._value)) {
      this.setState({ displayValue: nextProps.suggestedDisplayValue });
    }
  }

  public componentDidUpdate() {
    let value = this._value;
    let { suggestedDisplayValue } = this.props;
    let differenceIndex = 0;
    if (this._autoFillEnabled && value && suggestedDisplayValue && this._doesTextStartWith(suggestedDisplayValue, value)) {
      if (this.props.defaultVisibleValue === this.props.suggestedDisplayValue) {
        this._inputElement.setSelectionRange(0, suggestedDisplayValue.length, SELECTION_BACKWARD);
      } else {
        while (differenceIndex < value.length && value[differenceIndex].toLocaleLowerCase() === suggestedDisplayValue[differenceIndex].toLocaleLowerCase()) {
          differenceIndex++;
        }
        if (differenceIndex > 0) {
          this._inputElement.setSelectionRange(differenceIndex, suggestedDisplayValue.length, SELECTION_BACKWARD);
        }
      }
    }
  }

  public render() {
    let {
      displayValue
    } = this.state;

    const nativeProps = getNativeProps(this.props, inputProperties);
    return <input { ...nativeProps}
      ref={ this._resolveRef('_inputElement') }
      value={ displayValue }
      autoCapitalize={ 'off' }
      autoComplete={ 'off' }
      spellCheck={ false }
      onChange={ this._onChange }
      onKeyDown={ this._onKeyDown }
      onClick={ this.props.onClick ? this.props.onClick : this._onClick }
    />;
  }

  @autobind
  protected _onKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    switch (ev.which) {
      case KeyCodes.backspace:
        this._autoFillEnabled = false;
        break;
      case KeyCodes.left:
        if (this._autoFillEnabled) {
          this._autoFillEnabled = false;
        }
        break;
      case KeyCodes.right:
        if (this._autoFillEnabled) {
          this._autoFillEnabled = false;
        }
        break;
      default:
        if (!this._autoFillEnabled) {
          if (this.props.enableAutoFillOnKeyPress.indexOf(ev.which) !== -1) {
            this._autoFillEnabled = true;
          }
        }
        break;
    }

  }
}