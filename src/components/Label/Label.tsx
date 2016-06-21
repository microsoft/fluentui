import * as React from 'react';
import { css } from '../../utilities/css';
import { ILabelProps } from './Label.Props';
import './Label.scss';

export class Label extends React.Component<ILabelProps, any> {
  public render() {
    let {isDisabled, isRequired, children, htmlFor, ariaLabel} = this.props;

    return (
      <label
        { ...this.props}
        htmlFor={ htmlFor }
        className={ css('ms-Label', {
          'is-disabled': isDisabled,
          'is-required': isRequired
        }) }
        aria-label={ ariaLabel }
        tabIndex = { 0 }>
        { children }
      </label>
    );
  }
}
