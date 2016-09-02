import * as React from 'react';
import {
  ICheckbox,
  ICheckboxProps
} from './Checkbox.Props';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';

import './Checkbox.scss';

export class Checkbox extends React.Component<ICheckboxProps, {}> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
  };

  private _id: string;
  private _checkBox: HTMLElement;
  private _checkBoxInput: HTMLInputElement;
  private _checkBoxLabel: HTMLLabelElement;

  constructor(props: ICheckboxProps) {
    super(props);

    this._id = getId('checkbox-');
    this._onChange = this._onChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  public render() {
    const {
      checked,
      className,
      defaultChecked,
      disabled,
      inputProps,
      label
    } = this.props;

    return (
      <div
        className={ css('ms-Checkbox', className) }
        ref={ (c): HTMLElement => this._checkBox = c }
      >
        <input
          { ...inputProps }
          { ...(checked !== undefined && { checked }) }
          { ...(defaultChecked !== undefined && { defaultChecked }) }
          disabled={ disabled }
          ref={ (el): HTMLInputElement => this._checkBoxInput = el }
          id={ this._id }
          name={ this._id }
          className='ms-Checkbox-input'
          type='checkbox'
          onChange={ this._onChange }
          onFocus= { this._onFocus }
          onBlur= { this._onBlur }
          aria-checked={ checked }
        />
        <label htmlFor={ this._id }
          ref={ (el): HTMLLabelElement => this._checkBoxLabel = el }
          className={ css('ms-Checkbox-label', (checked || defaultChecked) && 'is-checked', disabled && 'is-disabled') }
        >
          { label && <span className='ms-Label'>{ label }</span> }
        </label>
      </div>
    );
  }

  public get checked(): boolean {
    return this._checkBoxInput ? this._checkBoxInput.checked : false;
  }

  public focus() {
      if (this._checkBoxInput) {
          this._checkBoxInput.focus();
      }
  }

  private _onFocus(): void {
    this._checkBox.classList.add('is-inFocus');
  }

  private _onBlur(): void {
    this._checkBox.classList.remove('is-inFocus');
  }

  private _onChange(ev: React.FormEvent) {
    const { onChange } = this.props;
    const isChecked = (ev.target as HTMLInputElement).checked;

    if (this.props.checked === undefined && isChecked) {
      this._checkBoxLabel.classList.add('is-checked');
    }

    if (this.props.checked === undefined && !isChecked) {
      this._checkBoxLabel.classList.remove('is-checked');
    }

    if (onChange) {
      onChange(ev, isChecked);
    }
  }
}
