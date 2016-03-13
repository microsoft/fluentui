import * as React from 'react';
import './Label.scss';
import { css } from '../../utilities/css';

export interface ILabelProps {
  children?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export default class Label extends React.Component<ILabelProps, any> {
  public render() {
    let {isDisabled, isRequired, children} = this.props;

    return (
      <label
        className={ css('ms-Label', {
          'is-disabled': isDisabled,
          'is-required': isRequired
        }) }>
        {children}
      </label>
    );
  }
}
