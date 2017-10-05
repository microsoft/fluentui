import * as React from 'react';
import { BaseComponent, divProperties, getNativeProps } from '../../Utilities';
import { ILabelProps } from './Label.Props';
import { getLabelClassNames } from './Label.classNames';
import { getTheme } from '../../Styling';


export class Label extends BaseComponent<ILabelProps, any> {
  public render() {
    let { disabled, required, children, className } = this.props;
    let theme = getTheme();
    return (
      <label
        { ...getNativeProps(this.props, divProperties) }
        className={ getLabelClassNames(theme, className, !!disabled, !!required).root }
      >
        { children }
      </label>
    );
  }
}
