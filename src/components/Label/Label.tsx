import * as React from 'react';
import { css } from '../../utilities/css';
import { ILabelProps } from './Label.Props';
import './Label.scss';

export class Label extends React.Component<ILabelProps, any> {
  public render() {
    let { disabled, required, children, className } = this.props;

    return (
      <label
        { ...this.props }
        className={ css('ms-Label', className, {
          'is-disabled': disabled,
          'is-required': required
        }) }>
        { children }
      </label>
    );
  }
}
