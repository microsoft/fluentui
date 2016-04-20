import * as React from 'react';
import './Label.scss';
import { css } from '../../utilities/css';

export interface ILabelProps {
  htmlFor?: string;
  children?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export default class Label extends React.Component<ILabelProps, any> {
  public render() {
    let {isDisabled, isRequired, children, htmlFor} = this.props;

    return (
      <label
        htmlFor={ htmlFor }
        className={ css('ms-Label', {
          'is-disabled': isDisabled,
          'is-required': isRequired
        }) }>
        {children}
      </label>
    );
  }
}
