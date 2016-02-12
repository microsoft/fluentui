import * as React from 'react';
import Label from '../Label';
import './TextField.scss';

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
                    "ms-TextField" +
                    (required ? " is-required" : "") +
                    (disabled ? " is-disabled" : "") +
                    (multiline ? " ms-TextField--multiline" : "") +
                    (underlined ? " ms-TextField--underlined" : "")
                }>
                {label ? <Label>{label}</Label> : null}
                {iconClass ? <i className={iconClass}></i> : null}
                {multiline ? <textarea className="ms-TextField-field">{value}</textarea> : <input placeholder={placeholder} className="ms-TextField-field" value={value} /> }
                {description ? <span className="ms-TextField-description">{description}</span> : null}
                {this.props.children}
            </div>
        );
    }
}