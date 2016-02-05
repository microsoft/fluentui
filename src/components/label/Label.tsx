import * as React from 'react';
import './Label.scss';

export interface ILabelProps {
    children?: any;
    disabled?: boolean;
    required?: boolean;
}

export default class Label extends React.Component<ILabelProps, any> {
    render() {
        let {disabled, required, children} = this.props;
        
        return (<label 
            className={
                "ms-Label" + 
                (disabled ? " is-disabled" : "") +
                (required ? " is-required" : "")
            }>{children}</label>);
    }
}