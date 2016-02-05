import * as React from 'react';
import './Label.scss';

export interface ILabelProps {
    children?: any;
    disabled?: boolean;
    required?: boolean;
}

export default class Label extends React.Component<ILabelProps, any> {
    render() {
        return (<label 
            className={
                "ms-Label" + 
                (this.props.disabled ? " is-disabled" : "") +
                (this.props.required ? " is-required" : "")
            }>{this.props.children}</label>);
    }
}