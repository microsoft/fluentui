import * as React from 'react';
import { BaseComponent, css, divProperties, getNativeProps } from '../../Utilities';
import { ILabelProps } from './Label.Props';
import * as stylesImport from './Label.scss';
const styles: any = stylesImport;

export class Label extends BaseComponent<ILabelProps, any> {
  public render() {
    let { disabled, required, children, className } = this.props;

    return (
      <label
        { ...getNativeProps(this.props, divProperties) }
        className={ css(
          styles.root,
          'ms-Label',
          className,
          disabled && ('is-disabled ' + styles.isDisabled),
          required && ('is-required ' + styles.isRequired)
        ) }>
        { children }
      </label>
    );
  }
}
