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

export interface ICheckboxState {
  /** Is true when the control has focus. */
  isFocused?: boolean;

  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
}

export class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxState> implements ICheckbox {
  public static defaultProps: ICheckboxProps = {
  };

  private _id: string;
  private _checkBox: HTMLInputElement;

  constructor(props: ICheckboxProps) {
    super(props);

    this._id = getId('checkbox-');
    this.state = {
      isFocused: false,
      isChecked: props.defaultChecked || false
    };
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

    const { isFocused, isChecked } = this.state;

    return (
      <div
        className={ css('ms-Checkbox', className, { 'is-inFocus': isFocused }) }
      >
        <input
          { ...inputProps }
          { ...(checked !== undefined && { checked }) }
          { ...(defaultChecked !== undefined && { defaultChecked }) }
          disabled={ disabled }
          ref={ this._resolveRef('_checkBox') }
          id={ this._id }
          name={ this._id }
          className='ms-Checkbox-input'
          type='checkbox'
          onChange={ this._onChange }
          onFocus={ this._onFocus }
          onBlur={ this._onBlur }
          aria-checked={ checked }
        />
        {this.props.children}
        <label htmlFor={ this._id }
          className={ css('ms-Checkbox-label', {
            'is-checked': checked || isChecked,
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
    return this._checkBox ? this._checkBox.checked : false;
  }

  public focus() {
    if (this._checkBox) {
      this._checkBox.focus();
    }
  }

  @autobind
  private _onFocus(ev: React.FocusEvent): void {
    this.setState({ isFocused: true });
  }

  @autobind
  private _onBlur(ev: React.FocusEvent): void {
    this.setState({ isFocused: false });
  }

  @autobind
  private _onChange(ev: React.FormEvent) {
    const { onChange } = this.props;
    const isChecked = (ev.target as HTMLInputElement).checked;

    if (onChange) {
      onChange(ev, isChecked);
    }

    if (this.props.checked === undefined) {
      this.setState({ isChecked: isChecked });
    }
  }
}
