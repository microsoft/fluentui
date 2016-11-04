import * as React from 'react';
import { IBaseAutoFillProps, IBaseAutoFill } from './BaseAutoFill.Props';
import { BaseComponent } from '../../../common/BaseComponent';
import { getNativeProps, inputProperties } from '../../../utilities/properties';
import { autobind } from '../../../utilities/autobind';
import { KeyCodes } from '../../../utilities/KeyCodes';

export interface IBaseAutoFillState {
  value?: string;
}

const SELECTION_FORWARD = 'forward';
const SELECTION_BACKWARD = 'backward';

export class BaseAutoFill extends BaseComponent<IBaseAutoFillProps, IBaseAutoFillState> implements IBaseAutoFill {

  private _inputElement: HTMLInputElement;

  constructor(props: IBaseAutoFillProps) {
    super(props);
    this.state = {
      value: ''
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
    return this.state.value;
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

  public componentDidUpdate() {
    let { value } = this.state;
    let { suggestedDisplayValue } = this.props;
    let differenceIndex = 0;
    if (value && suggestedDisplayValue && this._doesTextStartWith(suggestedDisplayValue, value)) {
      while (differenceIndex < value.length && value[differenceIndex].toLocaleLowerCase() === suggestedDisplayValue[differenceIndex].toLocaleLowerCase()) {
        differenceIndex++;
      }
      if (differenceIndex > 0) {
        this._inputElement.setSelectionRange(differenceIndex, suggestedDisplayValue.length, SELECTION_BACKWARD);
      }
    }
  }

  public render() {
    let {
      value
    } = this.state;
    let {
      suggestedDisplayValue
    } = this.props;
    let displayValue = value;

    if (this._doesTextStartWith(suggestedDisplayValue, value)) {
      displayValue = suggestedDisplayValue;
    }

    const nativeProps = getNativeProps(this.props, inputProperties);
    return <input { ...nativeProps}
      ref={ this._resolveRef('_inputElement') }
      value={ displayValue }
      autoCapitalize={ 'off' }
      autoComplete={ 'off' }
      onChange={ this._onChange }
      onKeyDown={ this._onKeyDown }
      />;
  }

  public focus() {
    this._inputElement.focus();
  }

  public clear() {
    this._updateValue('');
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {
      case KeyCodes.backspace:
        this._handleBackspace(ev);
        break;
    }
  }

  private _handleBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    let { value } = this.state;
    if (value && value.length > 0) {
      this._updateValue(value.substring(0, value.length - 1));
      // Since this effectively deletes a letter from the string we need to preventDefault so that
      // the backspace doesn't try to delete a letter that's already been deleted. If a letter is deleted
      // it can trigger the onChange event again which can have unintended consequences.
      ev.preventDefault();
    }
  }

  @autobind
  private _onChange(ev: React.FormEvent<HTMLElement>) {
    let value: string = (ev.target as HTMLInputElement).value;
    this._updateValue(value);
  }

  private _notifyInputChange(newValue: string) {
    if (this.props.onInputValueChange) {
      this.props.onInputValueChange(newValue);
    }
  }

  private _updateValue(newValue: string) {
    this.setState({
      value: newValue
    }, () => this._notifyInputChange(newValue));
  }

  private _doesTextStartWith(text: string, startWith: string) {
    if (!text || !startWith) {
      return false;
    }
    return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0;
  }
}