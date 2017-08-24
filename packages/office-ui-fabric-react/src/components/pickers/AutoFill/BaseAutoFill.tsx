import * as React from 'react';
import { IBaseAutoFillProps, IBaseAutoFill } from './BaseAutoFill.Props';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  getNativeProps,
  inputProperties
} from '../../../Utilities';

export interface IBaseAutoFillState {
  displayValue?: string;
}

const SELECTION_FORWARD = 'forward';
const SELECTION_BACKWARD = 'backward';

export class BaseAutoFill extends BaseComponent<IBaseAutoFillProps, IBaseAutoFillState> implements IBaseAutoFill {

  public static defaultProps = {
    enableAutoFillOnKeyPress: [KeyCodes.down, KeyCodes.up]
  };

  private _inputElement: HTMLInputElement;
  private _autoFillEnabled: boolean = true;
  private _value: string;

  constructor(props: IBaseAutoFillProps) {
    super(props);
    this._value = '';
    this.state = {
      displayValue: props.defaultVisibleValue === null ? '' : props.defaultVisibleValue
    };
  }

  public get cursorLocation(): number {
    if (this._inputElement) {
      let inputElement = this._inputElement;
      if (inputElement.selectionDirection !== SELECTION_FORWARD) {
        return inputElement.selectionEnd;
      } else {
        return inputElement.selectionStart;
      }
    } else {
      return -1;
    }
  }

  public get isValueSelected(): boolean {
    return this.inputElement.selectionStart !== this.inputElement.selectionEnd;
  }

  public get value(): string {
    return this._value;
  }

  public get selectionStart(): number {
    return this._inputElement ? this._inputElement.selectionStart : -1;
  }

  public get selectionEnd(): number {
    return this._inputElement ? this._inputElement.selectionEnd : -1;
  }

  public get inputElement(): HTMLInputElement {
    return this._inputElement;
  }

  public componentWillReceiveProps(nextProps: IBaseAutoFillProps) {
    let newValue;

    if (this.props.updateValueInWillReceiveProps) {
      newValue = this.props.updateValueInWillReceiveProps();
    }

    if (this._autoFillEnabled && this._doesTextStartWith(nextProps.suggestedDisplayValue!, newValue ? newValue : this._value)) {
      newValue = nextProps.suggestedDisplayValue;
    }

    if (!!newValue) {
      this.setState({ displayValue: newValue });
    }
  }

  public componentDidUpdate() {
    let value = this._value;
    let {
      defaultVisibleValue,
      suggestedDisplayValue,
      shouldSelectFullInputValueInComponentDidUpdate
    } = this.props;
    let differenceIndex = 0;

    if (this._autoFillEnabled && value && suggestedDisplayValue && this._doesTextStartWith(suggestedDisplayValue, value)) {
      let shouldSelectFullRange = false;

      if (shouldSelectFullInputValueInComponentDidUpdate) {
        shouldSelectFullRange = shouldSelectFullInputValueInComponentDidUpdate();
      }

      if (shouldSelectFullRange) {
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
      onChange={ this._onChange }
      onKeyDown={ this._onKeyDown }
      onClick={ this.props.onClick ? this.props.onClick : this._onClick }
    />;
  }

  public focus() {
    this._inputElement.focus();
  }

  public clear() {
    this._autoFillEnabled = true;
    this._updateValue('');
    this._inputElement.setSelectionRange(0, 0);
  }

  @autobind
  private _onClick() {
    if (this._value && this._value !== '' && this._autoFillEnabled) {
      this._autoFillEnabled = false;
    }
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
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
          if (this.props.enableAutoFillOnKeyPress!.indexOf(ev.which) !== -1) {
            this._autoFillEnabled = true;
          }
        }
        break;
    }
  }

  @autobind
  private _onChange(ev: React.FormEvent<HTMLElement>) {
    let value: string = (ev.target as HTMLInputElement).value;
    if (value && (ev.target as HTMLInputElement).selectionStart === value.length && !this._autoFillEnabled && value.length > this._value.length) {
      this._autoFillEnabled = true;
    }
    this._updateValue(value);
  }

  private _notifyInputChange(newValue: string) {
    if (this.props.onInputValueChange) {
      this.props.onInputValueChange(newValue);
    }
  }

  private _updateValue(newValue: string) {
    this._value = newValue;
    let displayValue = newValue;
    if (this.props.suggestedDisplayValue &&
      this._doesTextStartWith(this.props.suggestedDisplayValue, displayValue)
      && this._autoFillEnabled) {
      displayValue = this.props.suggestedDisplayValue;
    }
    this.setState({
      displayValue: newValue
    }, () => this._notifyInputChange(newValue));
  }

  private _doesTextStartWith(text: string, startWith: string) {
    if (!text || !startWith) {
      return false;
    }
    return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0;
  }
}