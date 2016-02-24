import * as React from 'react';
import Label from '../Label/index';
import './TextField.scss';
import { css } from '../../utilities/css';

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
}

export default class TextField extends React.Component<ITextFieldProps, any> {
  public static initialProps: ITextFieldProps = {
    disabled: false,
    required: false,
    multiline: false,
    underlined: false
  }

  render() {
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
        {multiline ? <textarea className="ms-TextField-field">{value}</textarea> : <input placeholder={placeholder} className="ms-TextField-field" value={value} /> }
        {description ? <span className="ms-TextField-description">{description}</span> : null}
        {this.props.children}
      </div>
    );
  }
}