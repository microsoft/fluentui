import * as React from 'react';
import Label from '../Label/index';
import './TextField.scss';
import { css } from '../../utilities/css';
import KeyCodes from '../../utilities/KeyCodes';

export interface ITextFieldProps extends React.DOMAttributes {
  children?: any;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  underlined?: boolean;
  placeholder?: string;
  label?: string;
  description?: string;
  iconClass?: string;
  value?: string;
  onTextChange?: (newValue: any) => void;
}

export default class TextField extends React.Component<ITextFieldProps, any> {
  public static initialProps: ITextFieldProps = {
    disabled: false,
    required: false,
    multiline: false,
    underlined: false
  }

  public render() {
    let {disabled, required, multiline, placeholder, underlined, label, description, iconClass, value} = this.props;

    return (
      <div
        {...this.props}
        className={
        css('ms-TextField', {
          'is-required': required,
          'is-disabled': disabled,
          'ms-TextField--multiline': multiline,
          'ms-TextField--underlined': underlined
        }) }
        >
        { label ? <Label>{label}</Label> : null }
        {iconClass ? <i className={iconClass}></i> : null}
        {multiline ? <textarea className="ms-TextField-field" onChange={ this._onTextChange.bind(this) }>{value}</textarea> : <input placeholder={placeholder} className="ms-TextField-field" value={value} onChange={ this._onTextChange.bind(this) } /> }
        {description ? <span className="ms-TextField-description">{description}</span> : null}
        {this.props.children}
      </div>
    );
  }

  private _onTextChange(ev: React.KeyboardEvent): void {
    let newVal = (ev.currentTarget as HTMLInputElement).value;
    this.props.onTextChange(newVal);
  }
}