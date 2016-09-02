import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import {
  ICheckbox,
  ICheckboxProps
} from './Checkbox.Props';
import { autobind } from '../../utilities/autobind';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import './Checkbox.scss';

export class Checkbox extends BaseComponent<ICheckboxProps, {}> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
  };

  private _id: string;
  private _checkBox: HTMLElement;
  private _checkBoxInput: HTMLInputElement;
  private _checkBoxLabel: HTMLLabelElement;

  constructor(props: ICheckboxProps) {
    super(props);

    this._id = getId('checkbox-');
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
        ref={ this._resolveRef('_checkBox') }
      >
        <input
          { ...inputProps }
          { ...(checked !== undefined && { checked }) }
          { ...(defaultChecked !== undefined && { defaultChecked }) }
          disabled={ disabled }
          ref={ this._resolveRef('_checkBoxInput') }
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
          ref={ this._resolveRef('_checkBoxLabel') }
          className={ css('ms-Checkbox-label', {
            'is-checked': checked || defaultChecked,
            'is-disabled': disabled
            })
          }
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

  @autobind
  private _onFocus(): void {
    this._checkBox.classList.add('is-inFocus');
  }

  @autobind
  private _onBlur(): void {
    this._checkBox.classList.remove('is-inFocus');
  }

  @autobind
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
