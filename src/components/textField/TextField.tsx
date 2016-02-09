import * as React from 'react';
import Label from '../label/Label';
import './TextField.scss';

export interface ITextFieldProps {
    children?: any;
    disabled?: boolean;
    required?: boolean;
    multiline?: boolean;
    underlined?: boolean;
    placeholder?: boolean;
    label?: string;
    description?: string;
    iconClass?: string;
}

export default class TextField extends React.Component<ITextFieldProps, any> {
    public static initialProps: ITextFieldProps = { 
        disabled: false,
        required: false,
        multiline: false,
        underlined: false
    }
    
    render() {
        let {disabled, required, multiline, placeholder, underlined, label, description, iconClass} = this.props;
        
        return (
            <div className={
                    "ms-TextField" +
                    (required ? " is-required" : "") +
                    (disabled ? " is-disabled" : "") +
                    (multiline ? " ms-TextField--multiline" : "") +
                    (placeholder ? " ms-TextField--placeholder" : "") +
                    (underlined ? " ms-TextField--underlined" : "")
                }>
                <Label>{label}</Label>
                {iconClass ? <i className={iconClass}></i> : null}
                {multiline ? <textarea className="ms-TextField-field"></textarea> : <input className="ms-TextField-field" /> }
                {description ? <span className="ms-TextField-description">{description}</span> : null}
                {this.props.children}
            </div>
        );
    }
}