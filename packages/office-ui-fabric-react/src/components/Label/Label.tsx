import * as React from 'react';
import { css, divProperties, getNativeProps } from '../../Utilities';
import { ILabelProps } from './Label.Props';
let styles: any = require('./Label.scss');

export class Label extends React.Component<ILabelProps, any> {
  public render() {
    let { disabled, required, children, className } = this.props;

    return (
      <label
        { ...getNativeProps(this.props, divProperties) }
        className={ css(styles.root, 'ms-Label', className, {
          'is-disabled': disabled,
          'is-required': required,
          [styles.isDisabled]: disabled,
          [styles.isRequired]: required
        }) }>
        { children }
      </label>
    );
  }
}
