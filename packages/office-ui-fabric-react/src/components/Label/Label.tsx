import * as React from 'react';
import { BaseComponent, css, divProperties, getNativeProps } from '../../Utilities';
import { ILabelProps } from './Label.Props';
import stylesImport from './Label.scss';
const styles: any = stylesImport;

export class Label extends BaseComponent<ILabelProps, any> {
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
